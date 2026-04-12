import type { LocaleCode, SiteContent } from "@/types/site";

const sharedMapImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmMkBSzP2fTT6TjeSpX3ylG57fyH6xG6EKr7cnz_QGW364SbNUyun7M1mj-6g4PVunqqSfvBTgpD94JrLK6_xdSmXuz2-yeRr_9XsWTgnd-OaDpuUSoN0uLHS7IqQunKeyqKF67AE_-YaQBBIIaIvvSrKdiQX-DHQBA6ovioJ8OeEbTDqua5_bB2fpx6tXIet_vmrScDx3izv_wcxtf0UT7NMZlxkpVtA5YT098S59q6d_XSSFNJHmdtCStJOhPzsypZ9gu9_qc64";

export const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC2zZgFs2DTCtmud3GZRvzcjBfY1UYMrbKLC1dwi3w6M1M4Vn-OfuOYb55bgAjrAtrKLKSkwvfjibyRiApCxfjyh0FkXUh-K4lBQlxucZxFncfuczNmKfEiSLtHouvYu-J9_k7bO3gfwCCzCJrzZLdhlk81EozPGAF1sVLu611vxcitFrhpLWGyGjBf6uifckq-iJnQgaZaEtIYZSHYIcOlVWdz5RSg3wgUjk0b-NYpagTpRwzSb-6hAT3Y2KUGJ4rcmepLQpqtEGQ";

export const genesisImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA90lQAoCHryaEL9vfJL-Ey4Sn_To5PMyFORTAQVeAiLVLbse1YbeG9UTZ_705ipUFEjA3gJQNpUPCFxHxz4dvS1N7iaus9tRk-Mups7sUZIGsAXL0NWa4Xajxj2Fzy6cUwlE2j3DPO70pjaf9qJkmujO_qa8Hx_spvcOfGza6xYgOS6_K1G4XGaJwkHyF7LWlwnYFrjSaJFqdhBcxfTy4V-a7uflOh-9BYTP_fE8XZt0-9kyaSovjfF2lG23v6CtT54kPUA4zy6tM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4XD2nrkQ4dIHcp3E3XttlxK6rEEWPqmsdT7LazTCis2h383TcOZ1uWtx73teEvbu2R0zZCva4C0CZvy3EmDup6qbhwIYLVUoSZCBybx2kGRbGnZyi5R_Khw7nDhFO4k9r_-l-OHxAx9Y4ImKH5UPgFBIa_mtsuz05So2ynHhxm67qgdH7RP4maYbUALxvrNF6E7xdx0vXYKLgi1VZ7uQ02iHm5aZtWdB6OTE5YYgpgX843U-u95hM4r9W8j0mH9VgEBTUGd4Q4Vg"
];

