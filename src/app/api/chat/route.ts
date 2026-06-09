import { NextRequest, NextResponse } from "next/server";
import type { LocaleCode } from "@/types/site";
import { buildSystemInstruction } from "@/data/madinaty-knowledge";

const MODEL_NAME = "llama-3.1-8b-instant";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const SERPER_API_URL = "https://google.serper.dev/search";

type SearchResult = {
  title?: string;
  link?: string;
  snippet?: string;
};

type DiscoveryItem = {
  name: string;
  note: string;
  rating: string;
  sourceName: string;
  sourceUrl: string;
};

type DiscoveryPayload = {
  intro: string;
  items: DiscoveryItem[];
  followup: string;
};

function getSourceSiteName(url: string): string {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes("google.com")) return "Google Maps";
    if (host.includes("tripadvisor.com")) return "Tripadvisor";
    if (host.includes("instagram.com")) return "Instagram";
    if (host.includes("facebook.com")) return "Facebook";
    return host.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}

function replaceBareUrlsWithHotlinks(text: string): string {
  const urlRegex = /(?<!\]\()https?:\/\/[^\s)]+/g;
  return text.replace(urlRegex, (url) => `[${getSourceSiteName(url)}](${url})`);
}

function normalizeSourceName(name: string, url: string): string {
  const site = getSourceSiteName(url);
  const n = name.trim().toLowerCase();
  if (n.includes("google")) return "Google Maps";
  if (n.includes("trip")) return "Tripadvisor";
  if (n.includes("insta")) return "Instagram";
  if (n.includes("face")) return "Facebook";
  return site;
}

function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * Temporary guard until structured places data / RAG is integrated.
 * Prevents fabricated restaurants/shops by short-circuiting discovery intents.
 */
function isLocalDiscoveryIntent(message: string): boolean {
  const q = message.toLowerCase();
  const keywords = [
    "sushi",
    "pizza",
    "burger",
    "burgers",
    "shawarma",
    "koshary",
    "seafood",
    "grill",
    "bakery",
    "dessert",
    "desserts",
    "sweets",
    "ice cream",
    "supermarket",
    "mall",
    "clinic",
    "dentist",
    "salon",
    "barber",
    "spa",
    "hotel",
    "playground",
    "school",
    "nursery",
    "restaurant",
    "restaurants",
    "cafe",
    "coffee",
    "gym",
    "pharmacy",
    "delivery",
    "menu",
    "price",
    "prices",
    "rating",
    "open",
    "opening",
    "where",
    "recommend",
    "best",
    "near",
    "find",
    "مطعم",
    "مطاعم",
    "سوشي",
    "بيتزا",
    "برجر",
    "شاورما",
    "كشري",
    "مأكولات",
    "حلويات",
    "ايس كريم",
    "آيس كريم",
    "سوبر ماركت",
    "مول",
    "عيادة",
    "طبيب",
    "أسنان",
    "كوافير",
    "صالون",
    "سبا",
    "فندق",
    "حضانة",
    "مدرسة",
    "كافيه",
    "قهوة",
    "جيم",
    "صيدلية",
    "توصيل",
    "منيو",
    "اسعار",
    "أسعار",
    "تقييم",
    "يفتح",
    "مواعيد",
    "فين",
    "وين",
    "أين",
    "اين",
    "أفضل",
    "افضل",
    "قريب",
    "يعمل",
    "shop",
    "shops",
    "store",
    "stores",
    "product",
    "products",
    "outing",
    "outings",
    "rent",
    "rental",
    "ايجار",
    "إيجار",
    "خروج",
    "فسحة",
    "محل",
    "محلات",
    "منتج",
    "منتجات",
    "paint",
    "painting",
    "wall",
    "walls",
    "furniture",
    "carpenter",
    "plumber",
    "electrician",
    "repair",
    "maintenance",
    "laundry",
    "dry clean",
    "tailor",
    "tiles",
    "marble",
    "curtains",
    "ac ",
    " ac",
    "air conditioning",
    "internet",
    "wifi",
    "tutor",
    "courses",
    "language",
    "دهان",
    "دهانات",
    "طلاء",
    "حائط",
    "جدار",
    "أثاث",
    "نجار",
    "سباك",
    "كهربائي",
    "صيانة",
    "مغسلة",
    "غسيل",
    "خياط",
    "سيراميك",
    "رخام",
    "ستائر",
    "تكييف",
    "انترنت",
    "إنترنت",
    "واي فاي",
    "مدرس",
    "كورسات",
    "دورات",
    "لغة"
  ];
  if (keywords.some((k) => q.includes(k))) {
    return true;
  }
  const lookupVerbs = [
    "where",
    "which",
    "any ",
    "recommend",
    "suggest",
    "looking for",
    "i need",
    "i want",
    "is there",
    "find me",
    "near me",
    "close to",
    "best ",
    "top ",
    "how much",
    "how do i",
    "how can i",
    "can i get",
    "do you know",
    "فين",
    "وين",
    "أين",
    "اين",
    "عايز",
    "عاوز",
    "محتاج",
    "أريد",
    "ابحث",
    "أبحث",
    "تنصحني",
    "توصيني",
    "يوجد",
    "متوفر",
    "متاح",
    "في مدينتي",
    "داخل مدينتي",
    "قريب",
    "قريبة",
    "أفضل",
    "افضل"
  ];
  if (lookupVerbs.some((k) => q.includes(k))) {
    return true;
  }
  const hasQuestionMark = q.includes("?") || message.includes("؟");
  const isShort = message.trim().split(/\s+/).length <= 6;
  return hasQuestionMark || isShort;
}

