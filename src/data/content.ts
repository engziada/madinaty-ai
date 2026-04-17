import type { LocaleCode, SiteContent } from "@/types/site";

/**
 * Shared stock imagery — curated from Unsplash (free license). Keeping these
 * as named exports so any page can reuse them, and swapping URLs here ripples
 * through the whole site without component edits.
 */
export const heroImage =
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80"; // bright sunrise skyline

export const genesisImages = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80", // kids learning / family
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80"  // hands on tech / circuit
];

/** Sunlit community / smart-city imagery, reusable across sections. */
export const sectionImages = {
  about:    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80", // modern campus
  services: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80", // smart transit
  chat:     "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1400&q=80", // kid + laptop
  map:      "https://images.unsplash.com/photo-1529670760083-b0d6a8d6d36c?w=1400&q=80", // aerial city
  event:    "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=1400&q=80"  // kids workshop
};

const contentEn: SiteContent = {
  nav: {
    platform: "Madinaty Bot",
    services: "Services",
    map: "Map",
    roadmap: "Roadmap",
    cta: "Launch Portal",
    localeSwitch: "ع"
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
    loadingLabel: "Thinking...",
    fallback: "Madinaty Assistant is having trouble. Try again in a moment.",
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
        dotClassName: "dot-1",
        latitude: 30.0402,
        longitude: 31.7018,
        category: "Innovation & Learning",
        status: "Live Workshops Today",
        highlight: "Next AI for Kids session: Saturday at 10:00 AM"
      },
      {
        id: "logistics",
        title: "Central Bus Hub",
        details: "Fleet: 100% Charged · 12 Shuttles Active",
        dotClassName: "dot-2",
        latitude: 30.0468,
        longitude: 31.6578,
        category: "Mobility",
        status: "Zero-delay departures",
        highlight: "New shuttle lane open to Districts C & D"
      },
      {
        id: "wellness",
        title: "Health & Wellness Center",
        details: "Clinics: 6 · AI triage online",
        dotClassName: "dot-3",
        latitude: 30.0561,
        longitude: 31.6472,
        category: "Wellness",
        status: "Telemedicine active",
        highlight: "Family check-up appointments re-opening"
      },
      {
        id: "solar",
        title: "Solar R&D Campus",
        details: "Microgrid: 98% autonomy · 2.6 MW",
        dotClassName: "dot-4",
        latitude: 30.0399,
        longitude: 31.6725,
        category: "Energy",
        status: "Testing neighborhood-scale storage",
        highlight: "New battery swap station live"
      },
      {
        id: "vineyard",
        title: "Community Green Spine",
        details: "Parks: 14 · Citizen events nightly",
        dotClassName: "dot-5",
        latitude: 30.0339,
        longitude: 31.6595,
        category: "Public Realm",
        status: "Ambient music program",
        highlight: "Sunset cycling meet-up at 6:00 PM"
      },
      {
        id: "gateway",
        title: "North Gate Plaza",
        details: "Security: AI watchtower · Guest entry",
        dotClassName: "dot-6",
        latitude: 30.0586,
        longitude: 31.6773,
        category: "Entry",
        status: "Visitor screening 30s",
        highlight: "Drone deliveries arrive through Gate 1"
      }
    ]
  },
  event: {
    overline: "Free Family Workshop",
    title: "Teach Kids to Use AI—",
    titleHighlight: "Safely & Joyfully",
    subtitle: "Parents Welcome · Ages 8–14",
    description:
      "A 100% free, parent-approved workshop where children learn what AI is, how to talk to it responsibly, and how to spot when it's wrong. No personal data. No black boxes. Just curious kids building safely under certified mentors at Madinaty's Innovation Hub.",
    promoLabel: "Limited · Fully Sponsored",
    promoTitle: "First 42 kids learn free—parents join any session.",
    promoDescription:
      "Sponsored by the Madinaty community for the launch edition. No credit card. No strings. Priority for active residents from any sub-compound across the 23 districts.",
    labTitle: "Parent Dashboard Included",
    labSubtitle: "See everything your child learns · Live",
    cta: "Reserve My Child's Seat",
    stats: [
      { value: "12", label: "Safe Modules" },
      { value: "Free", label: "Zero Cost" },
      { value: "42", label: "Seats Left" }
    ],
    safetyBadges: [
      { icon: "👩‍💼", label: "Parent Approved" },
      { icon: "🔒", label: "No Data Collected" },
      { icon: "🎓", label: "Certified Mentors" },
      { icon: "👫", label: "Small Groups" }
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
    localeSwitch: "E"
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
    loadingLabel: "جارٍ المعالجة...",
    fallback: "مساعد مدينتي غير متصل حالياً. أعد المحاولة لاحقاً.",
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
        dotClassName: "dot-1",
        latitude: 30.0402,
        longitude: 31.7018,
        category: "ابتكار وتعليم",
        status: "ورش حية اليوم",
        highlight: "ورشة الأطفال القادمة: السبت ١٠ صباحاً"
      },
      {
        id: "logistics",
        title: "محطة الحافلات المركزية",
        details: "الأسطول: مشحون ١٠٠٪ · ١٢ حافلة نشطة",
        dotClassName: "dot-2",
        latitude: 30.0468,
        longitude: 31.6578,
        category: "التنقل",
        status: "مغادرات بدون تأخير",
        highlight: "حارة خاصة إلى الحيّين C وD"
      },
      {
        id: "wellness",
        title: "مركز الصحة والرفاهية",
        details: "العيادات: ٦ · التشخيص بالذكاء الاصطناعي",
        dotClassName: "dot-3",
        latitude: 30.0561,
        longitude: 31.6472,
        category: "الرفاهية",
        status: "الطب عن بعد متاح",
        highlight: "فتح حجوزات الفحص العائلي"
      },
      {
        id: "solar",
        title: "حرم أبحاث الطاقة الشمسية",
        details: "الشبكة: ٩٨٪ ذاتية · ٢٫٦ ميجاوات",
        dotClassName: "dot-4",
        latitude: 30.0399,
        longitude: 31.6725,
        category: "الطاقة",
        status: "اختبار تخزين حيّ",
        highlight: "محطة تبديل بطاريات جديدة"
      },
      {
        id: "vineyard",
        title: "المسار الأخضر المجتمعي",
        details: "الحدائق: ١٤ · فعاليات ليلية",
        dotClassName: "dot-5",
        latitude: 30.0339,
        longitude: 31.6595,
        category: "الفضاء العام",
        status: "برنامج موسيقى محيطي",
        highlight: "تجمع ركوب الدراجات عند ٦ مساءً"
      },
      {
        id: "gateway",
        title: "ساحة البوابة الشمالية",
        details: "الأمن: برج مراقبة ذكاء اصطناعي · دخول الزوار",
        dotClassName: "dot-6",
        latitude: 30.0586,
        longitude: 31.6773,
        category: "الدخول",
        status: "فرز الزوار ٣٠ ثانية",
        highlight: "وصول الطرود عبر البوابة ١"
      }
    ]
  },
  event: {
    overline: "ورشة عائلية مجانية",
    title: "علّم طفلك الذكاء الاصطناعي—",
    titleHighlight: "بأمان ومتعة",
    subtitle: "بحضور الأهل · أعمار ٨–١٤",
    description:
      "ورشة مجانية مائة بالمائة، معتمدة من الأهالي، يتعلّم فيها الأطفال ما هو الذكاء الاصطناعي، وكيف يتحدثون معه بمسؤولية، وكيف يكتشفون أخطاءه. بلا جمع بيانات، وبلا صناديق سوداء—فقط تعلّم آمن تحت إشراف مدربين معتمدين في مركز الابتكار بمدينتي.",
    promoLabel: "محدود · برعاية كاملة",
    promoTitle: "أول ٤٢ طفل يتعلّم مجاناً—والأهل مدعوّون.",
    promoDescription:
      "برعاية كاملة من مجتمع مدينتي للنسخة الأولى. بلا بطاقة ائتمان وبلا التزامات. الأولوية لسكان الأحياء النشطين من الـ٢٣ حياً.",
    labTitle: "لوحة متابعة للأهل",
    labSubtitle: "تابع كل ما يتعلمه طفلك · لحظيّاً",
    cta: "احجز مقعد طفلي",
    stats: [
      { value: "١٢", label: "وحدة آمنة" },
      { value: "مجاني", label: "بلا رسوم" },
      { value: "٤٢", label: "مقعد متاح" }
    ],
    safetyBadges: [
      { icon: "👩‍💼", label: "معتمد من الأهل" },
      { icon: "🔒", label: "بلا جمع بيانات" },
      { icon: "🎓", label: "مدربون معتمدون" },
      { icon: "👫", label: "مجموعات صغيرة" }
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

