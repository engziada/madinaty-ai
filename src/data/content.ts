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
  about: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80", // modern campus
  services: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80", // smart transit
  chat: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1400&q=80", // kid + laptop
  map: "https://images.unsplash.com/photo-1529670760083-b0d6a8d6d36c?w=1400&q=80", // aerial city
  event: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=1400&q=80"  // kids workshop
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
      { value: "7", label: "Services" },
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
    servicesTitle: "One AI Layer. Seven Services. One Community.",
    chatOverline: "Ask Madinaty AI",
    chatTitle: "Your Intelligent Community Companion",
    mapOverline: "Navigate Your Future",
    mapTitle: "Interactive Madinaty Map"
  },
  services: [
    // ── CORE PLATFORM ──
    {
      icon: "🤖",
      title: "Astro",
      text: "Your always-on local guide. Ask for restaurant picks, best spots for an outing, or let the bot find you a flat, villa, or shop — plus live prices for any good or service inside Madinaty.",
      badge: "Live Now",
      badgeType: "live",
      size: "wide",
      category: "core",
    },
    {
      icon: "🎓",
      title: "Innovation Hub",
      text: "Certified courses for ages 6–8, 9–12, and 13–15. Let's learn AI basics, prompt writing, safe tool usage, digital critical thinking, programming and more at Madinaty's Innovation Hub.",
      badge: "449.99 EGP · World Cup Offer 🏆",
      badgeType: "live",
      category: "education",
    },
    {
      icon: "🏢",
      title: "SkillUp Shabab",
      text: "Bridging Madinaty youth (16–18) with local business owners for real hands-on internships and apprenticeships every summer inside the city.",
      badge: "Summer 2026",
      badgeType: "soon",
      category: "education",
    },
    {
      icon: "🏠",
      title: "Sakn Madinaty",
      text: "A transparent, AI-powered marketplace connecting Madinaty tenants directly with owners — streamlining listings, viewings, contracts, and payments all in one place. Includes Short-Stay Hosting for verified guests and visiting families. [Disclaimer: This is a community platform. All transactions are between parties. Please ensure legal compliance and proper documentation.]",
      badge: "Beta Soon",
      badgeType: "soon",
      category: "core",
      hidden: false,
    },
    {
      icon: "👥",
      title: "ConnectX",
      text: "Find your people. Match with Madinaty residents who share your hobbies, sports, or passions and organize group outings, meetups, and local events together.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "community",
      hidden: true,
    },
    // ── COMMUNITY ──
    {
      icon: "🗳️",
      title: "Raayak Eh",
      text: "Vote on urgent community topics. When enough residents agree, your collective voice is automatically escalated as an official request to Madinaty's city managers.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "community",
      hidden: true,
    },
    {
      icon: "⏱️",
      title: "Time Bank",
      text: "Trade skills with neighbors using hours — not money. Offer tutoring, design, coding, or cooking; earn time credits you can spend on any skill you need. We manage the balance.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "community",
    },
    // ── RESIDENTIAL LIFE ──
    {
      icon: "🔧",
      title: "Craft Zone",
      text: "A curated, resident-rated directory of verified plumbers, electricians, cleaners, and handymen who operate inside Madinaty — no more random Facebook recommendations. [Disclaimer: We facilitate connections only. Verify credentials and establish proper service agreements independently.]",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "lifestyle",
      hidden: true,
    },
    // ── EDUCATION & LIFESTYLE ──
    {
      icon: "📖",
      title: "Nezakker",
      text: "Connect students with qualified resident-tutors for affordable, in-community private lessons across all subjects and grade levels.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "education",
      hidden: false,
    },
    {
      icon: "🏃",
      title: "Activity Finder",
      text: "Find and join running groups, yoga sessions, football matches, and more — organized by residents in Madinaty's parks and sports facilities.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "lifestyle",
      hidden: true,
    },
    // ── LOCAL ECONOMY ──
    {
      icon: "🛍️",
      title: "ElSouk",
      text: "A hyper-local buy, sell, and swap platform exclusively for Madinaty residents — fast, trusted, and no platform fees for community members.",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🍽️",
      title: "Bas Douk",
      text: "Turn your home kitchen into a micro-business. Sell verified, home-cooked meals to your neighbors through a legally structured, community-first food platform. [Disclaimer: Compliance with food safety regulations and local business licensing is the seller's responsibility.]",
      badge: "Coming Soon",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🚀",
      title: "Business Booster",
      text: "Give any Madinaty business an online presence in under 48 hours — starting with a free landing page, then a full e-commerce store, CRM, and ERP system as they grow.",
      badge: "Coming Soon",
      badgeType: "soon",
      size: "wide",
      category: "core",
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
      { role: "ai", content: "At Triple A Education Center (East Hub - 2nd Floor). We are now booking for the next session on Saturday, June 20 at 12:00 PM with our special 20% World Cup discount (449.99 EGP). Want me to reserve a slot?" }
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
        highlight: "Next AI for Kids session: Sat 20 June at 12:00 PM — World Cup Offer 🏆"
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
    overline: "AI Labs in Madinaty",
    title: "AI for Kids Awareness Session — ",
    titleHighlight: "Safe, Smart, Fun",
    subtitle: "Saturday, June 20, 2026 · 12:00 PM – 2:00 PM · Ages 8–12 — 3rd Wave Now Open!",
    description:
      "The opening discount has ended, but for our neighbors and residents, we're offering a 20% ongoing discount (449.99 EGP) valid until the end of June and as long as Egypt is playing in the World Cup! 🇪🇬⚽ Each session lasts 2 hours, with a maximum of 10 children per room.",
    descriptionExtra:
      "The course is supervised by:\nEngineering & Computer Science professors from Cairo University\n\nPrepared & delivered by:\nSoftware engineers & IT professionals\nExperienced educators ensuring every child receives information in a safe and engaging way\n\n🎮 This isn't just a lecture…\nIt's a hands-on experience where kids build and experiment themselves\n\n💡 Why this course matters:\n✔️ Develops logical thinking and creativity\n✔️ Introduces children to the foundations of the future (AI & Machine Learning)\n✔️ Makes learning fun and easy",
    promoLabel: "World Cup Offer: 449.99 EGP/kid (20% off) 🏆⚽",
    promoTitle: "Triple A Education Center - 2nd Floor - East Hub",
    promoLocationUrl: "https://share.google/0DL8Xtn3VX5N4RLba",
    promoDescription:
      "Available for everyone! Pre-registration is mandatory. Fee is 449.99 EGP per child (20% discount) valid through June and the World Cup period. ⚽🏆",
    labTitle: "Small Cohort Format",
    labSubtitle: "10 kids per session · no parents in class",
    cta: "Register Now",
    stats: [
      { value: "2H", label: "Session Length" },
      { value: "10", label: "Kids / Session" },
      { value: "449.99 EGP", label: "World Cup Offer 🏆" }
    ],
    safetyBadges: [
      { icon: "🛡️", label: "Safe AI Usage" },
      { icon: "🎓", label: "Expert Community Instructors" },
      { icon: "👦", label: "Ages 8–12" },
      { icon: "🏆", label: "449.99 EGP/kid (World Cup Discount) ⚽" },
      { icon: "📞", label: "For inquiries: +201026655008", url: "https://wa.me/201026655008?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20kids%20AI%20session" }
    ],
    galleryTitle: "Photo Album with the Little Geniuses",
    gallerySubtitle: "Snapshots from our hands-on AI learning workshop on June 6. Real kids, real coding, real fun!",
    galleryViewAll: "View All Photos",
    galleryLoading: "Loading session gallery...",
    galleryEmpty: "No photos uploaded for this session yet."
  },
  footer: {
    copy: "© 2026 ZSolutions · New Cairo, Egypt · Built by the Community.",
    links: ["Privacy Policy", "System Status", "Terms of Use"],
    socialLinks: [
      { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61587705874177" },
      { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/invites/contact/?igsh=1j16tus21g2ro&utm_content=d24zbtm" },
      { icon: "twitter", label: "X (Twitter)", url: "https://x.com/MadinatyAI" },
      { icon: "youtube", label: "YouTube", url: "https://www.youtube.com/" },
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/112226033/" }
    ],
    whatsappNumber: "+201026655008",
    adminEmail: "engziada@gmail.com"
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
      { value: "٧", label: "خدمة ذكية" },
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
    servicesTitle: "لأن راحتك تستحق حلولا أذكى.",
    chatOverline: "اسأل Madinaty AI",
    chatTitle: "مساعدك الذكي للمجتمع",
    mapOverline: "تنقّل نحو المستقبل",
    mapTitle: "خريطة مدينتي التفاعلية"
  },
  services: [
    // ── الخدمات الأساسية ──
    {
      icon: "🤖",
      title: "أسترو..مساعد مدينتي الذكي",
      text: "دليلك المحلي المتاح دائماً. اسأله عن أفضل المطاعم أو أماكن الترفيه، أو اطلب منه إيجاد شقة أو فيلا أو محل — مع أسعار حية لأي منتج أو خدمة داخل مدينتي.",
      badge: "متاح الآن",
      badgeType: "live",
      size: "wide",
      category: "core",
    },
    {
      icon: "🎓",
      title: "مركز الإبتكار",
      text: "كورسات معتمدة للأعمار ٦–٨ و٩–١٢ و١٣–١٥ سنة بأسعار رمزية. أساسيات الذكاء الاصطناعي، كتابة البرومبت، الأدوات الآمنة، والتفكير النقدي الرقمي — في مركز الابتكار بمدينتي.",
      badge: "٤٤٩٫٩٩ ج.م · خصم المونديال 🏆",
      badgeType: "live",
      category: "education",
    },
    {
      icon: "🏢",
      title: "تدريب صيفي",
      text: "ربط شباب مدينتي (١٦–١٨ سنة) بأصحاب الأعمال المحليين لتدريب عملي حقيقي داخل المدينة كل صيف.",
      badge: "صيف ٢٠٢٦",
      badgeType: "soon",
      category: "education",
    },
    {
      icon: "🏠",
      title: "سكن",
      text: "سوق شفاف مدعوم بالذكاء الاصطناعي يربط المستأجرين بالملاك مباشرةً — تسهيل الإعلانات والمعاينات والعقود والمدفوعات في مكان واحد. تشمل إيجار الإقامة القصيرة للضيوف والعائلات. [تنبيه: هذه منصة مجتمعية. جميع المعاملات بين الأطراف. يرجى ضمان الامتثال القانوني والتوثيق السليم.]",
      badge: "قريباً",
      badgeType: "soon",
      category: "core",
      hidden: false,
    },
    {
      icon: "👥",
      title: "نادي الاهتمامات",
      text: "ابحث عن سكان يشاركونك اهتماماتك وهواياتك — ورتّب معهم نزهات جماعية وفعاليات ولقاءات محلية داخل مدينتي.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "community",
      hidden: true,
    },
    // ── المجتمع ──
    {
      icon: "🗳️",
      title: "رأيك إيه",
      text: "صوّت على أهم القضايا المجتمعية. عند تجاوز نسبة التصويت المتفق عليها مع إدارة المدينة، يُحوَّل تلقائياً إلى طلب رسمي معتمد.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "community",
      hidden: true,
    },
    {
      icon: "⏱️",
      title: "بنك الوقت",
      text: "تبادل المهارات مع الجيران بالساعات لا بالمال. قدّم ما تُجيده واكسب رصيداً زمنياً تصرفه على ما تحتاجه — ونحن ندير التوازن.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "community",
    },
    // ── الحياة السكنية ──
    {
      icon: "🔧",
      title: "صنايعي",
      text: "دليل منتقى ومُقيَّم من السكان لسباكين وكهربائيين وعمال نظافة وصيانة يعملون داخل مدينتي — لا مزيد من التوصيات العشوائية. [تنبيه: نسهل التواصل فقط. تحقق من الأهلية وحدد اتفاقيات الخدمة بشكل مستقل.]",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "lifestyle",
      hidden: true,
    },
    // ── التعليم والنمط الحياتي ──
    {
      icon: "📖",
      title: "يلا نذاكر",
      text: "ربط الطلاب بمعلمين من سكان مدينتي للدروس الخصوصية بأسعار مناسبة في جميع المواد والمراحل الدراسية.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "education",
      hidden: false,
    },
    {
      icon: "🏃",
      title: "مكتشف الأنشطة",
      text: "انضم لمجموعات الجري واليوغا وكرة القدم وغيرها — مُنظَّمة من السكان في حدائق مدينتي ومرافق الرياضة.",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "lifestyle",
      hidden: true,
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
      title: "بس دوق",
      text: "حوّل مطبخك إلى مشروع صغير. بِع وجبات منزلية موثَّقة لجيرانك من خلال منصة طعام مجتمعية منظَّمة قانونياً. [تنبيه: الامتثال لأنظمة سلامة الغذاء والتراخيص التجارية المحلية مسؤولية البائع.]",
      badge: "قادم قريباً",
      badgeType: "soon",
      category: "economy",
    },
    {
      icon: "🚀",
      title: "معزز الأعمال",
      text: "أعطِ أي نشاط تجاري في مدينتي حضوراً رقمياً في أقل من ٤٨ ساعة — يبدأ بصفحة هبوط مجانية ويتطور إلى متجر إلكتروني متكامل مع CRM وERP.",
      badge: "قادم قريباً",
      badgeType: "soon",
      size: "wide",
      category: "core",
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
      { role: "ai", content: "في مركز Triple A إيست هب - الدور الثاني. نفتح الآن باب الحجز للجلسة القادمة يوم السبت ٢٠ يونيو الساعة ١٢ ظهراً مع خصم المونديال الخاص ٢٠٪ (٤٤٩٫٩٩ ج.م). هل تريد حجز مقعد؟" }
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
        highlight: "ورشة الأطفال القادمة: السبت ٢٠ يونيو الساعة ١٢ ظهراً — عرض المونديال 🏆"
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
    overline: "جلسة توعوية للأطفال عن الذكاء الاصطناعي و كيفية إستخدامه بشكل آمن",
    title: "شات الذكاء الاصطناعي للأطفال—",
    titleHighlight: "آمن وذكي وممتع",
    subtitle: "السبت ٢٠ يونيو ٢٠٢٦ · ١٢:٠٠ م – ٢:٠٠ م · أعمار ٨–١٢ — الموجة الثالثة متاحة الآن!",
    description:
      "تخفيض الافتتاح للاسف خلص.. بس عشان حبايبنا وجيراننا اللي بره مدينتي وأهلنا في مدينتي، قررنا نعمل تخفيض ٢٠٪ مستمر لآخر يونيو وطول ما مصر بتلعب في المونديال! 🇪🇬⚽ السعر الآن ٤٤٩٫٩٩ ج.م بدلاً من السعر الكامل.",
    descriptionExtra:
      "الكورس تحت إشراف:\nأساتذة هندسة و حاسبات من جامعة القاهرة\n\nو إعداد و تنفيذ:\nمهندسين برمجيات و تكنولوجيا معلومات\nأساتذة محترفين لضمان وصول المعلومة للطفل بشكل آمن و مشوق\n\n🎮 الكورس مش مجرد شرح…\nده تجربة عملية يخلي الطفل فيها \"يبني ويجرب بنفسه\"\n\n💡 ليه الكورس مهم؟\n✔️ ينمّي التفكير المنطقي والإبداع\n✔️ يعرّف الأطفال بأساسيات المستقبل (AI & Machine Learning)\n✔️ يخلّي التعلم ممتع وسهل",
    promoLabel: "عرض المونديال: ٤٤٩٫٩٩ ج.م للطفل (خصم ٢٠٪) 🏆⚽",
    promoTitle: "Triple A Education Center - 2nd Floor - East Hub",
    promoLocationUrl: "https://share.google/0DL8Xtn3VX5N4RLba",
    promoDescription:
      "متاح للجميع! تخفيض ٢٠٪ مستمر لآخر يونيو وطول ما مصر بتلعب في المونديال. ⚽🏆",
    labTitle: "نظام مجموعات صغيرة",
    labSubtitle: "١٠ أطفال في الجلسة · ٤٤٩٫٩٩ ج.م للطفل · بدون حضور أولياء الأمور ⚽🏆",
    cta: "سجل الآن",
    stats: [
      { value: "١٢٠ ", label: "دقيقة" },
      { value: "١٠", label: "أطفال / جلسة" },
      { value: "٤٤٩٫٩٩", label: "ج.م / عرض المونديال 🏆" }
    ],
    safetyBadges: [
      { icon: "🛡️", label: "استخدام آمن للذكاء الاصطناعي" },
      { icon: "🎓", label: "مدربون محترفون من المجتمع" },
      { icon: "👦", label: "للأعمار ٨–١٢" },
      { icon: "🏆", label: "٤٤٩٫٩٩ ج.م للطفل (خصم المونديال المستمر) ⚽" },
      { icon: "📞", label: "للإستفسارات يرجى التواصل على: +201026655008", url: "https://wa.me/201026655008?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B1%D9%8A%20%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84%20%D9%8A%D9%88%D9%84%206%20%D9%8A%D9%88%D9%86%D9%8A%D9%88" }
    ],
    galleryTitle: "ألبوم الصور مع العباقرة الصغار",
    gallerySubtitle: "صور من ورش عمل التعلم التفاعلي للذكاء الاصطناعي (الموجة ١ و ٢). أطفالنا، برمجة حقيقية، ومتعة لا تنتهي!",
    galleryViewAll: "عرض جميع الصور",
    galleryLoading: "جاري تحميل معرض الصور...",
    galleryEmpty: "لا توجد صور مرفوعة لهذه الجلسة بعد."
  },
  footer: {
    copy: "© ٢٠٢٦ ZSolutions · القاهرة الجديدة، مصر · بناه المجتمع.",
    links: ["سياسة الخصوصية", "حالة النظام", "شروط الاستخدام"],
    socialLinks: [
      { icon: "facebook", label: "فيسبوك", url: "https://www.facebook.com/profile.php?id=61587705874177" },
      { icon: "instagram", label: "إنستغرام", url: "https://www.instagram.com/invites/contact/?igsh=1j16tus21g2ro&utm_content=d24zbtm" },
      { icon: "twitter", label: "إكس (تويتر)", url: "https://x.com/MadinatyAI" },
      { icon: "youtube", label: "يوتيوب", url: "https://www.youtube.com/" },
      { icon: "linkedin", label: "لينكدإن", url: "https://www.linkedin.com/company/112226033/" }
    ],
    whatsappNumber: "+201026655008",
    adminEmail: "engziada@gmail.com"
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

