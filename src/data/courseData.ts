/**
 * Centralized Course Catalog Data
 *
 * Single source of truth for all course content displayed on the platform.
 * Each course is identified by a unique `slug` used for URL routing.
 */

import type { LocaleCode } from "@/types/site";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CourseSlot {
  id: string;
  dateAr: string;
  dateEn: string;
  timeAr: string;
  timeEn: string;
  status: "available" | "sold-out" | "coming-soon";
  /** Optional urgency label */
  urgencyAr?: string;
  urgencyEn?: string;
  /** Extra note (e.g., hurry message) */
  noteAr?: string;
  noteEn?: string;
}

export interface CourseSpec {
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
}

export interface CoursePillar {
  icon: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
}

export interface CourseTrainerSection {
  icon: string;
  labelAr: string;
  labelEn: string;
  textAr: string;
  textEn: string;
  accentColor: string;
}

export interface CourseTimelineItem {
  timeAr: string;
  timeEn: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
}

export interface CourseFaqItem {
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
}

export interface CourseRequirement {
  textAr: string;
  textEn: string;
  icon: string;
}

export interface CourseStat {
  icon: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
}

export interface Course {
  slug: string;
  icon: string;
  status: "active" | "coming-soon";
  /** Target audience for filtering */
  audience: "kids" | "professional" | "general";
  /** Category / venue */
  categoryAr: string;
  categoryEn: string;
  /** Main title */
  titleAr: string;
  titleEn: string;
  /** Short description */
  descriptionAr: string;
  descriptionEn: string;
  /** Pricing */
  priceOriginal: number;
  priceDiscounted: number;
  discount: string;
  currency: string;
  /** Price badge text */
  priceBadgeAr: string;
  priceBadgeEn: string;
  /** Discount note */
  discountNoteAr: string;
  discountNoteEn: string;
  /** Requirements for the trainee */
  requirements: CourseRequirement[];
  /** Available session slots */
  slots: CourseSlot[];
  /** Announcement banner */
  announcementAr?: string;
  announcementEn?: string;
  announcementTitleAr?: string;
  announcementTitleEn?: string;
  /** Session highlights / stats */
  stats: CourseStat[];
  /** Overview text (longer) */
  overviewAr: string;
  overviewEn: string;
  /** Workshop specs */
  specs: CourseSpec[];
  /** Curriculum pillars */
  pillars: CoursePillar[];
  /** Trainers sections */
  trainers: CourseTrainerSection[];
  /** Session timeline */
  timeline: CourseTimelineItem[];
  /** FAQs */
  faqs: CourseFaqItem[];
  /** Policies */
  policyTitleAr: string;
  policyTitleEn: string;
  policiesAr: string[];
  policiesEn: string[];
  /** CTA labels */
  ctaAr: string;
  ctaEn: string;
  /** CTA Banner */
  ctaBannerTitleAr: string;
  ctaBannerTitleEn: string;
  ctaBannerDescAr: string;
  ctaBannerDescEn: string;
  /** Has gallery support */
  hasGallery: boolean;
}

/* ------------------------------------------------------------------ */
/*  Course Catalogue                                                   */
/* ------------------------------------------------------------------ */

