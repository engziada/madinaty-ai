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
    secondaryAction: "Current Offers",
    dashboardTitle: "Madinaty AI · Live Dashboard",
    dashboardStats: [
      { value: "4.2K", label: "Members" },
      { value: "42", label: "Services" },
      { value: "99.9%", label: "Uptime" }
    ]
  },
  about: {
    overline: "The Smart City Layer",
    title: "The AI Operating System for Modern Living",
    summary:
      "Madinaty isn't just an 8,000-acre city; it's a dynamic, living ecosystem. By seamlessly integrating the Madinaty AI layer with existing infrastructure, we are transforming everyday routines into hyper-personalized, ultra-efficient experiences for over 700,000 residents.",
    highlights: [
      "Local-First Models: Ensuring zero-latency operations completely offline",
      "Bank-Grade Privacy: Your living data stays strictly within the community bounds",
      "Open Sandbox: Built natively with seamless API integrations for smart homelabs"
    ],
    cards: [
      {
        icon: "🧠",
        title: "Resident-Centric AI",
        text: "Predictive algorithms that anticipate your needs, from smart transit to predictive facility booking."
      },
      {
        icon: "🔐",
        title: "Uncompromised Privacy",
        text: "An architecture built on zero-knowledge principles. The city learns, but your identity remains strictly yours."
      },
      {
        icon: "⚡",
        title: "Developer Sandbox",
        text: "Open API access enabling tech innovators and residents to build the next generation of urban applications."
      }
    ]
  },
  sections: {
    servicesOverline: "Our Platform",
    servicesTitle: "One AI Layer. Fourteen Services. One Community.",
    chatOverline: "Ask Madinaty AI",
    chatTitle: "Your Intelligent Community Companion",
    mapOverline: "Navigate Your Future",
    mapTitle: "Interactive Madinaty Map"
  },
  services: [
    // ── CORE PLATFORM ──
    {
      icon: "🤖",
      title: "Madinaty AI Bot",
      text: "Your always-on local guide. Ask for restaurant picks, best spots for an outing, or let the bot find you a flat, villa, or shop — plus live prices for any good or service inside Madinaty.",
      badge: "Live Now",
      badgeType: "live",
      size: "wide",
      category: "core",
    },
    {
      icon: "🎓",
      title: "AI Flash Courses for Kids",
      text: "Free, certified courses for ages 6–8, 9–12, and 13–15. Kids learn AI basics, prompt writing, safe tool usage, and digital critical thinking at Madinaty's Innovation Hub.",
      badge: "Free · Waitlist Open",
      badgeType: "live",
      category: "education",
    },
    {
      icon: "🏢",
      title: "Summer Business Training",
      text: "Bridging Madinaty youth (16–18) with local business owners for real hands-on internships and apprenticeships every summer inside the city.",
      badge: "Summer 2026",
      badgeType: "soon",
      category: "education",
    },
    {
      icon: "🏠",
      title: "Rental Portal",
      text: "A transparent, AI-powered marketplace connecting Madinaty tenants directly with owners — streamlining listings, viewings, contracts, and payments all in one place. Includes Short-Stay Hosting for verified guests and visiting families. [Disclaimer: This is a community platform. All transactions are between parties. Please ensure legal compliance and proper documentation.]",
      badge: "Beta Soon",
      badgeType: "soon",
      category: "core",
    },
    {
      icon: "👥",
      title: "Community Interest Club",
      text: "Find your people. Match with Madinaty residents who share your hobbies, sports, or passions and organize group outings, meetups, and local events together.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "community",
    },
    // ── COMMUNITY ──
    {
      icon: "🗳️",
      title: "Poll Board",
      text: "Vote on urgent community topics. When enough residents agree, your collective voice is automatically escalated as an official request to Madinaty's city managers.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "community",
    },
    {
      icon: "⏱️",
      title: "Skill Exchange Network",
      text: "Trade skills with neighbors using hours — not money. Offer tutoring, design, coding, or cooking; earn time credits you can spend on any skill you need. We manage the balance.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "community",
    },
    // ── RESIDENTIAL LIFE ──
    {
      icon: "🔧",
      title: "Trusted Services Directory",
      text: "A curated, resident-rated directory of verified plumbers, electricians, cleaners, and handymen who operate inside Madinaty — no more random Facebook recommendations. [Disclaimer: We facilitate connections only. Verify credentials and establish proper service agreements independently.]",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "lifestyle",
    },
    // ── EDUCATION & LIFESTYLE ──
    {
      icon: "📖",
      title: "Madinaty Tutoring Board",
      text: "Connect students with qualified resident-tutors for affordable, in-community private lessons across all subjects and grade levels.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "education",
    },
    {
      icon: "🏃",
      title: "Activity Finder",
      text: "Find and join running groups, yoga sessions, football matches, and more — organized by residents in Madinaty's parks and sports facilities.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "lifestyle",
    },
    // ── LOCAL ECONOMY ──
    {
      icon: "🛍️",
      title: "Madinaty Marketplace",
      text: "A hyper-local buy, sell, and swap platform exclusively for Madinaty residents — fast, trusted, and no platform fees for community members.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🍽️",
      title: "Ghost Kitchen Incubator",
      text: "Turn your home kitchen into a micro-business. Sell verified, home-cooked meals to your neighbors through a legally structured, community-first food platform. [Disclaimer: Compliance with food safety regulations and local business licensing is the seller's responsibility.]",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🚀",
      title: "Local Business Booster",
      text: "Give any Madinaty business an online presence in under 48 hours — starting with a free landing page, then a full e-commerce store, CRM, and ERP system as they grow.",
      badge: "Coming Soon",
      badgeType: "soon",
      size: "wide",
      category: "economy",
    },
  ],
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
    overline: "Free Kids AI Safety Session",
    title: "AI Chat for Kids—",
    titleHighlight: "Safe, Smart, Fun",
    subtitle: "One-day session · 2 hours · Ages 7–10",
    description:
      "A focused one-day session introducing kids to AI chat tools and how to use them safely. Each session runs for 2 hours with only 10 kids per group (without parents) to ensure attention and quality learning.",
    promoLabel: "Completely Free · First 50 Kids",
    promoTitle: "Date, time, and place are coming soon (TBD).",
    promoDescription:
      "Instructors are a group of highly educated and professional mentors from within the Madinaty community. Priority is for Madinaty residents, and registration is required.",
    labTitle: "Small Cohort Format",
    labSubtitle: "10 kids per session · no parents in class",
    cta: "Join the Waitlist",
    stats: [
      { value: "2H", label: "Session Length" },
      { value: "10", label: "Kids / Session" },
      { value: "50", label: "Free Seats" }
    ],
    safetyBadges: [
      { icon: "�️", label: "Safe AI Usage" },
      { icon: "🎓", label: "Expert Community Instructors" },
      { icon: "👦", label: "Ages 7–10" },
      { icon: "�", label: "Madinaty Residents Priority" }
    ]
  },
  footer: {
    copy: "© 2026 Madinaty AI · New Cairo, Egypt · Built by the Community.",
    links: ["Privacy Policy", "System Status", "Terms of Use"],
    socialLinks: [
      { icon: "facebook", label: "Facebook", url: "#" },
      { icon: "instagram", label: "Instagram", url: "#" },
      { icon: "twitter", label: "X (Twitter)", url: "#" },
      { icon: "youtube", label: "YouTube", url: "#" }
    ],
    whatsappNumber: "+20 100 000 0000",
    adminEmail: "admin@madinatyai.com"
  },
  vision: {
    overline: "Vision & Future",
    title: "The Intelligence Layer Over",
    subtitle: "Madinaty — 8,000 acres, 700,000 residents, 23 districts — deserves a city-brain. Madinaty AI is that layer: connecting people, services, and infrastructure through adaptive intelligence.",
    genesisOverline: "The Genesis",
    genesisTitle: "Built by the Community, for the Community",
    genesisParagraphs: [
      "Madinaty was developed by Talaat Moustafa Group (TMG) starting in 2006, designed by American firms HHCP, SWA, and SASKI. Today it hosts 700,000+ residents across 23 sub-compounds with AMI smart metering and city-wide bus connectivity.",
      "Madinaty AI was born from this foundation — a community initiative by local founders, builders, and families who believe AI should enhance real daily life: commutes, education, safety, and local commerce."
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
    text: "مدينتي — أكبر مدينة متكاملة في مصر بأكثر من ٧٠٠ ألف ساكن في ٢٣ حياً — تحصل على بُعدها الذكي. بناها المجتمع، وللمجتمع.",
    primaryAction: "مدينتي بوت",
    secondaryAction: "أحدث العروض",
    dashboardTitle: "مدينتي AI · لوحة التحكم المباشرة",
    dashboardStats: [
      { value: "٤٫٢ ألف", label: "عضو" },
      { value: "٤٢", label: "خدمة ذكية" },
      { value: "٩٩٫٩٪", label: "جاهزية" }
    ]
  },
  about: {
    overline: "البُعد الذكي للمدينة",
    title: "نظام التشغيل الذكي لحياة عصرية",
    summary:
      "مدينتي ليست مجرد مدينة تمتد على ٨٠٠٠ فدان، بل هي بيئة حية تتنفس. من خلال دمج بُعد Madinaty AI مع البنية التحتية، نحول الروتين اليومي إلى تجارب فائقة الذكاء ومخصصة لأكثر من ٧٠٠ ألف ساكن.",
    highlights: [
      "نماذج محلية بالكامل: تضمن استجابة فورية دون تأخير أو حاجة للإنترنت",
      "خصوصية مطلقة: بياناتك الحياتية لا تغادر يوماً حدود المجتمع الموثوق",
      "بيئة مفتوحة: واجهات برمجية تدعم الربط السلس مع مختبرات المنازل الذكية",
    ],
    cards: [
      {
        icon: "🧠",
        title: "ذكاء محوره الساكن",
        text: "خوارزميات تطورية تتوقع احتياجاتك أينما كنت، من تتبع الحافلات وحتى الحجز الذكي للمرافق.",
      },
      {
        icon: "🔐",
        title: "خصوصية لا مساومة فيها",
        text: "نظام مبني على مبادئ المعرفة الصفرية. المدينة تتعلم وتتطور، وهويتك تبقى محمية بالكامل.",
      },
      {
        icon: "⚡",
        title: "حاضنة للمبتكرين",
        text: "واجهات برمجية مفتوحة تتيح للمبدعين والمطورين بناء الجيل القادم من تقنيات المدن.",
      },
    ],
  },
  sections: {
    servicesOverline: "منصتنا",
    servicesTitle: "بُعد ذكاء واحد. أربعة عشر خدمة تُغيّر الحياة.",
    chatOverline: "اسأل Madinaty AI",
    chatTitle: "مساعدك الذكي للمجتمع",
    mapOverline: "تنقّل نحو المستقبل",
    mapTitle: "خريطة مدينتي التفاعلية"
  },
  services: [
    // ── الخدمات الأساسية ──
    {
      icon: "🤖",
      title: "مساعد مدينتي الذكي",
      text: "دليلك المحلي المتاح دائماً. اسأله عن أفضل المطاعم أو أماكن الترفيه، أو اطلب منه إيجاد شقة أو فيلا أو محل — مع أسعار حية لأي منتج أو خدمة داخل مدينتي.",
      badge: "متاح الآن",
      badgeType: "live",
      size: "wide",
      category: "core",
    },
    {
      icon: "🎓",
      title: "كورسات ذكاء اصطناعي للأطفال",
      text: "كورسات مجانية معتمدة للأعمار ٦–٨ و٩–١٢ و١٣–١٥ سنة. أساسيات الذكاء الاصطناعي، كتابة البرومبت، الأدوات الآمنة، والتفكير النقدي الرقمي — في مركز الابتكار بمدينتي.",
      badge: "مجاناً · قائمة الانتظار مفتوحة",
      badgeType: "live",
      category: "education",
    },
    {
      icon: "🏢",
      title: "تدريب صيفي للشباب",
      text: "ربط شباب مدينتي (١٦–١٨ سنة) بأصحاب الأعمال المحليين لتدريب عملي حقيقي داخل المدينة كل صيف.",
      badge: "صيف ٢٠٢٦",
      badgeType: "soon",
      category: "education",
    },
    {
      icon: "🏠",
      title: "بوابة الإيجار الذكية",
      text: "سوق شفاف مدعوم بالذكاء الاصطناعي يربط المستأجرين بالملاك مباشرةً — تسهيل الإعلانات والمعاينات والعقود والمدفوعات في مكان واحد. تشمل إيجار الإقامة القصيرة للضيوف والعائلات. [تنبيه: هذه منصة مجتمعية. جميع المعاملات بين الأطراف. يرجى ضمان الامتثال القانوني والتوثيق السليم.]",
      badge: "قريباً",
      badgeType: "soon",
      category: "core",
    },
    {
      icon: "👥",
      title: "نادي الاهتمامات المجتمعي",
      text: "ابحث عن سكان يشاركونك اهتماماتك وهواياتك — ورتّب معهم نزهات جماعية وفعاليات ولقاءات محلية داخل مدينتي.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "community",
    },
    // ── المجتمع ──
    {
      icon: "🗳️",
      title: "لوحة التصويت المجتمعي",
      text: "صوّت على أهم القضايا المجتمعية. عند تجاوز نسبة التصويت المتفق عليها مع إدارة المدينة، يُحوَّل تلقائياً إلى طلب رسمي معتمد.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "community",
    },
    {
      icon: "⏱️",
      title: "شبكة تبادل المهارات",
      text: "تبادل المهارات مع الجيران بالساعات لا بالمال. قدّم ما تُجيده واكسب رصيداً زمنياً تصرفه على ما تحتاجه — ونحن ندير التوازن.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "community",
    },
    // ── الحياة السكنية ──
    {
      icon: "🔧",
      title: "دليل الخدمات الموثوقة",
      text: "دليل منتقى ومُقيَّم من السكان لسباكين وكهربائيين وعمال نظافة وصيانة يعملون داخل مدينتي — لا مزيد من التوصيات العشوائية. [تنبيه: نسهل التواصل فقط. تحقق من الأهلية وحدد اتفاقيات الخدمة بشكل مستقل.]",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "lifestyle",
    },
    // ── التعليم والنمط الحياتي ──
    {
      icon: "📖",
      title: "لوحة الدروس الخصوصية",
      text: "ربط الطلاب بمعلمين من سكان مدينتي للدروس الخصوصية بأسعار مناسبة في جميع المواد والمراحل الدراسية.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "education",
    },
    {
      icon: "🏃",
      title: "مكتشف الأنشطة",
      text: "انضم لمجموعات الجري واليوغا وكرة القدم وغيرها — مُنظَّمة من السكان في حدائق مدينتي ومرافق الرياضة.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "lifestyle",
    },
    // ── الاقتصاد المحلي ──
    {
      icon: "🛍️",
      title: "سوق مدينتي",
      text: "منصة بيع وشراء ومقايضة حصرية لسكان مدينتي — سريعة وموثوقة وبدون رسوم للأعضاء.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🍽️",
      title: "حاضنة المطابخ المنزلية",
      text: "حوّل مطبخك إلى مشروع صغير. بِع وجبات منزلية موثَّقة لجيرانك من خلال منصة طعام مجتمعية منظَّمة قانونياً. [تنبيه: الامتثال لأنظمة سلامة الغذاء والتراخيص التجارية المحلية مسؤولية البائع.]",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🚀",
      title: "معزز الأعمال المحلية",
      text: "أعطِ أي نشاط تجاري في مدينتي حضوراً رقمياً في أقل من ٤٨ ساعة — يبدأ بصفحة هبوط مجانية ويتطور إلى متجر إلكتروني متكامل مع CRM وERP.",
      badge: "قادم قريباً",
      badgeType: "soon",
      size: "wide",
      category: "economy",
    },
  ],
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
    overline: "جلسة مجانية للأطفال عن أمان الذكاء الاصطناعي",
    title: "شات الذكاء الاصطناعي للأطفال—",
    titleHighlight: "آمن وذكي وممتع",
    subtitle: "جلسة يوم واحد · ساعتان · أعمار ٧–١٠",
    description:
      "جلسة تعريفية مركزة ليوم واحد لتعليم الأطفال أدوات الشات بالذكاء الاصطناعي وكيفية استخدامها بأمان. مدة كل جلسة ساعتان وبحد أقصى ١٠ أطفال فقط بدون حضور الأهل داخل الجلسة لضمان جودة التفاعل.",
    promoLabel: "مجاني بالكامل · لأول ٥٠ طفل",
    promoTitle: "التاريخ والوقت والمكان سيُحددون قريباً (TBD).",
    promoDescription:
      "المدربون مجموعة من أشخاص محترفين وعاليي التعليم من داخل مجتمع مدينتي. الأولوية لسكان مدينتي، والتسجيل المسبق إلزامي.",
    labTitle: "نظام مجموعات صغيرة",
    labSubtitle: "١٠ أطفال لكل جلسة · بدون أولياء أمور",
    cta: "انضم إلى قائمة الانتظار",
    stats: [
      { value: "ساعتان", label: "مدة الجلسة" },
      { value: "١٠", label: "طفل / جلسة" },
      { value: "٥٠", label: "مقاعد مجانية" }
    ],
    safetyBadges: [
      { icon: "�️", label: "استخدام آمن للذكاء الاصطناعي" },
      { icon: "🎓", label: "مدربون محترفون من المجتمع" },
      { icon: "👦", label: "للأعمار ٧–١٠" },
      { icon: "�", label: "أولوية لسكان مدينتي" }
    ]
  },
  footer: {
    copy: "© ٢٠٢٦ Madinaty AI · القاهرة الجديدة، مصر · بناه المجتمع.",
    links: ["سياسة الخصوصية", "حالة النظام", "شروط الاستخدام"],
    socialLinks: [
      { icon: "facebook", label: "فيسبوك", url: "#" },
      { icon: "instagram", label: "إنستغرام", url: "#" },
      { icon: "twitter", label: "إكس (تويتر)", url: "#" },
      { icon: "youtube", label: "يوتيوب", url: "#" }
    ],
    whatsappNumber: "+20 100 000 0000",
    adminEmail: "admin@madinatyai.com"
  },
  vision: {
    overline: "الرؤية والمستقبل",
    title: "بُعد الذكاء فوق",
    subtitle: "مدينتي — ٨٠٠٠ فدان، ٧٠٠ ألف ساكن، ٢٣ حياً — تستحق دماغاً رقمياً. Madinaty AI هي ذلك البُعد: يربط الناس والخدمات والبنية التحتية بذكاء تكيّفي.",
    genesisOverline: "البداية",
    genesisTitle: "من المجتمع وإلى المجتمع",
    genesisParagraphs: [
      "طوّرت مجموعة طلعت مصطفى (TMG) مدينتي بدءاً من ٢٠٠٦، بتصميم شركات أمريكية (HHCP وSWA وSASKI). اليوم تستضيف أكثر من ٧٠٠ ألف ساكن في ٢٣ مجمعاً مع بنية AMI الذكية.",
      "وُلدت Madinaty AI من هذا الأساس — مبادرة مجتمعية من مؤسسين محليين وعائلات تؤمن بأن الذكاء الاصطناعي يجب أن يُحسّن الحياة اليومية: التنقل، التعليم، السلامة، والتجارة."
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

