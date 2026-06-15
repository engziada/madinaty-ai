/**
 * enrollmentSteps — Conversation step definitions for the Kids' Session
 * enrollment flow (Typeform Chat with Astro).
 *
 * 13 steps total, mapping 1:1 to the fields in the existing
 * EnrollmentFormState / POST /api/enrollment payload.
 */

import type { ConversationStep, SelectOption, CascadingSelectConfig } from "../ConversationEngine";
import type { LocaleCode } from "@/types/site";

/* ------------------------------------------------------------------ */
/*  Form state shape (mirrors existing EnrollmentModal)                */
/* ------------------------------------------------------------------ */

export interface EnrollmentChatForm {
  childName: string;
  childAge: string;
  childGender: string;
  childGrade: string;
  schoolName: string;
  interests: string[];
  hobbies: string;
  preferredDate: string;
  parentName: string;
  parentNationalId: string;
  phone: string;
  email: string;
  addressType: string;
  addressArea: string;
}

/* ------------------------------------------------------------------ */
/*  Reusable option builders (same data as EnrollmentModal)            */
/* ------------------------------------------------------------------ */

function genderOptions(locale: LocaleCode): SelectOption[] {
  return locale === "ar"
    ? [
        { value: "boy", label: "ولد", icon: "👦" },
        { value: "girl", label: "بنت", icon: "👧" },
      ]
    : [
        { value: "boy", label: "Boy", icon: "👦" },
        { value: "girl", label: "Girl", icon: "👧" },
      ];
}

function gradeOptions(locale: LocaleCode): SelectOption[] {
  const grades = [1, 2, 3, 4, 5];
  return grades.map((n) =>
    locale === "ar"
      ? { value: `grade-${n}`, label: `الصف ${n === 1 ? "الأول" : n === 2 ? "الثاني" : n === 3 ? "الثالث" : n === 4 ? "الرابع" : "الخامس"}` }
      : { value: `grade-${n}`, label: `Grade ${n}` }
  );
}

function interestOptions(locale: LocaleCode): SelectOption[] {
  return locale === "ar"
    ? [
        { value: "safe-prompting", label: "الكتابة الآمنة للأوامر", icon: "✏️" },
        { value: "fact-checking", label: "التحقق من المعلومات", icon: "🔍" },
        { value: "homework-support", label: "دعم الواجبات", icon: "📚" },
        { value: "creative-learning", label: "التعلم الإبداعي", icon: "🎨" },
        { value: "digital-safety", label: "الأمان الرقمي", icon: "🛡️" },
      ]
    : [
        { value: "safe-prompting", label: "Safe prompting basics", icon: "✏️" },
        { value: "fact-checking", label: "Fact-checking AI", icon: "🔍" },
        { value: "homework-support", label: "Homework support", icon: "📚" },
        { value: "creative-learning", label: "Creative learning", icon: "🎨" },
        { value: "digital-safety", label: "Digital safety", icon: "🛡️" },
      ];
}

function addressTypeOptions(locale: LocaleCode): SelectOption[] {
  return locale === "ar"
    ? [
        { value: "group", label: "مجموعة (G)", icon: "🏢" },
        { value: "villa_group", label: "مجموعة فيلات (VG)", icon: "🏡" },
      ]
    : [
        { value: "group", label: "Group (G)", icon: "🏢" },
        { value: "villa_group", label: "Villa Group (VG)", icon: "🏡" },
      ];
}

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