const contentEn: SiteContent = {
  nav: {
    platform: "Madinaty Bot",
    services: "Services",
    map: "Map",
    roadmap: "Roadmap",
    cta: "Launch Portal",
    localeSwitch: "العربية"
  },
  hero: {
    overline: "New Cairo · 8,000 Acres · Egypt",
    titlePrefix: "The Intelligence of",
    titleHighlight: "Madinaty",
    titleSuffix: "Awakens",
    text: "Madinaty — Egypt's largest integrated city housing 700,000+ residents across 23 districts — is getting its own AI layer. Built by the community, for the community.",
    primaryAction: "Madinaty Bot",
    secondaryAction: "View Roadmap"
  },
  about: {
    overline: "Why Madinaty AI",
    title: "From Technology Consumption to Technology Creation",
    summary:
      "Madinaty spans 8,000 acres in New Cairo, developed by Talaat Moustafa Group (TMG). With Advanced Metering Infrastructure (AMI) already in place for water and electricity, Madinaty.AI layers intelligent services on top — from shuttle routing to community analytics.",
    highlights: [
      "Hands-on AI workshops across Madinaty's 23 districts",
      "Smart services for property, transport, safety, and city insights",
      "Open builder community: developers, students, and entrepreneurs"
    ]
  },
  sections: {
    servicesOverline: "Neural Infrastructure",
    servicesTitle: "AI Services Built for Real City Needs",
    chatOverline: "Ask Madinaty.AI",
    chatTitle: "Your Intelligent Community Companion",
    mapOverline: "Navigate Your Future",
    mapTitle: "Interactive Madinaty Map"
  },
  cards: {
    transportTitle: "Smart Transportation",
    transportText: "Predictive routing and autonomous shuttle orchestration across Madinaty's 23 districts — connected to the central bus hub for zero-friction mobility.",
    insightsTitle: "Community Insights",
    insightsText: "Hyper-local sentiment, events, and service health surfaced through real-time intelligence across all sub-compounds.",
    homeTitle: "AI Home Management",
    homeText: "Energy, safety, and climate optimization for apartments and villas, building on Madinaty's AMI smart metering infrastructure.",
    safetyTitle: "Predictive Safety",
    safetyText: "Continuous monitoring with privacy-first design and preventive response automation across all residential clusters citywide."
  },
  chat: {
    systemOnline: "System Online",
    placeholder: "Ask about Madinaty services, events, transport...",
    send: "Send",
    messages: [
      { role: "ai", content: "Hello! I'm your Madinaty AI assistant. I can help with shuttle routes, workshops, community events, and live city updates across all 23 districts." },
      { role: "user", content: "Where is the next AI workshop for kids?" },
      { role: "ai", content: "At the Community Innovation Hub near District B5, next Saturday at 10:00 AM. It's free for the first 42 Madinaty families. Want me to reserve a slot?" }
    ]
  },
  map: {
    subtitle: "Tap a node to inspect live status.",
    locations: [
      {
        id: "innovation",
        title: "Innovation Hub · District B5",
        details: "Status: Active · 42 AI Labs Online",
        dotClassName: "dot-1"
      },
      {
        id: "logistics",
        title: "Central Bus Hub",
        details: "Fleet: 100% Charged · 12 Shuttles Active",
        dotClassName: "dot-2"
      }
    ]
  },
  event: {
    overline: "Upcoming Events",
    title: "AI for Kids: Build the Future",
    subtitle: "Community First Edition",
    description:
      "A free, limited-seat workshop for ages 8–14 held at Madinaty's Community Innovation Hub. Kids explore robotics, neural networks, and creative coding in a hands-on environment.",
    promoLabel: "Promotion · Free Offer",
    promoTitle: "Free: First 42 Seats Fully Sponsored",
    promoDescription:
      "Madinaty families register at no cost in this launch edition. Priority given to early signups and active community members from any sub-compound.",
    labTitle: "Interactive Robotics Lab",
    labSubtitle: "Hands-on · District B5",
    cta: "Enroll My Child",
    stats: [
      { value: "12", label: "Modules" },
      { value: "Free", label: "Tuition" },
      { value: "42", label: "Seats" }
    ]
  },
  footer: {
    copy: "© 2026 Madinaty.AI · New Cairo, Egypt · Built by the Community.",
    links: ["Privacy Policy", "System Status", "Terms of Use"]
  },
  vision: {
    overline: "Vision & Future",
    title: "The Intelligence Layer Over",
    subtitle: "Madinaty — 8,000 acres, 700,000 residents, 23 districts — deserves a city-brain. Madinaty.AI is that layer: connecting people, services, and infrastructure through adaptive intelligence.",
    genesisOverline: "The Genesis",
    genesisTitle: "Built by the Community, for the Community",
    genesisParagraphs: [
      "Madinaty was developed by Talaat Moustafa Group (TMG) starting in 2006, designed by American firms HHCP, SWA, and SASKI. Today it hosts 700,000+ residents across 23 sub-compounds with AMI smart metering and city-wide bus connectivity.",
      "Madinaty.AI was born from this foundation — a community initiative by local founders, builders, and families who believe AI should enhance real daily life: commutes, education, safety, and local commerce."
    ],
    pillarsOverline: "Strategic Pillars",
    pillarsTitle: "Foundations of Transformation",
    roadmapOverline: "The Roadmap",
    roadmapTitle: "Three Phases to Full Activation",
    ctaTitle: "Be Part of the Future",
    ctaText: "Join the initiative and help shape the next chapter of intelligent urban living in Madinaty — Egypt's smartest city.",
    ctaButton: "Join the Initiative"
  }
};

