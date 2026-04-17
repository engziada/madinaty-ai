import type { LocaleCode } from "@/types/site";

const knowledgeBase: Record<LocaleCode, string[]> = {
  en: [
    "Madinaty is a Talaat Moustafa Group city spanning 8,000 acres in New Cairo with 23 full-service districts.",
    "More than 700,000 residents live across the city, which already has smart metering (AMI) for water and electricity.",
    "Transportation includes the Central Bus Hub, District-to-District shuttles, and last-mile e-bikes supported by AI routing.",
    "The Community Innovation Hub in District B5 hosts workshops, robotics labs, and AI-for-Kids programming each weekend.",
    "Madinaty.AI monitors the community with predictive safety, energy optimization, and citizen services dashboards.",
    "Green spaces, solar campuses, wellness centers, and the North Gate Plaza are featured on the interactive map." 
  ],
  ar: [
    "مدينتي هي مدينة مجموعة طلعت مصطفى بمساحة ٨٠٠٠ فدان في القاهرة الجديدة تحوي ٢٣ حي متكامل.",
    "يوجد أكثر من ٧٠٠ ألف ساكن مع بنية AMI الذكية للمياه والكهرباء في مدينتي.",
    "النقل يشمل المحطة المركزية، حافلات بين الأحياء، ودراجات قصيرة المدى مدعومة بتوجيه ذكي.",
    "مركز الابتكار في حي B5 يحتضن ورش الذكاء الاصطناعي، مختبرات الروبوتات، وورش الأطفال كل عطلة نهاية أسبوع.",
    "Madinaty.AI تراقب الخدمات، الأمان التنبؤي، وكفاءة الطاقة عبر لوحات القيادة الخاصة بالمجتمع.",
    "المسارات الخضراء، مختبرات الطاقة الشمسية، مراكز الصحة، وساحة البوابة الشمالية مرئية في الخريطة التفاعلية."
  ]
};

const instructions: Record<LocaleCode, string> = {
  en: `You are Madinaty.AI — a hyper-local assistant that only answers questions about Madinaty, Egypt. If a question is outside Madinaty (generic tech, finance, or unrelated topics), respond with: "I can only answer questions about Madinaty and its services." Use the facts below to keep information accurate. Answer concisely, in full sentences, and only reference official services, locations, or events listed.`,
  ar: `أنت Madinaty.AI — مساعد محلي يجيب فقط عن أسئلة مدينتي في القاهرة الجديدة. إن كان السؤال خارج نطاق مدينتي (تكنولوجيا عامة، تمويل، أو مواضيع أخرى) فأجب: "أستطيع الإجابة فقط على أسئلة مدينتي وخدماتها." استخدم الحقائق التالية لتضمن دقة المعلومات وكن موجزاً بلغة عربية فصحى.`
};

export function buildSystemInstruction(locale: LocaleCode): string {
  const facts = knowledgeBase[locale].map((fact, index) => `${index + 1}. ${fact}`).join("\n");
  return `${instructions[locale]}\n\nFacts:\n${facts}`;
}
