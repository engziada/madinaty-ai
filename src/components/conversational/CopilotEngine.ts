/**
 * CopilotEngine — Non-LLM regex/keyword parser for the adult side-by-side flow.
 *
 * It checks the user's raw text against common patterns (email, phone, group numbers)
 * and extracts them to populate the form state.
 */

import type { LocaleCode } from "@/types/site";

export interface JoinFormState {
  name: string;
  email: string;
  phone: string;
  gender: string;
  group_no: string;
  building_no: string;
  apartment_no: string;
}

export type CopilotMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

const PATTERNS = {
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i,
  phone: /\+?[0-9\s-]{7,15}/,
  // E.g., "Group 12", "مجموعة 12", "G 12"
  group: /(?:group|g|مجموعة)\s*(\d{1,3})/i,
  // E.g., "Building 5", "عمارة 5", "B 5"
  building: /(?:building|b|عمارة|عماره)\s*(\d{1,3})/i,
  // E.g., "Apartment 14", "شقة 14", "Apt 14"
  apartment: /(?:apartment|apt|شقة|شقه)\s*(\d{1,3})/i,
  // Gender keywords
  male: /\b(male|boy|man|رجل|ذكر|ولد)\b/i,
  female: /\b(female|girl|woman|سيدة|انثى|أنثى|بنت)\b/i,
};

/**
 * Parses user input and extracts known fields.
 * Returns the updated form state and the list of extracted keys (so we can acknowledge them).
 */
export function extractFields(
  input: string,
  currentState: JoinFormState
): { newState: JoinFormState; extracted: (keyof JoinFormState)[] } {
  const newState = { ...currentState };
  const extracted: (keyof JoinFormState)[] = [];

  const text = input.trim();

  // Name (Active match)
  if (!newState.name) {
    const nameMatch = text.match(/(?:name is|i am|انا|اسمي|أنا)\s+([a-zA-Z\s\u0600-\u06FF]{2,30}?)(?=(?:,\s*|\.\s*|\band\b|\s+و\s+|$))/i);
    if (nameMatch) {
      newState.name = nameMatch[1].trim();
      extracted.push("name");
    }
  }

  // Email
  if (!newState.email) {
    const m = text.match(PATTERNS.email);
    if (m) {
      newState.email = m[1];
      extracted.push("email");
    }
  }

  // Phone
  if (!newState.phone) {
    const m = text.match(PATTERNS.phone);
    if (m) {
      newState.phone = m[0];
      extracted.push("phone");
    }
  }

  // Gender
  if (!newState.gender) {
    if (PATTERNS.male.test(text)) {
      newState.gender = "Male";
      extracted.push("gender");
    } else if (PATTERNS.female.test(text)) {
      newState.gender = "Female";
      extracted.push("gender");
    }
  }

  // Group
  if (!newState.group_no) {
    const m = text.match(PATTERNS.group);
    if (m) {
      newState.group_no = m[1];
      extracted.push("group_no");
    }
  }

  // Building
  if (!newState.building_no) {
    const m = text.match(PATTERNS.building);
    if (m) {
      newState.building_no = m[1];
      extracted.push("building_no");
    }
  }

  // Apartment
  if (!newState.apartment_no) {
    const m = text.match(PATTERNS.apartment);
    if (m) {
      newState.apartment_no = m[1];
      extracted.push("apartment_no");
    }
  }

  // Address Fallback: Comma/slash separated numbers e.g., "102,73,21"
  if (!newState.group_no && !newState.building_no && !newState.apartment_no) {
    const addressMatch = text.match(/(\d{1,3})\s*[,/-]\s*(\d{1,3})\s*[,/-]\s*(\d{1,3})/);
    if (addressMatch) {
      newState.group_no = addressMatch[1];
      newState.building_no = addressMatch[2];
      newState.apartment_no = addressMatch[3];
      extracted.push("group_no", "building_no", "apartment_no");
    }
  }

  // Comma-separated name fallback: "Mo, e@s.c, ..."
  if (!newState.name && !extracted.includes("name")) {
    const nameCommaMatch = text.match(/^([a-zA-Z\u0600-\u06FF\s]{2,30}),/);
    if (nameCommaMatch) {
      newState.name = nameCommaMatch[1].trim();
      extracted.push("name");
    }
  }

  // Name fallback: If nothing matched, and name is empty, assume the whole text is their name
  if (!extracted.includes("name") && extracted.length === 0 && !newState.name && text.length >= 2 && !text.includes("@") && !/\d/.test(text)) {
    // Basic heuristic: no digits, no @, maybe it's a name.
    // Also remove common intros:
    let n = text.replace(/^(my name is|i am|i said|انا|اسمي|أنا)\s+/i, "").trim();
    if (n) {
      newState.name = n;
      extracted.push("name");
    }
  }

  return { newState, extracted };
}

/**
 * Determines the bot's next prompt based on what's missing in the form.
 */
export function getNextPrompt(form: JoinFormState, locale: LocaleCode): string | null {
  const isAr = locale === "ar";
  if (!form.name) return isAr ? "ممكن نتعرف؟ إيه اسمك الكريم؟" : "Let's start with your name. What should I call you?";
  if (!form.phone) return isAr ? "رقم موبايلك عشان نقدر نتواصل معاك؟" : "What's the best phone number to reach you at?";
  if (!form.email) return isAr ? "والبريد الإلكتروني (الإيميل) الخاص بك؟" : "And what's your email address?";
  if (!form.group_no || !form.building_no || !form.apartment_no) {
    return isAr
      ? "عنوانك في مدينتي؟ (ممكن تكتبه مرة واحدة: مجموعة ١٢، عمارة ٥، شقة ١٤)"
      : "What's your address in Madinaty? (e.g., Group 12, Building 5, Apartment 14)";
  }
  return isAr
    ? "عظيم! كل البيانات كاملة. راجعها في النموذج وتقدر تدوس إرسال!"
    : "Great! All required fields are filled. Review the form and hit submit!";
}