export const enrollmentSteps: ConversationStep<EnrollmentChatForm>[] = [
  /* 0 — Child name */
  {
    id: "childName",
    field: "childName",
    botMessage: (_ctx, locale) =>
      locale === "ar"
        ? "هاو! 🐕 أنا أسترو، صديقك الذكي! خلينا نسجلك في أروع مغامرة AI! إيه اسم الطالب؟"
        : "Woof! 🐕 I'm Astro, your AI buddy! Let's sign you up for an awesome AI adventure! What's the student's name?",
    inputType: "text",
    inputProps: { maxLength: 60 },
    validate: (v, locale) => {
      const s = String(v ?? "").trim();
      if (s.length < 2) {
        return { valid: false, error: locale === "ar" ? "الاسم لازم يكون حرفين على الأقل" : "Name must be at least 2 characters" };
      }
      return { valid: true };
    },
  },

  /* 1 — Child age */
  {
    id: "childAge",
    field: "childAge",
    botMessage: (ctx, locale) =>
      locale === "ar"
        ? `أهلاً يا ${ctx.childName}! 🎉 عندك كام سنة؟`
        : `Nice to meet you, ${ctx.childName}! 🎉 How old are you?`,
    inputType: "number",
    inputProps: { min: 7, max: 10 },
    validate: (v, locale) => {
      const n = Number(v);
      if (!Number.isFinite(n) || n < 7 || n > 10) {
        return { valid: false, error: locale === "ar" ? "العمر لازم يكون بين ٧ و ١٠" : "Age must be between 7 and 10" };
      }
      return { valid: true };
    },
  },

  /* 2 — Gender */
  {
    id: "childGender",
    field: "childGender",
    botMessage: (_ctx, locale) =>
      locale === "ar" ? "ممتاز! أنت... 🤔" : "Awesome! Are you a... 🤔",
    inputType: "select",
    options: genderOptions,
    validate: (v) => ({ valid: Boolean(v) }),
  },

  /* 3 — Grade */
  {
    id: "childGrade",
    field: "childGrade",
    botMessage: (_ctx, locale) =>
      locale === "ar" ? "في أنهي صف دراسي؟ 📖" : "What grade are you in? 📖",
    inputType: "select",
    options: gradeOptions,
    validate: (v) => ({ valid: Boolean(v) }),
  },

  /* 4 — School */
  {
    id: "schoolName",
    field: "schoolName",
    botMessage: (_ctx, locale) =>
      locale === "ar" ? "وبتروح مدرسة إيه؟ 🏫" : "What school do you go to? 🏫",
    inputType: "text",
    inputProps: { maxLength: 80 },
    validate: (v, locale) => {
      const val = String(v ?? "").trim();
      if (val.length === 0) return { valid: true }; // Optional
      if (val.length < 2) {
        return { valid: false, error: locale === "ar" ? "اكتب اسم المدرسة" : "Please enter the school name" };
      }
      return { valid: true };
    },
  },

  /* 5 — Interests */
  {
    id: "interests",
    field: "interests",
    botMessage: (_ctx, locale) =>
      locale === "ar"
        ? "إيه المواضيع اللي تحب تتعلمها؟ اختار اللي يعجبك! 🤖"
        : "What AI topics sound cool? Pick as many as you want! 🤖",
    inputType: "multi-select",
    options: interestOptions,
    validate: (v, _locale) => {
      // Optional, so an empty array is fine
      return { valid: true };
    },
  },

  /* 6 — Hobbies */
  {
    id: "hobbies",
    field: "hobbies",
    botMessage: (_ctx, locale) =>
      locale === "ar"
        ? "بتحب تعمل إيه وقت الفراغ؟ ⚽🎨🎮"
        : "What do you like doing for fun? ⚽🎨🎮",
    inputType: "text",
    inputProps: { placeholder: undefined }, // dynamic below
    validate: (v, locale) => {
      const val = String(v ?? "").trim();
      if (val.length === 0) return { valid: true }; // Optional
      if (val.length < 2) {
        return { valid: false, error: locale === "ar" ? "اكتب هواية واحدة على الأقل" : "Tell us at least one hobby" };
      }
      return { valid: true };
    },
  },

  /* 6.5 — Preferred Date */
  {
    id: "preferredDate",
    field: "preferredDate",
    botMessage: (_ctx, locale) =>
      locale === "ar"
        ? "تحب تحجز أنهي تاريخ للجلسة؟ 📅"
        : "Which session date would you like to book? 📅",
    inputType: "select",
    options: (locale) =>
      locale === "ar"
        ? [
            { value: "2026-06-20", label: "✅ السبت ٢٠ يونيو ٢٠٢٦ — الموجة الثالثة (مقاعد مخفضة متاحة)" },
          ]
        : [
            { value: "2026-06-20", label: "✅ Saturday, June 20, 2026 — Wave 3 (Discounted seats available)" },
          ],
    validate: (v, locale) => {
      if (!v) {
        return { valid: false, error: locale === "ar" ? "برجاء اختيار تاريخ الجلسة" : "Please select a session date" };
      }
      return { valid: true };
    },
  },

  /* 7 — Parent name (transition message) */
  {
    id: "parentName",
    field: "parentName",
    botMessage: (ctx, locale) =>
      locale === "ar"
        ? `اختيارات ممتازة يا ${ctx.childName}! 🌟 دلوقتي محتاج أتكلم مع ولي الأمر. إيه اسم ولي الأمر؟`
        : `Great choices, ${ctx.childName}! 🌟 Now I need to chat with your parent. What's their name?`,
    inputType: "text",
    validate: (v, locale) => {
      if (String(v ?? "").trim().length < 2) {
        return { valid: false, error: locale === "ar" ? "اكتب الاسم الكامل" : "Please enter full name" };
      }
      return { valid: true };
    },
  },

  /* 8 — National ID */
  {
    id: "parentNationalId",
    field: "parentNationalId",
    botMessage: (_ctx, locale) =>
      locale === "ar"
        ? "الرقم القومي لولي الأمر؟ (١٤ رقم) 🪪"
        : "Parent's national ID? (14 digits) 🪪",
    inputType: "text",
    inputProps: { inputMode: "numeric", maxLength: 14 },
    validate: (v, locale) => {
      const s = String(v ?? "").replace(/\D/g, "");
      if (!/^\d{14}$/.test(s)) {
        return { valid: false, error: locale === "ar" ? "الرقم القومي لازم يكون ١٤ رقم" : "National ID must be exactly 14 digits" };
      }
      return { valid: true };
    },
    transform: (v) => String(v ?? "").replace(/\D/g, ""),
  },

  /* 9 — Phone */
  {
    id: "phone",
    field: "phone",
    botMessage: (_ctx, locale) =>
      locale === "ar" ? "رقم الموبايل؟ 📱" : "Phone number? 📱",
    inputType: "tel",
    validate: (v, locale) => {
      if (!/^\+?[0-9\s-]{7,15}$/.test(String(v ?? ""))) {
        return { valid: false, error: locale === "ar" ? "رقم الموبايل مش صحيح" : "Please enter a valid phone number" };
      }
      return { valid: true };
    },
  },

  /* 10 — Email */
  {
    id: "email",
    field: "email",
    botMessage: (_ctx, locale) =>
      locale === "ar" ? "البريد الإلكتروني لولي الأمر؟ 📧" : "Parent's email address? 📧",
    inputType: "email",
    validate: (v, locale) => {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v ?? ""))) {
        return { valid: false, error: locale === "ar" ? "البريد الإلكتروني مش صحيح" : "Please enter a valid email" };
      }
      return { valid: true };
    },
  },

  /* 11 — Address Type */
  {
    id: "addressType",
    field: "addressType",
    botMessage: (_ctx, locale) =>
      locale === "ar"
        ? "فين ساكنين في مدينتي؟ 🏠"
        : "Where do you live in Madinaty? 🏠",
    inputType: "select",
    options: addressTypeOptions,
    validate: (v, locale) => {
      if (!v) return { valid: false, error: locale === "ar" ? "اختار نوع السكن" : "Please select your address type" };
      return { valid: true };
    },
  },

  /* 11.5 — Address Area (Number) */
  {
    id: "addressArea",
    field: "addressArea",
    botMessage: (ctx, locale) => {
      const isGroup = ctx.addressType === "group";
      return locale === "ar"
        ? `رقم الـ ${isGroup ? "مجموعة (Group)" : "مجموعة الفيلات (Villa Group)"} كام؟ 🔢`
        : `What is the ${isGroup ? "Group" : "Villa Group"} number? 🔢`;
    },
    inputType: "text",
    inputProps: { inputMode: "numeric" },
    validate: (v, locale) => {
      if (!v || String(v).trim().length === 0) {
        return { valid: false, error: locale === "ar" ? "اكتب الرقم" : "Please enter the number" };
      }
      return { valid: true };
    },
  },

  /* 12 — Review */
  {
    id: "review",
    field: "",
    botMessage: (ctx, locale) =>
      locale === "ar"
        ? `تمام يا ${ctx.childName}! خلينا نراجع البيانات قبل ما نبعتها 🚀`
        : `Alright ${ctx.childName}! Let's review everything before blastoff! 🚀`,
    inputType: "review",
    validate: () => ({ valid: true }),
  },
];