function safeDiscoveryFallback(locale: LocaleCode): string {
  if (locale === "ar") {
    return [
      "حالياً تعذّر الوصول لمصادر بحث الويب الموثوقة أو لم أجد نتائج كافية داخل مدينتي.",
      "لن أذكر أسماء غير مؤكدة.",
      "حاول إضافة تفاصيل أدق مثل: النوع، المنطقة، والميزانية."
    ].join(" ");
  }
  return [
    "Trusted web search is currently unavailable or returned insufficient in-Madinaty results.",
    "I won’t list unverified venue names.",
    "Try adding more detail such as category, district, and budget."
  ].join(" ");
}

function buildSerperQuery(message: string): string {
  return [
    message,
    "Madinaty",
    "New Cairo",
    "Egypt",
    "(site:google.com/maps OR site:tripadvisor.com OR site:facebook.com OR site:instagram.com)"
  ].join(" ");
}

function isMadinatyRelevant(result: SearchResult): boolean {
  const text = `${result.title ?? ""} ${result.snippet ?? ""} ${result.link ?? ""}`.toLowerCase();
  return (
    text.includes("madinaty") ||
    text.includes("مدينتي") ||
    text.includes("new cairo") ||
    text.includes("القاهرة الجديدة")
  );
}

async function searchTrustedDiscovery(message: string): Promise<SearchResult[] | null> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(SERPER_API_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: buildSerperQuery(message),
      gl: "eg",
      hl: "en",
      num: 10
    })
  });

  if (!response.ok) {
    const err = await response.text().catch(() => "");
    throw new Error(`Serper HTTP ${response.status}: ${err}`);
  }

  const payload = (await response.json()) as {
    organic?: SearchResult[];
  };

  if (!Array.isArray(payload.organic)) {
    return null;
  }

  return payload.organic.filter(isMadinatyRelevant).slice(0, 5);
}

function formatDiscoveryReply(locale: LocaleCode, query: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return safeDiscoveryFallback(locale);
  }

  if (locale === "ar") {
    const lines = [
      `نتائج موثوقة داخل مدينتي بخصوص: "${query}"`,
      ""
    ];

    results.forEach((item, index) => {
      lines.push(`${index + 1}) ${item.title ?? "نتيجة بدون عنوان"}`);
      lines.push(`المصدر: ${item.link ?? "غير متاح"}`);
      if (item.snippet) {
        lines.push(`معلومة: ${item.snippet}`);
      }
      lines.push("");
    });

    lines.push("ملاحظة: أعرض فقط نتائج من الويب مع روابط مصدر، بدون اختلاق بيانات.");
    return lines.join("\n");
  }

  const lines = [
    `Trusted in-Madinaty web results for: "${query}"`,
    ""
  ];

  results.forEach((item, index) => {
    lines.push(`${index + 1}) ${item.title ?? "Untitled result"}`);
    lines.push(`Source: ${item.link ?? "N/A"}`);
    if (item.snippet) {
      lines.push(`Snippet: ${item.snippet}`);
    }
    lines.push("");
  });

  lines.push("Note: Only source-linked web results are shown; no fabricated details.");
  return lines.join("\n");
}