export const courses: Course[] = [
  /* ================================================================ */
  /*  1. Kids Session — AI Chatbots for Kids (ages 8-12)              */
  /* ================================================================ */
  {
    slug: "kids-session",
    icon: "🤖",
    status: "active",
    audience: "kids",
    categoryAr: "مركز الإبتكار · مدينتي",
    categoryEn: "AI Innovation Lab · Madinaty, New Cairo",
    titleAr: "شات الذكاء الاصطناعي للأطفال (أعمار ٨-١٢)",
    titleEn: "AI Chatbots for Kids (Ages 8-12)",
    descriptionAr: "ورشة عمل تفاعلية لبناء مهارات المستقبل، تعليم أدوات الشات والكتابة الآمنة للأوامر.",
    descriptionEn: "An interactive hands-on workshop to build future-ready skills, teaching chatbot tools, safe prompting, and critical thinking.",
    priceOriginal: 569.99,
    priceDiscounted: 450,
    discount: "21%",
    currency: "EGP",
    priceBadgeAr: "٤٥٠ ج.م بدلاً من 569.99 ج.م",
    priceBadgeEn: "450 EGP instead of 569.99 EGP",
    discountNoteAr: "خصم ٢١٪ لسكان مدينتي · متبقي عدد محدود من المقاعد",
    discountNoteEn: "21% discount for Madinaty residents · Limited seats available",

    requirements: [
      { textAr: "لا يحتاج الطفل لإحضار أي أجهزة — كل شيء متاح في المركز", textEn: "No equipment needed — everything is provided at the center", icon: "✅" },
    ],

    slots: [
      {
        id: "june6-12pm",
        dateAr: "السبت ٦ يونيو ٢٠٢٦",
        dateEn: "Saturday, June 6, 2026",
        timeAr: "١٢:٠٠ ظهراً – ٢:٠٠ ظهراً (ساعتان)",
        timeEn: "12:00 PM – 2:00 PM (2 Hours)",
        status: "sold-out",
        urgencyAr: "🔴 كامل العدد — تم حجز جميع المقاعد",
        urgencyEn: "🔴 Sold Out — All seats reserved",
      },
      {
        id: "june6-8pm",
        dateAr: "السبت ٦ يونيو ٢٠٢٦",
        dateEn: "Saturday, June 6, 2026",
        timeAr: "٨:٠٠ مساءً – ١٠:٠٠ مساءً (ساعتان)",
        timeEn: "8:00 PM – 10:00 PM (2 Hours)",
        status: "sold-out",
        urgencyAr: "🔴 كامل العدد — تم حجز جميع المقاعد",
        urgencyEn: "🔴 Sold Out — All seats reserved",
      },
      {
        id: "june13-12pm",
        dateAr: "السبت ١٣ يونيو ٢٠٢٦",
        dateEn: "Saturday, June 13, 2026",
        timeAr: "١٢:٠٠ ظهراً – ٢:٠٠ ظهراً (ساعتان)",
        timeEn: "12:00 PM – 2:00 PM (2 Hours)",
        status: "available",
        urgencyAr: "🟢 مقاعد متاحة — سجل الآن!",
        urgencyEn: "🟢 Seats available — Register now!",
        noteAr: "أسرع — هذا آخر موعد للحجز بالسعر المخفض ٤٥٠ ج.م",
        noteEn: "Hurry up — this is your last chance to book at the discounted price of 450 EGP",
      },
    ],

    announcementTitleAr: "📢 إعلان هام",
    announcementTitleEn: "📢 Important Announcement",
    announcementAr: "الجلسات الثلاثة الأولى (٦ يونيو الساعة ١٢:٠٠ ظهراً و٨:٠٠ مساءً) تم حجزها بالكامل. لا تزال هناك مقاعد في جلسة ١٣ يونيو — أسرع قبل فوات الأوان!",
    announcementEn: "The first 3 sessions (June 6 at 12:00 PM & 8:00 PM) are fully reserved. Seats are still available for the June 13 session — hurry before it's too late!",

    stats: [
      { icon: "🛡️", titleAr: "بيئة تعليمية آمنة", titleEn: "100% Safe Environment", textAr: "استخدام أدوات وحسابات تم التحقق منها وبإشراف مدربين متخصصين.", textEn: "Using verified AI tools and accounts supervised by experienced trainers." },
      { icon: "👥", titleAr: "مجموعات صغيرة جداً", titleEn: "Ultra-small Groups", textAr: "بحد أقصى ١٠ أطفال في القاعة لضمان جودة التفاعل والتعلم الفردي.", textEn: "Max 10 kids per room to ensure personalized attention and interactive learning." },
      { icon: "💰", titleAr: "سعر مدعوم للمجتمع", titleEn: "Community Subsidized", textAr: "تخفيض ٢١٪ لسكان مدينتي (٤٥٠ ج.م بدلاً من 569.99 ج.م)", textEn: "21% discount for Madinaty residents (450 EGP instead of 569.99 EGP)" },
    ],

    overviewAr: "في هذه الورشة التفاعلية التي تمتد لساعتين، سيتعلم الأطفال كيف يعمل الذكاء الاصطناعي التوليدي من خلال التجربة العملية. يتم تنظيم الطلاب في مجموعات صغيرة (١٠ أطفال كحد أقصى) لتوفير أقصى قدر من الاهتمام الفردي ومساعدة الأطفال على بناء ثقتهم الرقمية.",
    overviewEn: "In this 2-hour interactive workshop, children will discover how generative AI works through hands-on experimentation. Students are organized in small group settings (max 10 kids) to ensure personalized attention and foster digital confidence.",

    specs: [
      { labelAr: "الفئة العمرية", labelEn: "Target Age", valueAr: "٨ إلى ١٢ سنة", valueEn: "8 to 12 years old" },
      { labelAr: "مدة الجلسة", labelEn: "Session Duration", valueAr: "ساعتان كاملتان (١٢٠ دقيقة)", valueEn: "2 full hours (120 minutes)" },
      { labelAr: "المكان", labelEn: "Location", valueAr: "مركز الإبتكار، مدينتي، القاهرة الجديدة", valueEn: "AI Innovation Lab, Madinaty, New Cairo" },
      { labelAr: "الحد الأقصى", labelEn: "Room Capacity", valueAr: "١٠ طلاب فقط لكل جلسة لضمان جودة الاستيعاب", valueEn: "Strictly max 10 students for quality interaction" },
    ],

    pillars: [
      { icon: "🤖", titleAr: "أساسيات الذكاء الاصطناعي", titleEn: "AI & Machine Learning Basics", textAr: "فهم مبسط لما هو الذكاء الاصطناعي، كيف يتعلم، والفرق بين العقل البشري والآلة بطريقة شيقة ومناسبة للأطفال.", textEn: "A simplified, kid-friendly look at what AI is, how it processes information, and the differences between human minds and computer models." },
      { icon: "✏️", titleAr: "الكتابة الآمنة للأوامر (Prompting)", titleEn: "Safe Prompt Engineering", textAr: "تعلم القواعد الأساسية لصياغة أسئلة وطلبات واضحة للحصول على أفضل إجابات، واستعمال الشات كمساعد ذكي للتعلم والإبداع.", textEn: "Learning the golden rules of structuring questions and instructions to get the best responses, using AI as an interactive study buddy." },
      { icon: "🛡️", titleAr: "الأمان الرقمي والخصوصية", titleEn: "Digital Safety & Privacy", textAr: "قواعد ذهبية لحماية البيانات الشخصية، وعدم مشاركة أي معلومات حساسة، ومعرفة متى يجب إغلاق الشات والتحدث مع الوالدين.", textEn: "Essential guidelines on protecting private information, avoiding sharing sensitive personal data, and knowing when to ask parents for help." },
      { icon: "🔍", titleAr: "التفكير النقدي والتحقق", titleEn: "Critical Thinking & Verification", textAr: "تدريب الأطفال على عدم تصديق كل ما تنتجه الآلة، وفهم كيف يمكن للشات أن يخطئ (الهلوسة)، وكيفية التحقق من صحة الإجابات.", textEn: "Empowering children to analyze AI responses critically, understand AI 'hallucinations', and run simple checks to verify factual correctness." },
    ],

    trainers: [
      { icon: "🏫", labelAr: "تحت إشراف أكاديمي:", labelEn: "Under Academic Supervision:", textAr: "أساتذة ودكاترة هندسة وحاسبات من جامعة القاهرة. يتم إعداد وتدقيق المنهج العلمي ليتناسب مع القدرات العقلية واللغوية للطفل، مع الحفاظ على القواعد البرمجية الصحيحة.", textEn: "Professors of Computer Engineering and Computer Science from Cairo University. The curriculum is academically vetted to align with cognitive development stages of young children while introducing proper logical concepts.", accentColor: "var(--mint)" },
      { icon: "💻", labelAr: "الإعداد والتنفيذ:", labelEn: "Design & Execution by:", textAr: "مهندسو برمجيات، خبراء تكنولوجيا معلومات، ومعلمون محترفون لضمان وصول المعلومة للطفل بشكل شيق وبأعلى معايير الأمان التقني والأخلاقي.", textEn: "Senior software engineers, IT specialists, and child education experts who deliver complex technical concepts through storytelling, games, and engaging hands-on coding activities.", accentColor: "var(--blue)" },
    ],

    timeline: [
      { timeAr: "٢٥ دقيقة", timeEn: "25 Minutes", titleAr: "مقدمة تفاعلية ولعبة تفكير آلي", titleEn: "Interactive Intro & Unplugged Game", textAr: "ترحيب بالطلاب، أنشطة كسر الجليد، ولعبة تفاعلية بدون كمبيوتر (Unplugged Activity) لفهم طريقة معالجة الآلة للأوامر.", textEn: "Icebreakers and a physical game showing how instructions (algorithms) are executed, helping kids grasp machine thinking without looking at a screen." },
      { timeAr: "٣٠ دقيقة", timeEn: "30 Minutes", titleAr: "تطبيق عملي: هندسة الأوامر الذكية", titleEn: "Hands-on: Prompt Engineering Lab", textAr: "تطبيق مباشر على أجهزة الكمبيوتر في بيئة آمنة ومراقبة. كتابة الأوامر (Prompts)، وحل تحديات إبداعية ورسم الصور وتأليف القصص بالذكاء الاصطناعي.", textEn: "Working in a safe, sandboxed environment. Kids write prompts, solve creative challenges, generate artwork, and co-write stories with AI helpers." },
      { timeAr: "١٠ دقائق", timeEn: "10 Minutes", titleAr: "BREAK", titleEn: "BREAK", textAr: "وقت مستقطع للراحة.", textEn: "Short break." },
      { timeAr: "١٥ دقيقة", timeEn: "15 Minutes", titleAr: "رحلة في فضاء الذكاء الاصطناعي", titleEn: "Journey into AI Space", textAr: "استكشاف إمكانيات الذكاء الاصطناعي في مختلف المجالات.", textEn: "Exploring the capabilities of Artificial Intelligence in various fields." },
      { timeAr: "٢٥ دقيقة", timeEn: "25 Minutes", titleAr: "لعبة تدريب بالموديل", titleEn: "Model Training Game", textAr: "تدريب عملي مبسط على كيفية تعلم الآلة وتدريب نموذج مصغر.", textEn: "Simplified hands-on training on how machines learn and training a mini model." },
      { timeAr: "١٥ دقيقة", timeEn: "15 Minutes", titleAr: "معمل جوجل", titleEn: "Google Lab", textAr: "تجارب تفاعلية مع أدوات وتطبيقات الذكاء الاصطناعي من جوجل (Google Labs).", textEn: "Interactive experiments with AI tools and applications from Google Labs." },
    ],

    faqs: [
      { qAr: "كم سعر الجلسة؟", qEn: "How much does the session cost?", aAr: "سعر الجلسة ٤٥٠ ج.م للطفل (خصم ٢١٪ من السعر الأصلي البالغ ٥٧٠ ج.م).", aEn: "The session costs 450 EGP per child (21% off the standard fee of 569.99 EGP)." },
      { qAr: "ما هي الفئة العمرية المستهدفة؟", qEn: "What is the target age group?", aAr: "الورشة مصممة خصيصاً للأطفال من عمر ٨ إلى ١٢ سنة. المنهج والألعاب التعليمية والتطبيقات العملية مناسبة تماماً لهذه الفئة العمرية.", aEn: "The workshop is tailored for children aged 8 to 12. The exercises, interactive storytelling, prompting games, and safety principles are specially designed for this cognitive stage." },
      { qAr: "أين تقع القاعة المخصصة للورشة؟", qEn: "Where is the session located?", aAr: "تقام الورشة في مركز الإبتكار بمدينتي، القاهرة الجديدة. الموقع مجهز بالكامل بأجهزة الكمبيوتر وشبكة إنترنت سريعة وبيئة مكيفة وآمنة للأطفال.", aEn: "Sessions take place at the AI Innovation Lab in Madinaty, New Cairo. The lab is equipped with high-speed computers, safe internet filters, and a comfortable, secure environment." },
      { qAr: "هل يمكن لأولياء الأمور حضور الورشة مع الأطفال؟", qEn: "Can parents attend the classroom session?", aAr: "نعم، يمكن لأولياء الأمور الحضور مع أطفالهم للمراقبة، ويمكنهم أيضاً المشاركة في بعض الأنشطة التفاعلية خلال الجلسة.", aEn: "Yes, parents may attend with their kids to monitor and may even contribute to some of the activities during the session." },
      { qAr: "ما هي الأدوات المطلوبة من الطفل؟", qEn: "Do children need to bring their own laptops?", aAr: "لا يحتاج الطفل لإحضار أي أجهزة معه. المركز يوفر أجهزة كمبيوتر وشاشات وحسابات تعليمية آمنة ومجهزة لكل طفل لتطبيق الأنشطة عملياً.", aEn: "No, everything is provided! Every child will have access to a computer with pre-configured, safe educational AI sandboxes and tools." },
    ],

    policyTitleAr: "سياسة الحضور والإلغاء",
    policyTitleEn: "Attendance & Cancellation Policy",
    policiesAr: [
      "التسجيل المسبق إلزامي لحضور الجلسة وتأمين المقعد.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل موعد الجلسة بـ ٤٨ ساعة على الأقل ليتمكن الطلاب في قائمة الانتظار من المشاركة.",
      "الرسوم (٤٥٠ ج.م) غير مستردة في حالة الغياب بدون إشعار مسبق قبل الموعد بـ ٤٨ ساعة.",
    ],
    policiesEn: [
      "Prior registration is strictly mandatory to secure your child's seat.",
      "To cancel or reschedule, please notify us at least 48 hours in advance so we can offer the seat to candidates on the waiting list.",
      "The fee (450 EGP) is non-refundable for no-shows without 48-hour prior notice.",
    ],

    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    ctaBannerTitleAr: "جاهز للمستقبل؟ 🚀",
    ctaBannerTitleEn: "Ready for the Future? 🚀",
    ctaBannerDescAr: "احجز مكان طفلك الآن في الجلسة التفاعلية العملية.",
    ctaBannerDescEn: "Book your child's seat now in the interactive hands-on session.",
    hasGallery: true,
  },

  /* ================================================================ */
  /*  2. Kids AI Dev — Coding Principles & Game Design (ages 8-12)    */
  /* ================================================================ */
  {
    slug: "kids-ai-dev",
    icon: "🎮",
    status: "active",
    audience: "kids",
    categoryAr: "برمجة الأطفال · للمبتدئين",
    categoryEn: "Kids Coding · Beginners",
    titleAr: "مبادئ البرمجة وتصميم الألعاب للأطفال",
    titleEn: "Coding Principles & Game Design for Kids",
    descriptionAr: "كورس تفاعلي يعلم الأطفال أساسيات البرمجة من خلال تصميم ألعابهم الخاصة.",
    descriptionEn: "An interactive course teaching kids the basics of coding through game design.",
    priceOriginal: 1800,
    priceDiscounted: 1800,
    discount: "",
    currency: "EGP",
    priceBadgeAr: "١٨٠٠ ج.م",
    priceBadgeEn: "1,800 EGP",
    discountNoteAr: "مفتوح للتسجيل — ٦ أسابيع تدريبية",
    discountNoteEn: "Open for Registration — 6-week training program",

    requirements: [
      { textAr: "يجب إحضار لابتوب خاص بالطفل", textEn: "A personal laptop is required", icon: "💻" },
    ],

    slots: [],

    stats: [
      { icon: "⏰", titleAr: "٦ أسابيع", titleEn: "6 Weeks", textAr: "جلستان في الأسبوع", textEn: "Two sessions per week" },
      { icon: "👥", titleAr: "مجموعات صغيرة", titleEn: "Small Groups", textAr: "لضمان التركيز والمتابعة", textEn: "To ensure focus and follow-up" },
      { icon: "🎓", titleAr: "مشاريع التخرج", titleEn: "Capstone Projects", textAr: "يصمم كل طفل لعبته الخاصة ليعرضها في نهاية الكورس.", textEn: "Every kid designs their own game to showcase at the end." },
    ],

    overviewAr: "هل تبحث عن الطريقة المثالية لاستغلال شغف طفلك بالكمبيوتر؟ في المرحلة العمرية من 8 إلى 12 سنة، يمتلك الأطفال مزيجاً رائعاً من الخيال والقدرة على فهم المنطق — وهو العمر الذهبي لتعلم البرمجة. نقدم لكم كورساً تفاعلياً وعملياً ممتعاً مقسماً على 6 جلسات مكثفة، يتعلم فيها الأطفال 12 موضوعاً برمجياً لابتكار لعبة أو قصة تفاعلية خاصة بهم.",
    overviewEn: "Looking for the perfect way to utilize your child's passion for computers? At ages 8-12, kids have a great mix of imagination and logic capacity — the golden age to learn coding. This course is divided into 6 intensive and fun sessions, covering 12 programming topics to create their own interactive game or story.",

    specs: [
      { labelAr: "الفئة العمرية", labelEn: "Target Age", valueAr: "٨ إلى ١٢ سنة", valueEn: "8 to 12 years old" },
      { labelAr: "المدة الزمنية", labelEn: "Duration", valueAr: "٦ أسابيع (١٢ ساعة)", valueEn: "6 Weeks (12 Hours)" },
      { labelAr: "مدة الجلسة", labelEn: "Session Duration", valueAr: "ساعتان كاملتان", valueEn: "2 full hours" },
      { labelAr: "المكان", labelEn: "Location", valueAr: "مركز الإبتكار، مدينتي", valueEn: "AI Innovation Lab, Madinaty" },
    ],

    pillars: [
      { icon: "💻", titleAr: "مدخل إلى عالم البرمجة", titleEn: "Intro to Coding", textAr: "ما هي البرمجة؟ كيف يفكر الكمبيوتر؟ واستكشاف واجهة البرنامج.", textEn: "What is coding? How does a computer think? Exploring the IDE." },
      { icon: "🕹️", titleAr: "تحريك الأشياء وتوجيهها", titleEn: "Movement & Events", textAr: "الحركة، الاتجاهات، وكيف نجعل البرنامج يبدأ عند الضغط على زر.", textEn: "Motion, directions, and triggering events with keyboards/mice." },
      { icon: "🎨", titleAr: "التصميم والتفاعل", titleEn: "Design & Interaction", textAr: "تغيير المظاهر، إضافة خلفيات، تركيب الأصوات، والتفاعل مع المستخدم.", textEn: "Changing costumes, backdrops, sound effects, and user interactions." },
      { icon: "🧠", titleAr: "الذكاء والتكرار في البرمجة", titleEn: "Logic & Loops", textAr: "استخدام التكرار (Loops) والشروط الذكية (If...Then) لاتخاذ القرارات.", textEn: "Using loops and smart conditionals (If...Then) to make decisions." },
    ],

    trainers: [
      { icon: "🏫", labelAr: "إشراف أكاديمي:", labelEn: "Academic Supervision:", textAr: "أساتذة من جامعة القاهرة لإعداد منهج يتناسب مع القدرات العقلية للطفل.", textEn: "Cairo University professors ensuring age-appropriate logic progression.", accentColor: "var(--mint)" },
      { icon: "👨‍🏫", labelAr: "تنفيذ عملي:", labelEn: "Execution by:", textAr: "خبراء تكنولوجيا ومعلمون محترفون لضمان متعة التعلم.", textEn: "Tech experts and educators to ensure a fun learning experience.", accentColor: "var(--blue)" },
    ],

    timeline: [
      { timeAr: "الجلسة ١", timeEn: "Session 1", titleAr: "مدخل إلى عالم البرمجة", titleEn: "Intro to Coding", textAr: "التعرف على بيئة العمل.", textEn: "Understanding the workspace." },
      { timeAr: "الجلسة ٢", timeEn: "Session 2", titleAr: "تحريك الأشياء", titleEn: "Animation & Events", textAr: "كيف نجعل الكائن يتحرك.", textEn: "Making objects move." },
      { timeAr: "الجلسة ٣", timeEn: "Session 3", titleAr: "التصميم والتفاعل", titleEn: "Design & Interaction", textAr: "المظاهر والأصوات والتفاعل.", textEn: "Costumes, sounds, and interaction." },
      { timeAr: "الجلسة ٤", timeEn: "Session 4", titleAr: "الذكاء والتكرار", titleEn: "Loops & Conditionals", textAr: "تعليم الكمبيوتر اتخاذ القرارات.", textEn: "Teaching the computer to make decisions." },
      { timeAr: "الجلسة ٥", timeEn: "Session 5", titleAr: "الألعاب والذاكرة", titleEn: "Games & Memory", textAr: "المتغيرات والاستشعار.", textEn: "Variables and sensing." },
      { timeAr: "الجلسة ٦", timeEn: "Session 6", titleAr: "هندسة المشاريع", titleEn: "Project Engineering", textAr: "المشروع النهائي والاحتفال.", textEn: "Final project and celebration." },
    ],

    faqs: [
      { qAr: "ما هي الفئة العمرية المناسبة؟", qEn: "What is the suitable age group?", aAr: "الكورس مصمم للأطفال من ٨ إلى ١٢ سنة.", aEn: "The course is designed for children aged 8 to 12." },
      { qAr: "هل يحتاج الطفل لابتوب؟", qEn: "Does my child need a laptop?", aAr: "نعم، يجب إحضار لابتوب خاص بالطفل.", aEn: "Yes, a personal laptop is required." },
      { qAr: "كم مدة الكورس؟", qEn: "How long is the course?", aAr: "٦ أسابيع بمعدل جلستين في الأسبوع، كل جلسة ساعتان (إجمالي ١٢ ساعة).", aEn: "6 weeks with 2 sessions per week, each lasting 2 hours (12 hours total)." },
    ],

    policyTitleAr: "سياسة الكورس",
    policyTitleEn: "Course Policy",
    policiesAr: [
      "التسجيل المسبق ضروري لضمان مقعد طفلك.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل موعد الجلسة بـ ٤٨ ساعة.",
    ],
    policiesEn: [
      "Pre-registration is required to secure your child's seat.",
      "To cancel or reschedule, please notify us at least 48 hours in advance.",
    ],

    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    ctaBannerTitleAr: "جاهز للمستقبل؟ 🚀",
    ctaBannerTitleEn: "Ready for the Future? 🚀",
    ctaBannerDescAr: "احجز مكان طفلك الآن ليبدأ رحلته في عالم تصميم الألعاب.",
    ctaBannerDescEn: "Book your child's seat now to start their journey in game design.",
    hasGallery: false,
  },

  /* ================================================================ */
  /*  3. Python Track — Python & AI Prodigy                           */
  /* ================================================================ */
  {
    slug: "python-ai-programming",
    icon: "🐍",
    status: "active",
    audience: "general",
    categoryAr: "برمجة وذكاء اصطناعي · متقدم",
    categoryEn: "Programming & AI · Advanced",
    titleAr: "بايثون وذكاء اصطناعي",
    titleEn: "Python & AI Prodigy",
    descriptionAr: "كورس شامل لتعلم بايثون وتطوير نماذج الذكاء الاصطناعي والتعرف على الوجوه.",
    descriptionEn: "A comprehensive course to learn Python and develop AI face recognition models.",
    priceOriginal: 5100,
    priceDiscounted: 5100,
    discount: "",
    currency: "EGP",
    priceBadgeAr: "٥١٠٠ ج.م",
    priceBadgeEn: "5,100 EGP",
    discountNoteAr: "مفتوح للتسجيل — ٨ أسابيع تدريبية",
    discountNoteEn: "Open for Registration — 8-week training program",

    requirements: [
      { textAr: "يجب إحضار لابتوب خاص", textEn: "Personal laptop required", icon: "💻" },
      { textAr: "الالتزام بحضور المستويات بالترتيب", textEn: "Commitment to attend levels sequentially", icon: "📈" },
    ],

    slots: [],

    stats: [
      { icon: "⏰", titleAr: "٨ أسابيع", titleEn: "8 Weeks", textAr: "٢٤ ساعة تدريبية", textEn: "24 Training Hours" },
      { icon: "📊", titleAr: "مشاريع حقيقية", titleEn: "Real-world Projects", textAr: "تطبيق عملي باستخدام مكتبات مثل OpenCV.", textEn: "Hands-on implementation using libraries like OpenCV." },
      { icon: "🤖", titleAr: "مشاريع عملية", titleEn: "Hands-on Projects", textAr: "تطوير نماذج ذكاء اصطناعي", textEn: "Developing AI models" },
    ],

    overviewAr: "برنامج تدريبي متكامل يمتد على مدار ٨ أسابيع يغطي أساسيات بايثون وهياكل البيانات ووصولاً إلى الذكاء الاصطناعي وتطبيقات التعرف على الوجه. صُمم هذا البرنامج ليأخذ المتدرب من الصفر وحتى بناء نموذج ذكاء اصطناعي حقيقي.",
    overviewEn: "An 8-week intensive training program covering Python fundamentals, data structures, and advancing to AI and face recognition applications. Designed to take trainees from zero to building a real AI model.",

    specs: [
      { labelAr: "الهيكل", labelEn: "Structure", valueAr: "3 مستويات (٨ أسابيع / ٢٤ ساعة)", valueEn: "3 Levels (8 Weeks / 24 Hours)" },
      { labelAr: "المستوى 1", labelEn: "Level 1", valueAr: "أساسيات بايثون", valueEn: "Python Fundamentals" },
      { labelAr: "المستوى 2", labelEn: "Level 2", valueAr: "هياكل البيانات", valueEn: "Data Structures & OOP" },
      { labelAr: "المستوى 3", labelEn: "Level 3", valueAr: "الذكاء الاصطناعي", valueEn: "AI & Face Recognition" },
    ],

    pillars: [
      { icon: "🐍", titleAr: "أساسيات بايثون", titleEn: "Python Fundamentals", textAr: "بناء أساس قوي في لغة بايثون — المتغيرات، الشروط، التكرار، والمنطق البرمجي.", textEn: "Building a strong foundation in Python — variables, conditionals, loops, and logic." },
      { icon: "💾", titleAr: "هياكل البيانات والـ OOP", titleEn: "Data Structures & OOP", textAr: "القوائم، القواميس، الدوال، والبرمجة الكائنية.", textEn: "Lists, dictionaries, functions, and Object-Oriented Programming." },
      { icon: "👁️", titleAr: "الرؤية الحاسوبية", titleEn: "Computer Vision", textAr: "استخدام مكتبة OpenCV لمعالجة الصور واكتشاف الحواف.", textEn: "Using OpenCV for image processing and edge detection." },
      { icon: "🤖", titleAr: "التعلم الآلي (Machine Learning)", titleEn: "Machine Learning", textAr: "كيفية تدريب النماذج وبناء نظام للتعرف على الوجوه.", textEn: "Training models and building a face recognition system." },
    ],

    trainers: [
      { icon: "👨‍💻", labelAr: "مهندسو برمجيات:", labelEn: "Software Engineers:", textAr: "خبراء في تطوير بايثون والذكاء الاصطناعي.", textEn: "Experts in Python development and AI.", accentColor: "var(--teal)" },
    ],

    timeline: [
      { timeAr: "المستوى ١", timeEn: "Level 1", titleAr: "أساسيات بايثون", titleEn: "Python Fundamentals", textAr: "المتغيرات، الحلقات، والشروط.", textEn: "Variables, loops, and conditionals." },
      { timeAr: "المستوى ٢", timeEn: "Level 2", titleAr: "هياكل البيانات والتطبيقات", titleEn: "Data Structures & Apps", textAr: "القوائم، الدوال، والبرمجة الكائنية.", textEn: "Lists, functions, and OOP." },
      { timeAr: "المستوى ٣", timeEn: "Level 3", titleAr: "الذكاء الاصطناعي والتعرف على الوجوه", titleEn: "AI & Face Recognition", textAr: "الرؤية الحاسوبية وتدريب النماذج.", textEn: "Computer vision and model training." },
    ],

    faqs: [
      { qAr: "هل أحتاج لخبرة سابقة؟", qEn: "Do I need prior experience?", aAr: "لا، المستوى الأول يبدأ من الصفر.", aEn: "No, Level 1 starts from scratch." },
      { qAr: "كم مدة البرنامج؟", qEn: "How long is the program?", aAr: "٨ أسابيع (٢٤ ساعة تدريبية) مقسمة على ٣ مستويات.", aEn: "8 weeks (24 training hours) divided into 3 levels." },
    ],

    policyTitleAr: "سياسة التسجيل",
    policyTitleEn: "Registration Policy",
    policiesAr: [
      "التسجيل المسبق ضروري لضمان مقعدك.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل بداية الكورس بـ ٤٨ ساعة.",
    ],
    policiesEn: [
      "Pre-registration is required to secure your seat.",
      "To cancel or reschedule, please notify us at least 48 hours before the course starts.",
    ],

    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    ctaBannerTitleAr: "مستعد لرحلة الذكاء الاصطناعي؟ 🚀",
    ctaBannerTitleEn: "Ready for the AI Journey? 🚀",
    ctaBannerDescAr: "احجز مكانك الآن لتبدأ في تطوير النماذج والتعرف على الوجوه.",
    ctaBannerDescEn: "Book your seat now to start developing models and face recognition.",
    hasGallery: false,
  },

  /* ================================================================ */
  /*  4. Robotics — RoboCraft & Smart Systems                        */
  /* ================================================================ */
  {
    slug: "robotics-smart-systems",
    icon: "⚙️",
    status: "active",
    audience: "general",
    categoryAr: "روبوتات وأنظمة ذكية · عملي",
    categoryEn: "Robotics & Smart Systems · Hands-on",
    titleAr: "الروبوتات والأنظمة الذكية",
    titleEn: "RoboCraft & Smart Systems",
    descriptionAr: "رحلة عملية في عالم الإلكترونيات والدوائر الذكية وبرمجة الأردوينو لتطوير أنظمة منزلية وروبوتات.",
    descriptionEn: "A practical journey into electronics, smart circuits, and Arduino programming to develop robots and smart home systems.",
    priceOriginal: 6200,
    priceDiscounted: 6200,
    discount: "",
    currency: "EGP",
    priceBadgeAr: "٦٢٠٠ ج.م",
    priceBadgeEn: "6,200 EGP",
    discountNoteAr: "مفتوح للتسجيل — تدريب عملي ١٠٠٪",
    discountNoteEn: "Open for Registration — 100% Hands-on Hardware Training",

    requirements: [
      { textAr: "شغف بالفك والتركيب", textEn: "Passion for building and tinkering", icon: "🛠️" },
    ],

    slots: [],

    stats: [
      { icon: "⏰", titleAr: "٨ أسابيع", titleEn: "8 Weeks", textAr: "٢٤ ساعة تدريبية", textEn: "24 Training Hours" },
      { icon: "🔧", titleAr: "تطبيق عملي 100%", titleEn: "100% Hands-on", textAr: "مشاريع وتجارب أسبوعية", textEn: "Weekly projects and experiments" },
      { icon: "🏗️", titleAr: "مشاريع عملية", titleEn: "Practical Projects", textAr: "بناء روبوت يتجنب العقبات ونظام إضاءة ذكي.", textEn: "Build obstacle-avoiding robots and smart lighting systems." },
    ],

    overviewAr: "برنامج تدريبي عملي بالكامل يأخذ الطلاب من أساسيات الكهرباء والدوائر إلى برمجة الأردوينو وتطوير روبوتات ذكية قادرة على تفادي العقبات. المستوى الأول (السحر الكهربائي) يعلم أساسيات الدوائر والمكونات. المستوى الثاني يركز على العقول الرقمية وبرمجة الأردوينو. أما المستوى الثالث (صعود الروبوتات) فيدمج الحساسات والمحركات المتقدمة لإنتاج أنظمة ذكية ذاتية الحركة.",
    overviewEn: "A fully hands-on program taking students from electricity and circuit fundamentals to Arduino programming and developing smart obstacle-avoiding robots. Level 1 explores electrical circuits and components. Level 2 focuses on digital logic and Arduino programming. Level 3 integrates advanced sensors and motors to produce fully autonomous smart robotics.",

    specs: [
      { labelAr: "الهيكل", labelEn: "Structure", valueAr: "3 مستويات (٨ أسابيع / ٢٤ ساعة)", valueEn: "3 Levels (8 Weeks / 24 Hours)" },
      { labelAr: "الأدوات المستخدمة", labelEn: "Tools Used", valueAr: "Arduino, Sensors, Motors", valueEn: "Arduino, Sensors, Motors" },
    ],

    pillars: [
      { icon: "⚡", titleAr: "الإلكترونيات والكهرباء", titleEn: "Electronics & Electricity", textAr: "فهم الجهد والتيار والمقاومة وبناء الدوائر.", textEn: "Understanding voltage, current, resistance, and building circuits." },
      { icon: "💻", titleAr: "برمجة الأنظمة الذكية", titleEn: "Smart Systems Coding", textAr: "البرمجة بلغة سي سي++ باستخدام أردوينو.", textEn: "C/C++ programming using Arduino." },
      { icon: "📡", titleAr: "الحساسات المتقدمة", titleEn: "Advanced Sensors", textAr: "رادار الموجات الصوتية ومستشعرات الحرارة والضوء.", textEn: "Ultrasonic radar, temperature, and light sensors." },
      { icon: "🤖", titleAr: "الروبوتات والحركة", titleEn: "Robotics & Motion", textAr: "المستشعرات، المحركات، والتحكم الذكي.", textEn: "Sensors, motors, and smart control." },
    ],

    trainers: [
      { icon: "🛠️", labelAr: "مهندسو إلكترونيات:", labelEn: "Electronics Engineers:", textAr: "مهندسون متخصصون في الهاردوير والروبوتكس.", textEn: "Specialized hardware and robotics engineers.", accentColor: "var(--sun)" },
    ],

    timeline: [
      { timeAr: "المستوى ١", timeEn: "Level 1", titleAr: "الدوائر والإلكترونيات", titleEn: "Circuits & Electronics", textAr: "أساسيات الكهرباء وبناء لعبة يدوية (Steady-Hand).", textEn: "Electricity basics and building a DIY Steady-Hand game." },
      { timeAr: "المستوى ٢", timeEn: "Level 2", titleAr: "برمجة العقول (الأردوينو)", titleEn: "Coding the Brains", textAr: "البوابات المنطقية، النظام الثنائي، والأردوينو.", textEn: "Logic gates, binary system, and Arduino programming." },
      { timeAr: "المستوى ٣", timeEn: "Level 3", titleAr: "صعود الروبوتات", titleEn: "Rise of the Robots", textAr: "المستشعرات، المحركات، والمشروع النهائي — روبوت ذاتي القيادة.", textEn: "Sensors, motors, and the final capstone — an autonomous robot project." },
    ],

    faqs: [
      { qAr: "هل سأبني روبوت بيدي؟", qEn: "Will I build a robot myself?", aAr: "نعم، بنهاية المستوى الثالث ستبني روبوتاً ذاتي القيادة.", aEn: "Yes, by the end of Level 3 you will build an autonomous robot." },
      { qAr: "كم مدة البرنامج؟", qEn: "How long is the program?", aAr: "٨ أسابيع (٢٤ ساعة تدريبية) مقسمة على ٣ مستويات.", aEn: "8 weeks (24 training hours) divided into 3 levels." },
    ],

    policyTitleAr: "سياسة التسجيل",
    policyTitleEn: "Registration Policy",
    policiesAr: [
      "التسجيل المسبق ضروري لضمان مقعدك.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل بداية الكورس بـ ٤٨ ساعة.",
    ],
    policiesEn: [
      "Pre-registration is required to secure your seat.",
      "To cancel or reschedule, please notify us at least 48 hours before the course starts.",
    ],

    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    ctaBannerTitleAr: "هل أنت مستعد لبناء روبوتك الخاص؟ 🤖",
    ctaBannerTitleEn: "Are you ready to build your own robot? 🤖",
    ctaBannerDescAr: "احجز مكانك الآن واستعد لرحلة ممتعة في عالم الإلكترونيات.",
    ctaBannerDescEn: "Book your seat now and get ready for an exciting journey into electronics.",
    hasGallery: false,
  },

  /* ================================================================ */
  /*  5. AI4Leaders — AI Executive Pilot                              */
  /* ================================================================ */
  {
    slug: "ai-pilot-day",
    icon: "🚀",
    status: "active",
    audience: "professional",
    categoryAr: "الذكاء الاصطناعي التنفيذي · مكثف",
    categoryEn: "Executive AI · Intensive",
    titleAr: "القيادة بالذكاء الاصطناعي",
    titleEn: "AI Executive Pilot",
    descriptionAr: "برنامج تدريبي مكثف ليوم واحد مخصص للقادة والمديرين لتعلم كيفية دمج الذكاء الاصطناعي في بيئة العمل. ٩ مهارات، ٩ ساعات، لتتخرج وأنت تمتلك نظام تشغيل AI شخصي.",
    descriptionEn: "An intensive one-day training program for leaders and managers. 9 Skills, 9 Hours to graduate with your personal AI operating system. Zero-code training.",
    priceOriginal: 4000,
    priceDiscounted: 4000,
    discount: "",
    currency: "EGP",
    priceBadgeAr: "٤٠٠٠ ج.م",
    priceBadgeEn: "4,000 EGP",
    discountNoteAr: "مفتوح للتسجيل — تدريب تنفيذي مكثف",
    discountNoteEn: "Open for Registration — Executive Intensive Training",

    requirements: [
      { textAr: "يجب إحضار لابتوب خاص", textEn: "Personal laptop required", icon: "💻" },
      { textAr: "لا توجد أي متطلبات تقنية (0 سطر كود)", textEn: "No technical prerequisites (0 lines of code)", icon: "🚫" },
    ],

    slots: [],

    stats: [
      { icon: "⏱️", titleAr: "يوم واحد", titleEn: "1 Day", textAr: "٩ ساعات تدريبية مكثفة", textEn: "9 Intensive Training Hours" },
      { icon: "💡", titleAr: "9 مهارات قيادية", titleEn: "9 Leadership Skills", textAr: "مهارات تدعم اتخاذ القرار وتحسين الجودة.", textEn: "Skills supporting decision making and quality." },
      { icon: "💼", titleAr: "مستوى تنفيذي", titleEn: "Executive Level", textAr: "مخصص للمدراء والقادة", textEn: "Designed for managers and leaders" },
    ],

    overviewAr: "هذا ليس كورسًا تقليديًا مليئًا بالمحاضرات النظرية. إنه يوم عملي مكثف تخرج منه وأنت تمتلك نظام تشغيل AI شخصيًا مصممًا لطريقة تفكيرك وعملك. التدريب مصمم بالكامل لأصحاب الأعمال والمديرين والقادة. لا توجد برمجة، فقط لغة طبيعية لتكتسب 9 مهارات قيادية مدعومة بالذكاء الاصطناعي. يوم تدريبي مكثف يهدف إلى تزويد المدراء والتنفيذيين بالأدوات والمهارات اللازمة لقيادة فرقهم باستخدام أحدث تقنيات الذكاء الاصطناعي التوليدي والتفكير الاستراتيجي.",
    overviewEn: "This isn't a traditional theoretical course. It's an intensive practical day where you graduate with a personal AI operating system tailored to your workflow. Designed entirely for business owners, managers, and leaders. No coding required, just natural language to master 9 AI-backed leadership skills. An intensive training day aimed at equipping managers and executives with the tools and skills needed to lead their teams using the latest generative AI technologies and strategic thinking.",

    specs: [
      { labelAr: "الجمهور", labelEn: "Audience", valueAr: "المديرين وأصحاب الأعمال", valueEn: "Managers & Business Owners" },
      { labelAr: "المدة الزمنية", labelEn: "Duration", valueAr: "يوم واحد (٩ ساعات)", valueEn: "1 Day (9 Hours)" },
      { labelAr: "المنهجية", labelEn: "Methodology", valueAr: "تطبيق عملي 100٪", valueEn: "100% Hands-on Application" },
      { labelAr: "الاعتماد", labelEn: "Certification", valueAr: "شهادة AI Pilot معتمدة", valueEn: "Certified AI Pilot Certificate" },
    ],

    pillars: [
      { icon: "🗣️", titleAr: "صياغة الأوامر (Prompt Engineering)", titleEn: "Prompt Engineering", textAr: "الصياغة الاحترافية للأوامر للحصول على نتائج عالية الجودة.", textEn: "Professional prompt formulation for high-quality outputs." },
      { icon: "🎯", titleAr: "التفكير الاستراتيجي", titleEn: "Strategic Thinking", textAr: "التفكير والتخطيط المدعوم بالـ AI ودمج الذكاء الاصطناعي في صنع القرار.", textEn: "AI-backed planning, thinking, and integrating AI into decision making." },
      { icon: "📈", titleAr: "تحليل القرارات", titleEn: "Decision Analysis", textAr: "تحليل القرارات واختبار الفرضيات المهمة.", textEn: "Analyzing decisions and testing hypotheses." },
      { icon: "🧠", titleAr: "المستشار الشخصي", titleEn: "Personal Advisor", textAr: "إنشاء مستشار AI شخصي يفهم عملك.", textEn: "Creating a personal AI advisor that understands your business." },
    ],

    trainers: [
      { icon: "👔", labelAr: "خبراء Khemet.ai:", labelEn: "Khemet.ai Experts:", textAr: "استشاريون خبراء في الذكاء الاصطناعي للأعمال.", textEn: "Consultants specialized in AI for Business.", accentColor: "var(--gold)" },
    ],

    timeline: [
      { timeAr: "الجزء ١", timeEn: "Part 1", titleAr: "أساسيات وتطوير المخرجات", titleEn: "Basics & Output Enhancement", textAr: "Prompt Engineering، تحسين الجودة، والتفكير الاستراتيجي. استكشاف إمكانيات الذكاء الاصطناعي.", textEn: "Prompt Engineering, Quality Control, Strategic Thinking, and exploring AI capabilities." },
      { timeAr: "الجزء ٢", timeEn: "Part 2", titleAr: "الأنظمة وتحليل القرارات", titleEn: "Systems & Decision Analysis", textAr: "بناء أنظمة العمل، التلخيص، وتحليل القرارات. استخدام الذكاء الاصطناعي لحل المشكلات.", textEn: "Building workflows, Summarization, Decision Analysis, and using AI for problem-solving." },
      { timeAr: "الجزء ٣", timeEn: "Part 3", titleAr: "المعرفة والمستشار الشخصي", titleEn: "Knowledge & Personal Advisor", textAr: "إدارة المعرفة الشخصية وبناء المستشار. تطبيق عملي متقدم.", textEn: "Personal Knowledge Management, Advisor Building, and advanced hands-on application." },
    ],

    faqs: [
      { qAr: "ماذا سأحمل معي بعد التدريب؟", qEn: "What will I take away?", aAr: "ستغادر ومعك AI Vault خاص بك يشمل إطارات العمل، مكتبة المعايير، وMaster Prompts، بالإضافة إلى شهادة AI Pilot معتمدة.", aEn: "You will leave with a personal AI Vault containing frameworks, standards library, Master Prompts, and a certified AI Pilot certificate." },
      { qAr: "هل أحتاج لخبرة تقنية؟", qEn: "Do I need technical experience?", aAr: "لا، التدريب مصمم بالكامل بدون أي برمجة. فقط لغة طبيعية.", aEn: "No, the training is entirely zero-code. Just natural language." },
    ],

    policyTitleAr: "سياسة التسجيل المسبق",
    policyTitleEn: "Pre-registration Policy",
    policiesAr: [
      "التسجيل المسبق ضروري لضمان مقعدك.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل بداية الكورس بـ ٤٨ ساعة.",
    ],
    policiesEn: [
      "Pre-registration is required to secure your seat.",
      "To cancel or reschedule, please notify us at least 48 hours before the course starts.",
    ],

    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    ctaBannerTitleAr: "جاهز لترقية مهاراتك القيادية؟ 🚀",
    ctaBannerTitleEn: "Ready to Upgrade Your Leadership Skills? 🚀",
    ctaBannerDescAr: "احجز مقعدك الآن في البرنامج التدريبي المكثف واصنع نظامك الذكي.",
    ctaBannerDescEn: "Secure your seat now in this intensive executive program and build your personal AI system.",
    hasGallery: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Find a course by its URL slug. */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Get all active (non-coming-soon) courses. */
export function getActiveCourses(): Course[] {
  return courses.filter((c) => c.status === "active");
}

/** Get localized text helper. */
export function t<K extends string>(
  obj: Record<`${K}Ar`, string> & Record<`${K}En`, string>,
  key: K,
  locale: LocaleCode
): string {
  return (locale === "ar" ? obj[`${key}Ar` as keyof typeof obj] : obj[`${key}En` as keyof typeof obj]) as string;
}