const contentAr: SiteContent = {
  nav: {
    platform: "مدينتي بوت",
    services: "الخدمات",
    map: "الخريطة",
    roadmap: "خارطة الطريق",
    cta: "بوابة الإطلاق",
    localeSwitch: "English"
  },
  hero: {
    overline: "القاهرة الجديدة · ٨٠٠٠ فدان · مصر",
    titlePrefix: "ذكاء",
    titleHighlight: "مدينتي",
    titleSuffix: "يبدأ الآن",
    text: "مدينتي — أكبر مدينة متكاملة في مصر بأكثر من ٧٠٠ ألف ساكن في ٢٣ حياً — تحصل على طبقتها الذكية. بناها المجتمع، وللمجتمع.",
    primaryAction: "مدينتي بوت",
    secondaryAction: "عرض خارطة الطريق"
  },
  about: {
    overline: "لماذا مدينتي AI",
    title: "من استهلاك التكنولوجيا إلى صناعتها",
    summary:
      "مدينتي تمتد على ٨٠٠٠ فدان في القاهرة الجديدة، طوّرتها مجموعة طلعت مصطفى (TMG). مع بنية AMI الذكية للمياه والكهرباء، تُضيف Madinaty.AI طبقة ذكاء فوق هذه البنية — من توزيع الحافلات إلى تحليل المجتمع.",
    highlights: [
      "ورش ذكاء اصطناعي عملية في أحياء مدينتي الـ٢٣",
      "خدمات ذكية للعقارات والنقل والسلامة ورؤى المدينة",
      "مجتمع مبنيّ على الانفتاح: مطورون وطلاب ورواد أعمال"
    ]
  },
  sections: {
    servicesOverline: "البنية العصبية",
    servicesTitle: "خدمات ذكاء اصطناعي لحاجات المدينة الحقيقية",
    chatOverline: "اسأل Madinaty.AI",
    chatTitle: "مساعدك الذكي للمجتمع",
    mapOverline: "تنقّل نحو المستقبل",
    mapTitle: "خريطة مدينتي التفاعلية"
  },
  cards: {
    transportTitle: "النقل الذكي",
    transportText: "توجيه تنبؤي وتنظيم حافلات ذاتية عبر ٢٣ حياً في مدينتي — متصل بمحطة الحافلات المركزية.",
    insightsTitle: "رؤى المجتمع",
    insightsText: "تحليلات آنية للمشاعر والأحداث وصحة الخدمات على مستوى جميع المجمعات السكنية.",
    homeTitle: "إدارة المنزل بالذكاء الاصطناعي",
    homeText: "تحسين الطاقة والسلامة والمناخ داخل الشقق والفيلات بالتكامل مع بنية AMI الذكية.",
    safetyTitle: "سلامة تنبؤية",
    safetyText: "مراقبة مستمرة بتصميم يحافظ على الخصوصية واستجابة وقائية عبر كل المجمعات السكنية."
  },
  chat: {
    systemOnline: "النظام متصل",
    placeholder: "اسأل عن خدمات مدينتي، الفعاليات، النقل...",
    send: "إرسال",
    messages: [
      { role: "ai", content: "مرحباً! أنا مساعد Madinaty AI. أستطيع مساعدتك في خطوط الحافلات والورش والفعاليات وتحديثات المدينة الحية عبر جميع الـ٢٣ حياً." },
      { role: "user", content: "أين تقام ورشة الذكاء الاصطناعي القادمة للأطفال؟" },
      { role: "ai", content: "في مركز الابتكار المجتمعي بحي B5، السبت القادم الساعة ١٠ صباحاً. مجانية لأول ٤٢ عائلة. هل تريد حجز مقعد؟" }
    ]
  },
  map: {
    subtitle: "اضغط على أي نقطة لمعرفة الحالة المباشرة.",
    locations: [
      {
        id: "innovation",
        title: "مركز الابتكار · حي B5",
        details: "الحالة: نشط · ٤٢ مختبر ذكاء اصطناعي",
        dotClassName: "dot-1"
      },
      {
        id: "logistics",
        title: "محطة الحافلات المركزية",
        details: "الأسطول: مشحون ١٠٠٪ · ١٢ حافلة نشطة",
        dotClassName: "dot-2"
      }
    ]
  },
  event: {
    overline: "الفعاليات القادمة",
    title: "الذكاء الاصطناعي للأطفال: ابنِ المستقبل",
    subtitle: "نسخة المجتمع الأولى",
    description: "ورشة مجانية محدودة المقاعد لأعمار ٨–١٤ في مركز الابتكار بمدينتي. يستكشف الأطفال الروبوتات والشبكات العصبية والبرمجة الإبداعية.",
    promoLabel: "عرض ترويجي · مجاني",
    promoTitle: "مجاني: أول ٤٢ مقعد برعاية كاملة",
    promoDescription: "يتسجّل سكان مدينتي مجاناً في النسخة الأولى، مع أولوية للحجز المبكر والأعضاء النشطين من أي حي.",
    labTitle: "مختبر الروبوتات التفاعلي",
    labSubtitle: "عملي · حي B5",
    cta: "سجّل طفلي",
    stats: [
      { value: "١٢", label: "وحدة" },
      { value: "مجاناً", label: "الرسوم" },
      { value: "٤٢", label: "مقعد" }
    ]
  },
  footer: {
    copy: "© ٢٠٢٦ Madinaty.AI · القاهرة الجديدة، مصر · بناه المجتمع.",
    links: ["سياسة الخصوصية", "حالة النظام", "شروط الاستخدام"]
  },
  vision: {
    overline: "الرؤية والمستقبل",
    title: "طبقة الذكاء فوق",
    subtitle: "مدينتي — ٨٠٠٠ فدان، ٧٠٠ ألف ساكن، ٢٣ حياً — تستحق دماغاً رقمياً. Madinaty.AI هي تلك الطبقة: تربط الناس والخدمات والبنية التحتية بذكاء تكيّفي.",
    genesisOverline: "البداية",
    genesisTitle: "من المجتمع وإلى المجتمع",
    genesisParagraphs: [
      "طوّرت مجموعة طلعت مصطفى (TMG) مدينتي بدءاً من ٢٠٠٦، بتصميم شركات أمريكية (HHCP وSWA وSASKI). اليوم تستضيف أكثر من ٧٠٠ ألف ساكن في ٢٣ مجمعاً مع بنية AMI الذكية.",
      "وُلدت Madinaty.AI من هذا الأساس — مبادرة مجتمعية من مؤسسين محليين وعائلات تؤمن بأن الذكاء الاصطناعي يجب أن يُحسّن الحياة اليومية: التنقل، التعليم، السلامة، والتجارة."
    ],
    pillarsOverline: "المرتكزات الاستراتيجية",
    pillarsTitle: "أسس التحول",
    roadmapOverline: "خارطة الطريق",
    roadmapTitle: "ثلاث مراحل للتفعيل الكامل",
    ctaTitle: "كن جزءاً من المستقبل",
    ctaText: "انضم للمبادرة وساهم في تشكيل المرحلة القادمة من الحياة الذكية في مدينتي — أذكى مدن مصر.",
    ctaButton: "انضم للمبادرة"
  }
};

const contentByLocale: Record<LocaleCode, SiteContent> = {
  en: contentEn,
  ar: contentAr
};

/**
 * Resolve localized content for page rendering.
 */
export function getSiteContent(locale: LocaleCode): SiteContent {
  return contentByLocale[locale];
}

/**
 * Returns shared map background image URL.
 */
export function getMapImageUrl(): string {
  return sharedMapImage;
}