function buildDiscoveryGroundingInstruction(locale: LocaleCode): string {
  if (locale === "ar") {
    return [
      "أنت مساعد مدينتي للبحث المحلي.",
      "استخدم حصراً بيانات المصادر المقدمة لك في الرسالة ولا تضف أي معلومة من عندك.",
      "لا تختلق أسماء أو أسعار أو تقييمات أو عناوين.",
      "إذا كانت معلومة غير موجودة في المصادر، اكتب: غير متاح.",
      "أخرج JSON صالح فقط بدون أي نص إضافي.",
      "صيغة JSON المطلوبة: {\"intro\":\"جملة افتتاحية ودودة قصيرة بالعربية\",\"items\":[{\"name\":\"...\",\"note\":\"وصف قصير مستخلص من snippet\",\"rating\":\"...\",\"sourceName\":\"...\",\"sourceUrl\":\"...\"}],\"followup\":\"سؤال متابعة قصير\"}",
      "intro و followup و note يجب أن تكون بالعربية.",
      "name يجب أن يكون اسم المكان الفعلي (المطعم/المحل/الصفحة) مأخوذاً فقط من حقل title أو من username/handle في الرابط.",
      "ممنوع منعاً باتاً استخدام اسم طبق أو منتج أو فرع (مثل: Pizza Napoli، Chicken Shawarma، Open Air Mall) كـ name.",
      "إذا لم تستطع تحديد الاسم الفعلي للمكان من title أو الرابط، استبعد هذه النتيجة.",
      "تجنب تكرار نفس المكان أكثر من مرة حتى لو تعددت الفروع.",
      "note: وصف قصير ومفيد من snippet، أو اكتب: غير متاح.",
      "sourceName يجب أن يكون أحد: Google Maps, Tripadvisor, Instagram, Facebook."
    ].join(" ");
  }

  return [
    "You are Madinaty local discovery assistant.",
    "Use only the provided source data from the user message.",
    "Do not invent names, prices, ratings, addresses, or hours.",
    "If a field is missing in source data, write: Not available.",
    "Output valid JSON only and no extra text.",
    "Required JSON format: {\"intro\":\"short friendly opener\",\"items\":[{\"name\":\"...\",\"note\":\"short helpful note from snippet\",\"rating\":\"...\",\"sourceName\":\"...\",\"sourceUrl\":\"...\"}],\"followup\":\"short follow-up question\"}",
    "name must be the actual establishment (restaurant/shop/page), taken only from the result `title` field or the account handle in the URL.",
    "Never use a dish name, menu item, product, or mall name (e.g. Pizza Napoli, Chicken Shawarma, Open Air Mall) as the venue name.",
    "If the venue name cannot be identified from title or URL handle, drop the result.",
    "Do not list the same venue more than once even if multiple branches appear.",
    "note must be concise and derived from snippet; if unclear write: Not available.",
    "sourceName must be one of: Google Maps, Tripadvisor, Instagram, Facebook."
  ].join(" ");
}

function tryParseDiscoveryPayload(raw: string, locale: LocaleCode): DiscoveryPayload | null {
  const cleaned = raw.replace(/^```json\s*|\s*```$/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned) as Partial<DiscoveryPayload>;
    if (!parsed || !Array.isArray(parsed.items)) {
      return null;
    }

    const items = parsed.items
      .map((item) => ({
        name: String(item?.name ?? "").trim(),
        note: String(item?.note ?? "").trim(),
        rating: String(item?.rating ?? "").trim(),
        sourceName: String(item?.sourceName ?? "").trim(),
        sourceUrl: String(item?.sourceUrl ?? "").trim()
      }))
      .filter((item) => item.name && item.sourceUrl)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        sourceName: normalizeSourceName(item.sourceName || "", item.sourceUrl),
        note: item.note || (locale === "ar" ? "غير متاح" : "Not available"),
        rating: item.rating || (locale === "ar" ? "غير متاح" : "Not available")
      }));

    if (items.length === 0) {
      return null;
    }

    return {
      intro: String(parsed.intro ?? "").trim(),
      items,
      followup: String(parsed.followup ?? "").trim()
    };
  } catch {
    return null;
  }
}

