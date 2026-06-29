/**
 * enrollmentSteps — Conversation step definitions
 */

import type { ConversationStep, SelectOption, CascadingSelectConfig } from "../ConversationEngine";
import type { LocaleCode } from "@/types/site";

export interface EnrollmentChatForm {
  childName?: string;
  childAge?: string;
  childGender?: string;
  childGrade?: string;
  schoolName?: string;
  interests?: string[];
  hobbies?: string;
  parentName?: string;
  parentNationalId?: string;

  participantName?: string;
  participantAge?: string;
  participantEducation?: string;
  companyName?: string;
  jobTitle?: string;
  participantNationalId?: string;

  phone?: string;
  email?: string;
  addressType?: string;
  addressArea?: string;
  preferredDate?: string;
}

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
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return grades.map((n) =>
    locale === "ar"
      ? { value: `grade-${n}`, label: `الصف ${n}` }
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

export function getEnrollmentSteps(courseSlug: string): ConversationStep<EnrollmentChatForm>[] {
  const profile = (courseSlug === "ai-pilot-day") ? "executive" : (courseSlug === "python-ai-programming" || courseSlug === "robotics-smart-systems") ? "general" : "kids";

  const addressSteps: ConversationStep<EnrollmentChatForm>[] = [
    {
      id: "addressType",
      field: "addressType",
      botMessage: (_ctx, locale) => locale === "ar" ? "فين ساكن في مدينتي؟ 🏠" : "Where do you live in Madinaty? 🏠",
      inputType: "select",
      options: addressTypeOptions,
      validate: (v, locale) => (!v ? { valid: false, error: locale === "ar" ? "اختار نوع السكن" : "Please select your address type" } : { valid: true }),
    },
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
      validate: (v, locale) => (!v || String(v).trim().length === 0 ? { valid: false, error: locale === "ar" ? "اكتب الرقم" : "Please enter the number" } : { valid: true }),
    }
  ];

  const contactSteps: ConversationStep<EnrollmentChatForm>[] = [
    {
      id: "phone",
      field: "phone",
      botMessage: (_ctx, locale) => locale === "ar" ? "رقم الموبايل؟ 📱" : "Phone number? 📱",
      inputType: "tel",
      validate: (v, locale) => (!/^\+?[0-9\s-]{7,15}$/.test(String(v ?? "")) ? { valid: false, error: locale === "ar" ? "رقم الموبايل مش صحيح" : "Please enter a valid phone number" } : { valid: true }),
    },
    {
      id: "email",
      field: "email",
      botMessage: (_ctx, locale) => locale === "ar" ? "البريد الإلكتروني؟ 📧" : "Email address? 📧",
      inputType: "email",
      validate: (v, locale) => (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v ?? "")) ? { valid: false, error: locale === "ar" ? "البريد الإلكتروني مش صحيح" : "Please enter a valid email" } : { valid: true }),
    }
  ];

  if (profile === "executive") {
    return [
      {
        id: "participantName",
        field: "participantName",
        botMessage: (_ctx, locale) => locale === "ar" ? "أهلاً بك في القيادة بالذكاء الاصطناعي 🚀. ما هو اسمك الكريم؟" : "Welcome to AI Executive Pilot 🚀. What is your name?",
        inputType: "text",
        inputProps: { maxLength: 60 },
        validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "الاسم يجب أن يكون حرفين على الأقل" : "Name must be at least 2 characters" } : { valid: true }),
      },
      {
        id: "companyName",
        field: "companyName",
        botMessage: (_ctx, locale) => locale === "ar" ? "ما هو اسم شركتك؟ 🏢" : "What is your company name? 🏢",
        inputType: "text",
        validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب اسم الشركة" : "Please enter company name" } : { valid: true }),
      },
      {
        id: "jobTitle",
        field: "jobTitle",
        botMessage: (_ctx, locale) => locale === "ar" ? "ما هو المسمى الوظيفي الخاص بك؟ 💼" : "What is your job title? 💼",
        inputType: "text",
        validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب المسمى الوظيفي" : "Please enter job title" } : { valid: true }),
      },
      {
        id: "participantNationalId",
        field: "participantNationalId",
        botMessage: (_ctx, locale) => locale === "ar" ? "الرقم القومي؟ (١٤ رقم) 🪪" : "National ID? (14 digits) 🪪",
        inputType: "text",
        inputProps: { inputMode: "numeric", maxLength: 14 },
        validate: (v, locale) => (!/^\d{14}$/.test(String(v ?? "").replace(/\D/g, "")) ? { valid: false, error: locale === "ar" ? "الرقم القومي لازم يكون ١٤ رقم" : "National ID must be exactly 14 digits" } : { valid: true }),
        transform: (v) => String(v ?? "").replace(/\D/g, ""),
      },
      ...contactSteps,
      ...addressSteps,
      {
        id: "review",
        field: "",
        botMessage: (ctx, locale) => locale === "ar" ? `تمام يا ${ctx.participantName}! خلينا نراجع البيانات قبل ما نبعتها 🚀` : `Alright ${ctx.participantName}! Let's review everything before blastoff! 🚀`,
        inputType: "review",
        validate: () => ({ valid: true }),
      }
    ];
  }

  if (profile === "general") {
    return [
      {
        id: "participantName",
        field: "participantName",
        botMessage: (_ctx, locale) => locale === "ar" ? "هاو! 🐕 أنا أسترو. إيه اسمك؟" : "Woof! 🐕 I'm Astro. What's your name?",
        inputType: "text",
        inputProps: { maxLength: 60 },
        validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "الاسم لازم يكون حرفين على الأقل" : "Name must be at least 2 characters" } : { valid: true }),
      },
      {
        id: "participantAge",
        field: "participantAge",
        botMessage: (ctx, locale) => locale === "ar" ? `أهلاً يا ${ctx.participantName}! 🎉 عندك كام سنة؟` : `Nice to meet you, ${ctx.participantName}! 🎉 How old are you?`,
        inputType: "number",
        inputProps: { min: 12, max: 99 },
        validate: (v, locale) => {
          const n = Number(v);
          return (!Number.isFinite(n) || n < 12 || n > 99) ? { valid: false, error: locale === "ar" ? "العمر لازم يكون بين ١٢ و ٩٩" : "Age must be between 12 and 99" } : { valid: true };
        },
      },
      {
        id: "participantEducation",
        field: "participantEducation",
        botMessage: (_ctx, locale) => locale === "ar" ? "إيه هي جامعتك أو مدرستك؟ 🏫" : "What is your university or school? 🏫",
        inputType: "text",
        validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب اسم الجهة التعليمية" : "Please enter your school/university" } : { valid: true }),
      },
      {
        id: "hobbies",
        field: "hobbies",
        botMessage: (_ctx, locale) => locale === "ar" ? "بتحب تعمل إيه وقت الفراغ؟ ⚽🎨🎮" : "What do you like doing for fun? ⚽🎨🎮",
        inputType: "text",
        validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب هواية واحدة على الأقل" : "Tell us at least one hobby" } : { valid: true }),
      },
      {
        id: "participantNationalId",
        field: "participantNationalId",
        botMessage: (_ctx, locale) => locale === "ar" ? "الرقم القومي؟ (١٤ رقم) 🪪" : "National ID? (14 digits) 🪪",
        inputType: "text",
        inputProps: { inputMode: "numeric", maxLength: 14 },
        validate: (v, locale) => (!/^\d{14}$/.test(String(v ?? "").replace(/\D/g, "")) ? { valid: false, error: locale === "ar" ? "الرقم القومي لازم يكون ١٤ رقم" : "National ID must be exactly 14 digits" } : { valid: true }),
        transform: (v) => String(v ?? "").replace(/\D/g, ""),
      },
      ...contactSteps,
      ...addressSteps,
      {
        id: "review",
        field: "",
        botMessage: (ctx, locale) => locale === "ar" ? `تمام يا ${ctx.participantName}! خلينا نراجع البيانات قبل ما نبعتها 🚀` : `Alright ${ctx.participantName}! Let's review everything before blastoff! 🚀`,
        inputType: "review",
        validate: () => ({ valid: true }),
      }
    ];
  }

  // Kids profile
  return [
    {
      id: "childName",
      field: "childName",
      botMessage: (_ctx, locale) => locale === "ar" ? "هاو! 🐕 أنا أسترو، صديقك الذكي! خلينا نسجلك في أروع مغامرة AI! إيه اسم الطالب؟" : "Woof! 🐕 I'm Astro, your AI buddy! Let's sign you up for an awesome AI adventure! What's the student's name?",
      inputType: "text",
      inputProps: { maxLength: 60 },
      validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "الاسم لازم يكون حرفين على الأقل" : "Name must be at least 2 characters" } : { valid: true }),
    },
    {
      id: "childAge",
      field: "childAge",
      botMessage: (ctx, locale) => locale === "ar" ? `أهلاً يا ${ctx.childName}! 🎉 عندك كام سنة؟` : `Nice to meet you, ${ctx.childName}! 🎉 How old are you?`,
      inputType: "number",
      inputProps: { min: 7, max: 12 },
      validate: (v, locale) => {
        const n = Number(v);
        return (!Number.isFinite(n) || n < 7 || n > 12) ? { valid: false, error: locale === "ar" ? "العمر لازم يكون بين ٧ و ١٢" : "Age must be between 7 and 12" } : { valid: true };
      },
    },
    {
      id: "childGender",
      field: "childGender",
      botMessage: (_ctx, locale) => locale === "ar" ? "ممتاز! أنت... 🤔" : "Awesome! Are you a... 🤔",
      inputType: "select",
      options: genderOptions,
      validate: (v) => ({ valid: Boolean(v) }),
    },
    {
      id: "childGrade",
      field: "childGrade",
      botMessage: (_ctx, locale) => locale === "ar" ? "في أنهي صف دراسي؟ 📖" : "What grade are you in? 📖",
      inputType: "select",
      options: gradeOptions,
      validate: (v) => ({ valid: Boolean(v) }),
    },
    {
      id: "schoolName",
      field: "schoolName",
      botMessage: (_ctx, locale) => locale === "ar" ? "وبتروح مدرسة إيه؟ 🏫" : "What school do you go to? 🏫",
      inputType: "text",
      validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب اسم المدرسة" : "Please enter the school name" } : { valid: true }),
    },
    {
      id: "interests",
      field: "interests",
      botMessage: (_ctx, locale) => locale === "ar" ? "إيه المواضيع اللي تحب تتعلمها؟ اختار اللي يعجبك! 🤖" : "What AI topics sound cool? Pick as many as you want! 🤖",
      inputType: "multi-select",
      options: interestOptions,
      validate: () => ({ valid: true }), // Optional
    },
    {
      id: "hobbies",
      field: "hobbies",
      botMessage: (_ctx, locale) => locale === "ar" ? "بتحب تعمل إيه وقت الفراغ؟ ⚽🎨🎮" : "What do you like doing for fun? ⚽🎨🎮",
      inputType: "text",
      validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب هواية واحدة على الأقل" : "Tell us at least one hobby" } : { valid: true }),
    },
    {
      id: "parentName",
      field: "parentName",
      botMessage: (ctx, locale) => locale === "ar" ? `اختيارات ممتازة يا ${ctx.childName}! 🌟 دلوقتي محتاج أتكلم مع ولي الأمر. إيه اسم ولي الأمر؟` : `Great choices, ${ctx.childName}! 🌟 Now I need to chat with your parent. What's their name?`,
      inputType: "text",
      validate: (v, locale) => (String(v ?? "").trim().length < 2 ? { valid: false, error: locale === "ar" ? "اكتب الاسم الكامل" : "Please enter full name" } : { valid: true }),
    },
    {
      id: "parentNationalId",
      field: "parentNationalId",
      botMessage: (_ctx, locale) => locale === "ar" ? "الرقم القومي لولي الأمر؟ (١٤ رقم) 🪪" : "Parent's national ID? (14 digits) 🪪",
      inputType: "text",
      inputProps: { inputMode: "numeric", maxLength: 14 },
      validate: (v, locale) => (!/^\d{14}$/.test(String(v ?? "").replace(/\D/g, "")) ? { valid: false, error: locale === "ar" ? "الرقم القومي لازم يكون ١٤ رقم" : "National ID must be exactly 14 digits" } : { valid: true }),
      transform: (v) => String(v ?? "").replace(/\D/g, ""),
    },
    ...contactSteps,
    ...addressSteps,
    {
      id: "review",
      field: "",
      botMessage: (ctx, locale) => locale === "ar" ? `تمام يا ${ctx.childName}! خلينا نراجع البيانات قبل ما نبعتها 🚀` : `Alright ${ctx.childName}! Let's review everything before blastoff! 🚀`,
      inputType: "review",
      validate: () => ({ valid: true }),
    }
  ];
}