function renderDiscoveryPayload(locale: LocaleCode, payload: DiscoveryPayload): string {
  const lines: string[] = [];

  if (payload.intro) {
    lines.push(payload.intro, "");
  }

  payload.items.forEach((item) => {
    if (locale === "ar") {
      lines.push(`- **${item.name}** — ${item.note} — التقييم: ${item.rating} — المصدر: [${item.sourceName}](${item.sourceUrl})`);
    } else {
      lines.push(`- **${item.name}** — ${item.note} — Rating: ${item.rating} — Source: [${item.sourceName}](${item.sourceUrl})`);
    }
  });

  if (payload.followup) {
    lines.push("", payload.followup);
  }

  return lines.join("\n");
}

async function synthesizeDiscoveryReplyWithGroq(
  locale: LocaleCode,
  query: string,
  results: SearchResult[]
): Promise<string | null> {
  const sourcePayload = results.map((item, index) => ({
    index: index + 1,
    title: item.title ?? "",
    link: item.link ?? "",
    snippet: item.snippet ?? ""
  }));

  const userPrompt = locale === "ar"
    ? [
        `سؤال المستخدم: ${query}`,
        "",
        "بيانات المصادر (JSON):",
        JSON.stringify(sourcePayload, null, 2),
        "",
        "المطلوب: اختر أفضل النتائج داخل مدينتي وقدّم إجابة ودودة ومنظمة، وكل نقطة يجب أن تحتوي على الرابط.",
        "استخرج الاسم من title أو من username في الرابط فقط، ولا تأخذه من snippet إذا كان طبقاً أو منتجاً.",
        "ممنوع إضافة معلومات غير موجودة في JSON."
      ].join("\n")
    : [
        `User query: ${query}`,
        "",
        "Source data (JSON):",
        JSON.stringify(sourcePayload, null, 2),
        "",
        "Task: pick the best in-Madinaty options and provide a friendly structured answer. Each bullet must include a source link.",
        "Derive the venue name only from the `title` field or the URL handle; never from snippet dishes/products.",
        "Do not add facts not present in JSON."
      ].join("\n");

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      temperature: 0,
      max_tokens: 650,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildDiscoveryGroundingInstruction(locale) },
        { role: "user", content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.text().catch(() => "");
    throw new Error(`Groq discovery synthesis HTTP ${response.status}: ${err}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const reply = payload.choices?.[0]?.message?.content?.trim() ?? "";
  if (!reply) {
    return null;
  }

  const discovery = tryParseDiscoveryPayload(reply, locale);
  if (!discovery) {
    return null;
  }

  return replaceBareUrlsWithHotlinks(renderDiscoveryPayload(locale, discovery));
}

const SEARCH_TOOL = {
  type: "function" as const,
  function: {
    name: "search_madinaty_web",
    description:
      "Search the trusted public web (Google Maps, Tripadvisor, Instagram, Facebook) for physical places, shops, products, services, outings, or rentals located inside Madinaty city. Do NOT use this for questions about Madinaty AI, the ERP project, or our platform services. Use this ONLY for live local city discovery.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Focused search query. Keep it short, relevant, and in the user's language."
        }
      },
      required: ["query"]
    }
  }
};

const INITIATE_WHATSAPP_TOOL = {
  type: "function" as const,
  function: {
    name: "initiate_whatsapp_session",
    description: "Initiate a direct WhatsApp session with the user/visitor when they ask about the platform, our projects (like ERP), or our services, AND the answer is not in the provided facts, OR when they explicitly want to contact us. Requires the visitor's WhatsApp phone number (Egyptian format).",
    parameters: {
      type: "object",
      properties: {
        visitorPhone: {
          type: "string",
          description: "The visitor's WhatsApp phone number in Egyptian format (e.g., 01xxxxxxxxx or +201xxxxxxxxx). MUST be provided by the user in the chat. DO NOT use the admin number +201026655008."
        },
        visitorName: {
          type: "string",
          description: "The visitor's name."
        },
        query: {
          type: "string",
          description: "The visitor's query or question that wasn't answered."
        }
      },
      required: ["visitorPhone"]
    }
  }
};

function buildRouterSystemInstruction(base: string, locale: LocaleCode): string {
  const toolRule = locale === "ar"
    ? "أولاً، اقرأ معلومات (Madinaty AI Platform Facts) المرفقة دائماً. إذا كان السؤال عن منصتنا، أو مشاريعنا (مثل مشروع ERP)، أو خدماتنا، أجب مباشرةً بناءً على تلك المعلومات. إذا لم تجد الإجابة فيها أو أراد المستخدم التواصل معنا، استخدم أداة initiate_whatsapp_session (واطلب رقم الواتساب الخاص به). ثانياً، استخدم أداة search_madinaty_web فقط وحصرياً إذا كان السؤال عن أماكن، محلات، أو منتجات محلية حية داخل مدينة مدينتي."
    : "FIRST, ALWAYS read the provided (Madinaty AI Platform Facts). If the question is about our platform, our projects (like the ERP project), or our services, answer directly based on those facts. If the answer is missing from the facts or the user wants to contact us, use the initiate_whatsapp_session tool (ask for their WhatsApp number). SECOND, use the search_madinaty_web tool ONLY and EXCLUSIVELY for questions about physical places, shops, or local products inside Madinaty city.";
  return `${base}\n\n${toolRule}`;
}

type GroqMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
};

type GroqChoice = {
  message?: {
    content?: string;
    tool_calls?: Array<{
      id: string;
      type: "function";
      function: { name: string; arguments: string };
    }>;
  };
};

async function callGroq(messages: GroqMessage[], useTools: boolean, useJson: boolean): Promise<GroqChoice | null> {
  const body: Record<string, unknown> = {
    model: MODEL_NAME,
    temperature: 0,
    max_tokens: 650,
    messages
  };
  if (useTools) {
    body.tools = [SEARCH_TOOL, INITIATE_WHATSAPP_TOOL];
    body.tool_choice = "auto";
  }
  if (useJson) {
    body.response_format = { type: "json_object" };
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.text().catch(() => "");
    throw new Error(`Groq HTTP ${response.status}: ${err}`);
  }

  const payload = (await response.json()) as { choices?: GroqChoice[] };
  return payload.choices?.[0] ?? null;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { message, history = [], locale = "en" } = body as {
    message?: string;
    history?: { role: string; content: string }[];
    locale?: LocaleCode;
  };

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
  }

  const detectedLocale: LocaleCode = locale ?? (isArabic(message) ? "ar" : "en");
  const systemInstruction = buildRouterSystemInstruction(buildSystemInstruction(locale), detectedLocale);

  const safeHistory: GroqMessage[] = history
    .filter((entry) => entry.content)
    .slice(-6)
    .map((entry) => ({
      role: entry.role === "ai" ? "assistant" : "user",
      content: entry.content
    }));

  try {
    const firstChoice = await callGroq(
      [
        { role: "system", content: systemInstruction },
        ...safeHistory,
        { role: "user", content: message }
      ],
      true,
      false
    );

    const toolCall = firstChoice?.message?.tool_calls?.[0];

    if (toolCall && toolCall.function?.name === "initiate_whatsapp_session") {
      let visitorPhone = "";
      let visitorName = "Visitor";
      let query = "";
      try {
        const args = JSON.parse(toolCall.function.arguments || "{}") as {
          visitorPhone?: string;
          visitorName?: string;
          query?: string;
        };
        visitorPhone = args.visitorPhone?.trim() || "";
        visitorName = args.visitorName?.trim() || "Visitor";
        query = args.query?.trim() || "";
      } catch {
        // ignore
      }

      if (visitorPhone) {
        // Hard guardrail to prevent the AI from hallucinating the admin number as the visitor number
        const visitorClean = visitorPhone.replace(/\D/g, "");
        if (visitorClean.includes("01026655008") || visitorClean.includes("201026655008") || visitorClean.length < 10) {
          return NextResponse.json({
            reply: detectedLocale === "ar"
              ? "من فضلك أدخل رقم الواتساب الخاص بك (بالصيغة المصرية) لكي أتمكن من ربطك بفريقنا المباشر."
              : "Please provide your personal WhatsApp number (in Egyptian format) so I can connect you with our live team."
          });
        }

        try {
          const wahaBaseUrl = process.env.WAHA_BASE_URL;
          const wahaApiKey = process.env.WAHA_API_KEY;
          const wahaSession = process.env.WAHA_SESSION || "default";
          const adminPhone = "+201026655008"; // Ziada's phone number

          if (wahaBaseUrl && wahaApiKey) {
            // Helper to format Egyptian phone number for WAHA
            const cleanDigits = visitorPhone.replace(/\D/g, "");
            let digits = cleanDigits;
            if (digits.startsWith("002")) {
              digits = digits.slice(2);
            }
            if (digits.startsWith("01") && digits.length === 11) {
              digits = "2" + digits;
            }
            if (digits.startsWith("1") && digits.length === 10) {
              digits = "20" + digits;
            }
            const visitorChatId = `${digits}@c.us`;

            const visitorMessage = detectedLocale === "ar"
              ? `مرحباً ${visitorName}! تلقينا استفسارك على موقع Madinaty AI بخصوص: "${query}". سيقوم أحد ممثلينا بالتواصل معك هنا قريباً.`
              : `Hi ${visitorName}! We received your inquiry on Madinaty AI regarding: "${query}". One of our representatives will chat with you here shortly.`;

            // 1. Send initiation message to visitor
            await fetch(`${wahaBaseUrl}/api/sendText`, {
              method: "POST",
              headers: {
                "X-Api-Key": wahaApiKey,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                session: wahaSession,
                chatId: visitorChatId,
                text: visitorMessage
              })
            });

            // 2. Send notification to Ziada/Admin
            const adminChatId = `${adminPhone.replace(/\D/g, "")}@c.us`;
            const adminMessage = `🔔 *استفسار جديد من الموقع (New Website Inquiry)*\n\nالاسم (Name): ${visitorName}\nالتليفون (Phone): ${visitorPhone}\nالاستفسار (Query): ${query}`;

            await fetch(`${wahaBaseUrl}/api/sendText`, {
              method: "POST",
              headers: {
                "X-Api-Key": wahaApiKey,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                session: wahaSession,
                chatId: adminChatId,
                text: adminMessage
              })
            });

            const successReply = detectedLocale === "ar"
              ? `تم بدء جلسة واتساب بنجاح! لقد أرسلنا رسالة إلى رقمك ${visitorPhone}. سيقوم فريقنا بالتواصل معك الآن.`
              : `WhatsApp session initiated successfully! We've sent a message to your number ${visitorPhone}. Our team will connect with you now.`;
            return NextResponse.json({ reply: successReply });
          } else {
            console.error("WAHA credentials missing in environment variables.");
          }
        } catch (error: any) {
          console.error("WAHA initiation error:", error?.message || error);
        }

        // Fallback message if WAHA fails
        const fallbackReply = detectedLocale === "ar"
          ? `عذراً، لم نتمكن من إرسال رسالة واتساب تلقائياً بسبب مشكلة فنية. يرجى التواصل معنا مباشرة على رقمنا: +201026655008.`
          : `Sorry, we couldn't send a WhatsApp message automatically. Please contact us directly at +201026655008.`;
        return NextResponse.json({ reply: fallbackReply });
      }
    }

    if (toolCall && toolCall.function?.name === "search_madinaty_web") {
      let searchQuery = message;
      try {
        const args = JSON.parse(toolCall.function.arguments || "{}") as { query?: string };
        if (args.query && args.query.trim()) {
          searchQuery = args.query.trim();
        }
      } catch {
        // fall back to original user message
      }

      try {
        const results = await searchTrustedDiscovery(searchQuery);
        if (results && results.length > 0) {
          const groundedReply = await synthesizeDiscoveryReplyWithGroq(detectedLocale, searchQuery, results);
          if (groundedReply) {
            return NextResponse.json({ reply: groundedReply });
          }
          return NextResponse.json({
            reply: formatDiscoveryReply(detectedLocale, searchQuery, results)
          });
        }
      } catch (error: any) {
        console.error("Serper discovery error:", error?.message || error);
      }

      return NextResponse.json({ reply: safeDiscoveryFallback(detectedLocale) });
    }

    const directReply = firstChoice?.message?.content?.trim() ?? "";
    const fallback = detectedLocale === "ar"
      ? "أنا متخصص في مدينتي فقط. جرب سؤالاً يخص المدينة."
      : "I am focused on Madinaty. Try asking about the city.";
    return NextResponse.json({ reply: directReply || fallback });
  } catch (error: any) {
    console.error("Groq chat error:", error?.message || error);
    return NextResponse.json({ reply: "Madinaty Assistant is currently offline." }, { status: 502 });
  }
}
