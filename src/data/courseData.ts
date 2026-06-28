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
  /** Has gallery support */
  hasGallery: boolean;
}

/* ------------------------------------------------------------------ */
/*  Course Catalogue                                                   */
/* ------------------------------------------------------------------ */

export const courses: Course[] = [
  {
    slug: "kids-ai-chatbots",
    icon: "🤖",
    status: "active",
    categoryAr: "مركز الابتكار بمدينتي · Triple A إيست هب",
    categoryEn: "Madinaty Innovation Hub · Triple A East Hub",
    titleAr: "شات الذكاء الاصطناعي للأطفال (أعمار ٨-١٢)",
    titleEn: "AI Chatbots for Kids (Ages 8-12)",
    descriptionAr: "ورشة عمل تفاعلية لبناء مهارات المستقبل، تعليم أدوات الشات والكتابة الآمنة للأوامر.",
    descriptionEn: "An interactive hands-on workshop to build future-ready skills, teaching chatbot tools, safe prompting, and critical thinking.",
    priceOriginal: 569.99,
    priceDiscounted: 199.99,
    discount: "65%",
    currency: "EGP",
    priceBadgeAr: "عرض محدود: ١٩٩٫٩٩ ج.م بدلاً من 569.99 ج.م",
    priceBadgeEn: "Limited Offer: 199.99 EGP instead of 569.99 EGP",
    discountNoteAr: "خصم ٦٥٪ لـ سكان مدينتي فقط · متبقي عدد محدود من المقاعد المخفضة",
    discountNoteEn: "65% discount for Madinaty residents only · Limited seats available at promo price",

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
        urgencyAr: "🟢 مقاعد مخفضة متاحة — آخر فرصة!",
        urgencyEn: "🟢 Discounted seats available — Last chance!",
        noteAr: "أسرع — هذا آخر موعد للحجز بالسعر المخفض ١٩٩٫٩٩ ج.م",
        noteEn: "Hurry up — this is your last chance to book at the discounted price of 199.99 EGP",
      },
    ],

    announcementTitleAr: "📢 إعلان هام",
    announcementTitleEn: "📢 Important Announcement",
    announcementAr: "الجلسات الثلاثة الأولى (٦ يونيو الساعة ١٢:٠٠ ظهراً و٨:٠٠ مساءً) تم حجزها بالكامل. لا تزال هناك مقاعد مخفضة في جلسة ١٣ يونيو — أسرع قبل فوات الأوان!",
    announcementEn: "The first 3 sessions (June 6 at 12:00 PM & 8:00 PM) are fully reserved. Discounted seats are still available for the June 13 session — hurry before it's too late!",

    stats: [
      { icon: "🛡️", titleAr: "بيئة تعليمية آمنة", titleEn: "100% Safe Environment", textAr: "استخدام أدوات وحسابات تم التحقق منها وبإشراف مدربين متخصصين.", textEn: "Using verified AI tools and accounts supervised by experienced trainers." },
      { icon: "👥", titleAr: "مجموعات صغيرة جداً", titleEn: "Ultra-small Groups", textAr: "بحد أقصى ١٠ أطفال في القاعة لضمان جودة التفاعل والتعلم الفردي.", textEn: "Max 10 kids per room to ensure personalized attention and interactive learning." },
      { icon: "💰", titleAr: "سعر مدعوم للمجتمع", titleEn: "Community Subsidized", textAr: "تخفيض ٦٥٪ لسكان مدينتي (١٩٩٫٩٩ ج.م بدلاً من 569.99 ج.م) — آخر فرصة!", textEn: "65% discount for Madinaty residents (199.99 EGP instead of 569.99 EGP) — last chance!" },
    ],

    overviewAr: "في هذه الورشة التفاعلية التي تمتد لساعتين، سيتعلم الأطفال كيف يعمل الذكاء الاصطناعي التوليدي من خلال التجربة العملية. يتم تنظيم الطلاب في مجموعات صغيرة (١٠ أطفال كحد أقصى) لتوفير أقصى قدر من الاهتمام الفردي ومساعدة الأطفال على بناء ثقتهم الرقمية.",
    overviewEn: "In this 2-hour interactive workshop, children will discover how generative AI works through hands-on experimentation. Students are organized in small group settings (max 10 kids) to ensure personalized attention and foster digital confidence.",

    specs: [
      { labelAr: "الفئة العمرية", labelEn: "Target Age", valueAr: "٨ إلى ١٢ سنة", valueEn: "8 to 12 years old" },
      { labelAr: "مدة الجلسة", labelEn: "Session Duration", valueAr: "ساعتان كاملتان (١٢٠ دقيقة)", valueEn: "2 full hours (120 minutes)" },
      { labelAr: "المكان", labelEn: "Location", valueAr: "مركز Triple A التعليمي، الدور الثاني، إيست هب، مدينتي", valueEn: "Triple A Education Center, 2nd Floor, East Hub, Madinaty" },
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
      { qAr: "هل الكورس مجاني بالكامل؟", qEn: "Is the workshop completely free?", aAr: "الورشة ليست مجانية، بل تُقدم بسعر رمزي مدعوم لسكان مدينتي فقط وهو ١٩٩٫٩٩ ج.م للطفل (خصم ٦٥٪ من السعر الأصلي البالغ ٥٧٠ ج.م)، وذلك لأول ٢٠ مشترك لتغطية تكاليف التشغيل وضمان جدية الحجز.", aEn: "No, the session is subsidized at a very low price of 199.99 EGP per child for the Madinaty community (65% off the standard fee of 570 EGP). This special pricing applies to the first 20 children to cover operating costs and confirm commitment." },
      { qAr: "ما هي الفئة العمرية المستهدفة؟", qEn: "What is the target age group?", aAr: "الورشة مصممة خصيصاً للأطفال من عمر ٨ إلى ١٢ سنة. المنهج والألعاب التعليمية والتطبيقات العملية مناسبة تماماً لهذه الفئة العمرية.", aEn: "The workshop is tailored for children aged 8 to 12. The exercises, interactive storytelling, prompting games, and safety principles are specially designed for this cognitive stage." },
      { qAr: "أين تقع القاعة المخصصة للورشة؟", qEn: "Where is the session located?", aAr: "تقام الورشة في مركز Triple A التعليمي (East Hub - الدور الثاني)، القاهرة الجديدة. الموقع مجهز بالكامل بأجهزة الكمبيوتر وشبكة إنترنت سريعة وبيئة مكيفة وآمنة للأطفال.", aEn: "Sessions take place at the Triple A Education Center, 2nd Floor, East Hub, Madinaty. The lab is equipped with high-speed computers, safe internet filters, and a comfortable, secure environment." },
      { qAr: "هل يمكن لأولياء الأمور حضور الورشة مع الأطفال؟", qEn: "Can parents attend the classroom session?", aAr: "نعم، يمكن لأولياء الأمور الحضور مع أطفالهم للمراقبة، ويمكنهم أيضاً المشاركة في بعض الأنشطة التفاعلية خلال الجلسة.", aEn: "Yes, parents may attend with their kids to monitor and may even contribute to some of the activities during the session." },
      { qAr: "ما هي الأدوات المطلوبة من الطفل؟", qEn: "Do children need to bring their own laptops?", aAr: "لا يحتاج الطفل لإحضار أي أجهزة معه. المركز يوفر أجهزة كمبيوتر وشاشات وحسابات تعليمية آمنة ومجهزة لكل طفل لتطبيق الأنشطة عملياً.", aEn: "No, everything is provided! Every child will have access to a computer with pre-configured, safe educational AI sandboxes and tools." },
    ],

    policyTitleAr: "سياسة الحضور والإلغاء",
    policyTitleEn: "Attendance & Cancellation Policy",
    policiesAr: [
      "التسجيل المسبق إلزامي لحضور الجلسة وتأمين المقعد.",
      "لإلغاء أو تأجيل الحجز، يُرجى إبلاغنا قبل موعد الجلسة بـ ٤٨ ساعة على الأقل ليتمكن الطلاب في قائمة الانتظار من المشاركة.",
      "الرسوم (١٩٩٫٩٩ ج.م) غير مستردة في حالة الغياب بدون إشعار مسبق قبل الموعد بـ ٤٨ ساعة.",
    ],
    policiesEn: [
      "Prior registration is strictly mandatory to secure your child's seat.",
      "To cancel or reschedule, please notify us at least 48 hours in advance so we can offer the seat to candidates on the waiting list.",
      "The promo fee (199.99 EGP) is non-refundable for no-shows without 48-hour prior notice.",
    ],

    ctaAr: "سجل الآن مع أسترو 🐕",
    ctaEn: "Register Now with Astro 🐕",
    hasGallery: true,
  },
  {
    slug: "kids-coding-scratch",
    icon: "🎮",
    status: "coming-soon",
    categoryAr: "مركز الابتكار بمدينتي · Triple A إيست هب",
    categoryEn: "Madinaty Innovation Hub · Triple A East Hub",
    titleAr: "مبادئ البرمجة للأطفال: صناعة الألعاب (أعمار 8-12)",
    titleEn: "Coding for Kids: Game Design (Ages 8-12)",
    descriptionAr: "من الشغف بالألعاب إلى صناعتها! كورس تفاعلي يعلم الأطفال البرمجة من خلال بناء ألعابهم الخاصة.",
    descriptionEn: "Turn their passion for gaming into game creation! An interactive course teaching kids coding by building their own games.",
    priceOriginal: 0,
    priceDiscounted: 0,
    discount: "TBD",
    currency: "EGP",
    priceBadgeAr: "التسجيل يفتح قريباً",
    priceBadgeEn: "Registration Opens Soon",
    discountNoteAr: "ترقبوا الإعلان عن مواعيد التسجيل والأسعار.",
    discountNoteEn: "Stay tuned for registration dates and pricing.",
    requirements: [
      { textAr: "لا يحتاج الطفل لإحضار أي أجهزة — كل شيء متاح في المركز", textEn: "No equipment needed — everything is provided at the center", icon: "✅" }
    ],
    slots: [],
    stats: [
      { icon: "🛡️", titleAr: "بيئة تعليمية آمنة", titleEn: "100% Safe Environment", textAr: "أدوات مخصصة للأطفال وإشراف كامل.", textEn: "Kid-friendly tools and full supervision." },
      { icon: "🧠", titleAr: "منهجية تفاعلية", titleEn: "Interactive Methodology", textAr: "مزيج بين الشرح النظري والتطبيق العملي والألعاب الحركية.", textEn: "A mix of theory, hands-on practice, and unplugged activities." },
      { icon: "🎓", titleAr: "مشاريع التخرج", titleEn: "Capstone Projects", textAr: "يصمم كل طفل لعبته الخاصة ليعرضها في نهاية الكورس.", textEn: "Every kid designs their own game to showcase at the end." }
    ],
    overviewAr: "في هذه المرحلة العمرية (8-12)، يمتلك الأطفال خيالاً خصباً وقدرة على فهم المنطق، وهو العمر الذهبي لتعلم البرمجة. هذا الكورس مقسم على 6 جلسات مكثفة وممتعة، يتعلم فيها الأطفال 12 موضوعاً برمجياً لابتكار لعبة أو قصة تفاعلية خاصة بهم.",
    overviewEn: "At this age (8-12), children have a rich imagination and logic capacity—the golden age to learn coding. This course is divided into 6 intensive and fun sessions, covering 12 programming topics to create their own interactive game or story.",
    specs: [
      { labelAr: "الفئة العمرية", labelEn: "Target Age", valueAr: "8 إلى 12 سنة", valueEn: "8 to 12 years old" },
      { labelAr: "مدة الكورس", labelEn: "Course Duration", valueAr: "6 جلسات مكثفة", valueEn: "6 intensive sessions" },
      { labelAr: "مدة الجلسة", labelEn: "Session Duration", valueAr: "ساعتان كاملتان", valueEn: "2 full hours" },
      { labelAr: "المكان", labelEn: "Location", valueAr: "مركز Triple A التعليمي", valueEn: "Triple A Education Center" }
    ],
    pillars: [
      { icon: "💻", titleAr: "مدخل إلى عالم البرمجة", titleEn: "Intro to Coding", textAr: "ما هي البرمجة؟ كيف يفكر الكمبيوتر؟ واستكشاف واجهة البرنامج.", textEn: "What is coding? How does a computer think? Exploring the IDE." },
      { icon: "🕹️", titleAr: "تحريك الأشياء وتوجيهها", titleEn: "Movement & Events", textAr: "الحركة، الاتجاهات، وكيف نجعل البرنامج يبدأ عند الضغط على زر.", textEn: "Motion, directions, and triggering events with keyboards/mice." },
      { icon: "🎨", titleAr: "التصميم والتفاعل", titleEn: "Design & Interaction", textAr: "تغيير المظاهر، إضافة خلفيات، تركيب الأصوات، والتفاعل مع المستخدم.", textEn: "Changing costumes, backdrops, sound effects, and user interactions." },
      { icon: "🧠", titleAr: "الذكاء والتكرار في البرمجة", titleEn: "Logic & Loops", textAr: "استخدام التكرار (Loops) والشروط الذكية (If...Then) لاتخاذ القرارات.", textEn: "Using loops and smart conditionals (If...Then) to make decisions." }
    ],
    trainers: [
      { icon: "🏫", labelAr: "إشراف أكاديمي:", labelEn: "Academic Supervision:", textAr: "أساتذة من جامعة القاهرة لإعداد منهج يتناسب مع القدرات العقلية للطفل.", textEn: "Cairo University professors ensuring age-appropriate logic progression.", accentColor: "var(--mint)" },
      { icon: "👨‍🏫", labelAr: "تنفيذ عملي:", labelEn: "Execution by:", textAr: "خبراء تكنولوجيا ومعلمون محترفون لضمان متعة التعلم.", textEn: "Tech experts and educators to ensure a fun learning experience.", accentColor: "var(--blue)" }
    ],
    timeline: [
      { timeAr: "15 دقيقة", timeEn: "15 Minutes", titleAr: "شرح نظري تفاعلي", titleEn: "Interactive Theory", textAr: "ألعاب حركية ومفاهيم بدون كمبيوتر.", textEn: "Unplugged games and concepts." },
      { timeAr: "35 دقيقة", timeEn: "35 Minutes", titleAr: "تطبيق عملي 1", titleEn: "Hands-on Practice 1", textAr: "تطبيق الموضوع الأول على الأجهزة.", textEn: "Applying the first topic on devices." },
      { timeAr: "10 دقائق", timeEn: "10 Minutes", titleAr: "استراحة", titleEn: "Break", textAr: "استراحة حركة وتجديد النشاط.", textEn: "Movement break to recharge." },
      { timeAr: "15 دقيقة", timeEn: "15 Minutes", titleAr: "شرح الموضوع الثاني", titleEn: "Second Topic Theory", textAr: "تقديم المفهوم البرمجي التالي.", textEn: "Introducing the next coding concept." },
      { timeAr: "35 دقيقة", timeEn: "35 Minutes", titleAr: "تطبيق عملي 2", titleEn: "Hands-on Practice 2", textAr: "تطبيق الموضوع الثاني.", textEn: "Applying the second topic." },
      { timeAr: "10 دقائق", timeEn: "10 Minutes", titleAr: "تحدي الختام", titleEn: "Final Challenge", textAr: "مراجعة سريعة ولعبة تحدي.", textEn: "Quick review and challenge game." }
    ],
    faqs: [
      { qAr: "متى يفتح باب التسجيل؟", qEn: "When does registration open?", aAr: "التسجيل سيفتح قريباً. تابعونا لمعرفة المواعيد الدقيقة.", aEn: "Registration opens soon. Stay tuned for exact dates." }
    ],
    policyTitleAr: "سياسات التسجيل",
    policyTitleEn: "Registration Policies",
    policiesAr: ["التسجيل المسبق ضروري لضمان مقعد طفلك."],
    policiesEn: ["Pre-registration is required to secure your child's seat."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  },
  {
    slug: "python-ai-programming",
    icon: "🐍",
    status: "coming-soon",
    categoryAr: "مركز الابتكار بمدينتي",
    categoryEn: "Madinaty Innovation Hub",
    titleAr: "برمجة بايثون والذكاء الاصطناعي",
    titleEn: "Python & AI Programming",
    descriptionAr: "رحلة متكاملة من 3 مستويات: من أساسيات بايثون إلى برمجة الذكاء الاصطناعي والتعرف على الوجوه.",
    descriptionEn: "A comprehensive 3-level journey: from Python fundamentals to building a Face Recognition AI model.",
    priceOriginal: 0,
    priceDiscounted: 0,
    discount: "TBD",
    currency: "EGP",
    priceBadgeAr: "متاح قريباً",
    priceBadgeEn: "Coming Soon",
    discountNoteAr: "البرنامج مقسم إلى 3 أشهر.",
    discountNoteEn: "Program is divided into 3 months.",
    requirements: [
      { textAr: "الالتزام بحضور المستويات بالترتيب", textEn: "Commitment to attend levels sequentially", icon: "📈" }
    ],
    slots: [],
    stats: [
      { icon: "📊", titleAr: "مشاريع حقيقية", titleEn: "Real-world Projects", textAr: "تطبيق عملي باستخدام مكاتب مثل OpenCV.", textEn: "Hands-on implementation using libraries like OpenCV." },
      { icon: " پايثون", titleAr: "لغة العصر", titleEn: "Modern Language", textAr: "تعلم بايثون، لغة البرمجة الأولى للذكاء الاصطناعي.", textEn: "Learn Python, the #1 programming language for AI." }
    ],
    overviewAr: "صُمم هذا البرنامج ليأخذ المتدرب من الصفر وحتى بناء نموذج ذكاء اصطناعي حقيقي. في المستوى الأول، نتعلم أساسيات لغة بايثون والمنطق. وفي المستوى الثاني، نتعمق في هياكل البيانات والبرمجة الكائنية. وأخيراً في المستوى الثالث، نغوص في عالم الرؤية الحاسوبية (Computer Vision) ونماذج التعلم الآلي لبرمجة نظام للتعرف على الوجوه.",
    overviewEn: "Designed to take trainees from zero to building a real AI model. Level 1 covers Python basics and logic. Level 2 dives into Data Structures and OOP. Level 3 introduces Computer Vision and Machine Learning models to build a Face Recognition system.",
    specs: [
      { labelAr: "الهيكل", labelEn: "Structure", valueAr: "3 مستويات (3 شهور)", valueEn: "3 Levels (3 Months)" },
      { labelAr: "المستوى 1", labelEn: "Level 1", valueAr: "أساسيات بايثون", valueEn: "Python Fundamentals" },
      { labelAr: "المستوى 2", labelEn: "Level 2", valueAr: "هياكل البيانات", valueEn: "Data Structures & OOP" },
      { labelAr: "المستوى 3", labelEn: "Level 3", valueAr: "الذكاء الاصطناعي", valueEn: "AI & Face Recognition" }
    ],
    pillars: [
      { icon: "📝", titleAr: "أساسيات بايثون", titleEn: "Python Fundamentals", textAr: "المتغيرات، الشروط، التكرار، والمنطق البرمجي.", textEn: "Variables, conditionals, loops, and logic." },
      { icon: "📦", titleAr: "هياكل البيانات والـ OOP", titleEn: "Data Structures & OOP", textAr: "القوائم، القواميس، الدوال، والبرمجة الكائنية.", textEn: "Lists, dictionaries, functions, and Object-Oriented Programming." },
      { icon: "👁️", titleAr: "الرؤية الحاسوبية", titleEn: "Computer Vision", textAr: "استخدام مكتبة OpenCV لمعالجة الصور واكتشاف الحواف.", textEn: "Using OpenCV for image processing and edge detection." },
      { icon: "🤖", titleAr: "التعلم الآلي (Machine Learning)", titleEn: "Machine Learning", textAr: "كيفية تدريب النماذج وبناء نظام للتعرف على الوجوه.", textEn: "Training models and building a face recognition system." }
    ],
    trainers: [
      { icon: "👨‍💻", labelAr: "مهندسو برمجيات:", labelEn: "Software Engineers:", textAr: "خبراء في تطوير بايثون والذكاء الاصطناعي.", textEn: "Experts in Python development and AI.", accentColor: "var(--teal)" }
    ],
    timeline: [
      { timeAr: "الشهر الأول", timeEn: "Month 1", titleAr: "المستوى 1: الأساسيات", titleEn: "Level 1: Fundamentals", textAr: "Syntax, Variables, Conditionals, Loops.", textEn: "Syntax, Variables, Conditionals, Loops." },
      { timeAr: "الشهر الثاني", timeEn: "Month 2", titleAr: "المستوى 2: التطوير", titleEn: "Level 2: Development", textAr: "Data Collections, Functions, Files, OOP.", textEn: "Data Collections, Functions, Files, OOP." },
      { timeAr: "الشهر الثالث", timeEn: "Month 3", titleAr: "المستوى 3: الذكاء الاصطناعي", titleEn: "Level 3: AI", textAr: "Computer Vision, ML Fundamentals, Face Recognition Model.", textEn: "Computer Vision, ML Fundamentals, Face Recognition Model." }
    ],
    faqs: [
      { qAr: "هل أحتاج لخبرة سابقة؟", qEn: "Do I need prior experience?", aAr: "لا، المستوى الأول يبدأ من الصفر.", aEn: "No, Level 1 starts from scratch." }
    ],
    policyTitleAr: "متطلبات الانضمام",
    policyTitleEn: "Joining Requirements",
    policiesAr: ["التسجيل يفتح قريباً."],
    policiesEn: ["Registration opens soon."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  },
  {
    slug: "robotics-smart-systems",
    icon: "🤖",
    status: "coming-soon",
    categoryAr: "مركز الابتكار بمدينتي",
    categoryEn: "Madinaty Innovation Hub",
    titleAr: "الروبوتات والأنظمة الذكية (Hardware)",
    titleEn: "Robotics & Smart Systems (Hardware)",
    descriptionAr: "كورس عملي من 3 مستويات يدمج بين الإلكترونيات وبرمجة الميكروكونترولر (Arduino) لابتكار أنظمة ذكية.",
    descriptionEn: "A 3-level hands-on course combining electronics and microcontroller programming (Arduino) to build smart systems.",
    priceOriginal: 0,
    priceDiscounted: 0,
    discount: "TBD",
    currency: "EGP",
    priceBadgeAr: "متاح قريباً",
    priceBadgeEn: "Coming Soon",
    discountNoteAr: "تدريب عملي 100٪",
    discountNoteEn: "100% Hands-on Hardware Training",
    requirements: [
      { textAr: "شغف بالفك والتركيب", textEn: "Passion for building and tinkering", icon: "🛠️" }
    ],
    slots: [],
    stats: [
      { icon: "🔌", titleAr: "أدوات حقيقية", titleEn: "Real Tools", textAr: "استخدام أجهزة الملتيميتر ومكونات إلكترونية فعلية.", textEn: "Using digital multimeters and real electronic components." },
      { icon: "🏗️", titleAr: "مشاريع عملية", titleEn: "Practical Projects", textAr: "بناء روبوت يتجنب العقبات ونظام إضاءة ذكي.", textEn: "Build obstacle-avoiding robots and smart lighting systems." }
    ],
    overviewAr: "دورة مكثفة تغطي أسرار الأجهزة الذكية! المستوى الأول (السحر الكهربائي) يعلم أساسيات الدوائر والمكونات. المستوى الثاني يركز على العقول الرقمية وبرمجة الأردوينو. أما المستوى الثالث (صعود الروبوتات) فيدمج الحساسات والمحركات المتقدمة لإنتاج أنظمة ذكية ذاتية الحركة.",
    overviewEn: "An intensive hardware course! Level 1 explores electrical circuits and components. Level 2 focuses on digital logic and Arduino programming. Level 3 integrates advanced sensors and motors to produce fully autonomous smart robotics.",
    specs: [
      { labelAr: "الهيكل", labelEn: "Structure", valueAr: "3 مستويات", valueEn: "3 Levels" },
      { labelAr: "الأدوات المستخدمة", labelEn: "Tools Used", valueAr: "Arduino, Sensors, Motors", valueEn: "Arduino, Sensors, Motors" }
    ],
    pillars: [
      { icon: "⚡", titleAr: "السحر الكهربائي", titleEn: "Electrical Magic", textAr: "دوائر، فولت، تيار، ومقاومة.", textEn: "Circuits, Voltage, Current, and Resistance." },
      { icon: "🧠", titleAr: "عقول الأجهزة الذكية", titleEn: "Coding the Brains", textAr: "المنطق الرقمي، البوابات المنطقية وبرمجة الأردوينو.", textEn: "Digital logic, logic gates, and Arduino programming." },
      { icon: "📡", titleAr: "الحساسات المتقدمة", titleEn: "Advanced Sensors", textAr: "رادار الموجات الصوتية ومستشعرات الحرارة والضوء.", textEn: "Ultrasonic radar, temperature, and light sensors." },
      { icon: "⚙️", titleAr: "المحركات والحركة", titleEn: "Motion Mechanics", textAr: "برمجة المحركات وتصميم روبوت يتجنب العقبات.", textEn: "Motor programming and building an obstacle-avoiding robot." }
    ],
    trainers: [
      { icon: "🛠️", labelAr: "مهندسو إلكترونيات:", labelEn: "Electronics Engineers:", textAr: "مهندسون متخصصون في الهاردوير والروبوتكس.", textEn: "Specialized hardware and robotics engineers.", accentColor: "var(--sun)" }
    ],
    timeline: [
      { timeAr: "المستوى 1", timeEn: "Level 1", titleAr: "مبادئ الإلكترونيات", titleEn: "Electronics Basics", textAr: "الدوائر، المكونات، ومشروع لعبة (Steady-Hand).", textEn: "Circuits, components, and DIY Steady-Hand game." },
      { timeAr: "المستوى 2", timeEn: "Level 2", titleAr: "المنطق وبرمجة الأردوينو", titleEn: "Logic & Arduino", textAr: "النظام الثنائي، الأردوينو، وإضاءة ذكية.", textEn: "Binary system, Arduino, and Smart Nightlight." },
      { timeAr: "المستوى 3", timeEn: "Level 3", titleAr: "الروبوتات المتقدمة", titleEn: "Advanced Robotics", textAr: "الحساسات، المحركات، ومشروع روبوت ذاتي القيادة.", textEn: "Sensors, motors, and an autonomous robot project." }
    ],
    faqs: [
      { qAr: "هل سأبني روبوت بيدي؟", qEn: "Will I build a robot myself?", aAr: "نعم، بنهاية المستوى الثالث.", aEn: "Yes, by the end of Level 3." }
    ],
    policyTitleAr: "التسجيل",
    policyTitleEn: "Registration",
    policiesAr: ["التسجيل يفتح قريباً."],
    policiesEn: ["Registration opens soon."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  },
  {
    slug: "ai-pilot-day",
    icon: "🚀",
    status: "coming-soon",
    categoryAr: "Khemet.ai للتدريب التنفيذي",
    categoryEn: "Khemet.ai Executive Training",
    titleAr: "AI Pilot Day (للقادة والمديرين)",
    titleEn: "AI Pilot Day (For Executives)",
    descriptionAr: "9 مهارات، 9 ساعات، لتتخرج وأنت تمتلك نظام تشغيل AI شخصي. تدريب بدون أي أكواد للمديرين.",
    descriptionEn: "9 Skills, 9 Hours to graduate with your personal AI operating system. Zero-code training for managers.",
    priceOriginal: 0,
    priceDiscounted: 0,
    discount: "TBD",
    currency: "EGP",
    priceBadgeAr: "تدريب تنفيذي",
    priceBadgeEn: "Executive Training",
    discountNoteAr: "يومان تدريبيان مكثفان.",
    discountNoteEn: "Two intensive training days.",
    requirements: [
      { textAr: "لا توجد أي متطلبات تقنية (0 سطر كود)", textEn: "No technical prerequisites (0 lines of code)", icon: "🚫" }
    ],
    slots: [],
    stats: [
      { icon: "⏱️", titleAr: "9 ساعات مكثفة", titleEn: "9 Intensive Hours", textAr: "يوم عملي مكثف.", textEn: "Intensive hands-on day." },
      { icon: "💡", titleAr: "9 مهارات قيادية", titleEn: "9 Leadership Skills", textAr: "مهارات تدعم اتخاذ القرار وتحسين الجودة.", textEn: "Skills supporting decision making and quality." },
      { icon: "🔐", titleAr: "AI Vault", titleEn: "AI Vault", textAr: "نظام تشغيل شخصي.", textEn: "Personal operating system." }
    ],
    overviewAr: "هذا ليس كورسًا تقليديًا مليئًا بالمحاضرات النظرية. إنه يوم عملي مكثف تخرج منه وأنت تمتلك نظام تشغيل AI شخصيًا مصممًا لطريقة تفكيرك وعملك. التدريب مصمم بالكامل لأصحاب الأعمال والمديرين والقادة. لا توجد برمجة، فقط لغة طبيعية لتكتسب 9 مهارات قيادية مدعومة بالذكاء الاصطناعي.",
    overviewEn: "This isn't a traditional theoretical course. It's an intensive practical day where you graduate with a personal AI operating system tailored to your workflow. Designed entirely for business owners, managers, and leaders. No coding required, just natural language to master 9 AI-backed leadership skills.",
    specs: [
      { labelAr: "الجمهور", labelEn: "Audience", valueAr: "المديرين وأصحاب الأعمال", valueEn: "Managers & Business Owners" },
      { labelAr: "المنهجية", labelEn: "Methodology", valueAr: "تطبيق عملي 100٪", valueEn: "100% Hands-on Application" },
      { labelAr: "الاعتماد", labelEn: "Certification", valueAr: "شهادة AI Pilot معتمدة", valueEn: "Certified AI Pilot Certificate" }
    ],
    pillars: [
      { icon: "🗣️", titleAr: "صياغة الأوامر (Prompt Engineering)", titleEn: "Prompt Engineering", textAr: "الصياغة الاحترافية للأوامر.", textEn: "Professional prompt formulation." },
      { icon: "🎯", titleAr: "التفكير الاستراتيجي", titleEn: "Strategic Thinking", textAr: "التفكير والتخطيط المدعوم بالـ AI.", textEn: "AI-backed planning and thinking." },
      { icon: "📈", titleAr: "تحليل القرارات", titleEn: "Decision Analysis", textAr: "تحليل القرارات واختبار الفرضيات المهمة.", textEn: "Analyzing decisions and testing hypotheses." },
      { icon: "🧠", titleAr: "المستشار الشخصي", titleEn: "Personal Advisor", textAr: "إنشاء مستشار AI شخصي يفهم عملك.", textEn: "Creating a personal AI advisor." }
    ],
    trainers: [
      { icon: "👔", labelAr: "خبراء Khemet.ai:", labelEn: "Khemet.ai Experts:", textAr: "استشاريون خبراء في الذكاء الاصطناعي للأعمال.", textEn: "Consultants specialized in AI for Business.", accentColor: "var(--gold)" }
    ],
    timeline: [
      { timeAr: "المرحلة 1", timeEn: "Phase 1", titleAr: "أساسيات وتطوير المخرجات", titleEn: "Basics & Output Enhancement", textAr: "Prompt Engineering, تحسين الجودة، والتفكير الاستراتيجي.", textEn: "Prompt Engineering, Quality Control, and Strategic Thinking." },
      { timeAr: "المرحلة 2", timeEn: "Phase 2", titleAr: "الأنظمة وتحليل القرارات", titleEn: "Systems & Decision Analysis", textAr: "بناء أنظمة العمل، التلخيص، وتحليل القرارات.", textEn: "Building workflows, Summarization, and Decision Analysis." },
      { timeAr: "المرحلة 3", timeEn: "Phase 3", titleAr: "المعرفة والمستشار الشخصي", titleEn: "Knowledge & Personal Advisor", textAr: "إدارة المعرفة الشخصية وبناء المستشار.", textEn: "Personal Knowledge Management and Advisor Building." }
    ],
    faqs: [
      { qAr: "ماذا سأحمل معي بعد التدريب؟", qEn: "What will I take away?", aAr: "ستغادر ومعك AI Vault خاص بك يشمل إطارات العمل، مكتبة المعايير، وMaster Prompts.", aEn: "You will leave with a personal AI Vault containing frameworks, standards library, and Master Prompts." }
    ],
    policyTitleAr: "التسجيل المسبق",
    policyTitleEn: "Pre-registration",
    policiesAr: ["التسجيل يفتح قريباً."],
    policiesEn: ["Registration opens soon."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  }

,
{
  "slug": "kids-coding-scratch",
  "icon": "🎮",
  "status": "coming-soon",
  "categoryAr": "برمجة الأطفال · للمبتدئين",
  "categoryEn": "Kids Coding · Beginners",
  "titleAr": "مبادئ البرمجة وتصميم الألعاب للأطفال",
  "titleEn": "Coding Principles & Game Design for Kids",
  "descriptionAr": "كورس تفاعلي يعلم الأطفال أساسيات البرمجة من خلال تصميم ألعابهم الخاصة.",
  "descriptionEn": "An interactive course teaching kids the basics of coding through game design.",
  "priceOriginal": 1800,
  "priceDiscounted": 1800,
  "discount": "",
  "currency": "EGP",
  "priceBadgeAr": "١٨٠٠ ج.م",
  "priceBadgeEn": "1800 EGP",
  "discountNoteAr": "",
  "discountNoteEn": "",
  "requirements": [
    {
      "textAr": "يجب إحضار لابتوب خاص بالطفل",
      "textEn": "A personal laptop is required",
      "icon": "💻"
    }
  ],
  "slots": [],
  "stats": [
    {
      "icon": "⏰",
      "titleAr": "٦ أسابيع",
      "titleEn": "6 Weeks",
      "textAr": "جلستان في الأسبوع",
      "textEn": "Two sessions per week"
    },
    {
      "icon": "👥",
      "titleAr": "مجموعات صغيرة",
      "titleEn": "Small Groups",
      "textAr": "لضمان التركيز والمتابعة",
      "textEn": "To ensure focus and follow-up"
    }
  ],
  "overviewAr": "هل تبحث عن الطريقة المثالية لاستغلال شغف طفلك بالكمبيوتر؟ في المرحلة العمرية من 8 إلى 12 سنة، يمتلك الأطفال مزيجاً رائعاً من الخيال والقدرة على فهم المنطق. نقدم لكم كورساً تفاعلياً وعملياً ممتعاً مقسماً على 6 جلسات مكثفة.",
  "overviewEn": "Looking for the perfect way to utilize your child's passion for computers? At ages 8-12, kids have a great mix of imagination and logic. We offer an interactive and fun 6-session practical course.",
  "specs": [
    {
      "labelAr": "الفئة العمرية",
      "labelEn": "Target Age",
      "valueAr": "٨ إلى ١٢ سنة",
      "valueEn": "8 to 12 years old"
    },
    {
      "labelAr": "المدة الزمنية",
      "labelEn": "Duration",
      "valueAr": "٦ أسابيع (١٢ ساعة)",
      "valueEn": "6 Weeks (12 Hours)"
    }
  ],
  "pillars": [
    {
      "icon": "🎮",
      "titleAr": "مدخل إلى عالم البرمجة",
      "titleEn": "Intro to Coding",
      "textAr": "ما هي البرمجة وكيف يفكر الكمبيوتر.",
      "textEn": "What is coding and how computers think."
    },
    {
      "icon": "🚀",
      "titleAr": "الذكاء والتكرار",
      "titleEn": "Logic & Loops",
      "textAr": "كيف نكرر الأوامر وكيف نصنع الشروط.",
      "textEn": "How to use loops and conditionals."
    },
    {
      "icon": "🏆",
      "titleAr": "صناعة الألعاب",
      "titleEn": "Game Development",
      "textAr": "تصميم وبناء ألعاب وقصص تفاعلية.",
      "textEn": "Designing and building interactive games and stories."
    }
  ],
  "trainers": [],
  "timeline": [
    {
      "timeAr": "الجلسة ١",
      "timeEn": "Session 1",
      "titleAr": "مدخل إلى عالم البرمجة",
      "titleEn": "Intro to Coding",
      "textAr": "التعرف على بيئة العمل.",
      "textEn": "Understanding the workspace."
    },
    {
      "timeAr": "الجلسة ٢",
      "timeEn": "Session 2",
      "titleAr": "تحريك الأشياء",
      "titleEn": "Animation & Events",
      "textAr": "كيف نجعل الكائن يتحرك.",
      "textEn": "Making objects move."
    },
    {
      "timeAr": "الجلسة ٣",
      "timeEn": "Session 3",
      "titleAr": "التصميم والتفاعل",
      "titleEn": "Design & Interaction",
      "textAr": "المظاهر والأصوات والتفاعل.",
      "textEn": "Costumes, sounds, and interaction."
    },
    {
      "timeAr": "الجلسة ٤",
      "timeEn": "Session 4",
      "titleAr": "الذكاء والتكرار",
      "titleEn": "Loops & Conditionals",
      "textAr": "تعليم الكمبيوتر اتخاذ القرارات.",
      "textEn": "Teaching the computer to make decisions."
    },
    {
      "timeAr": "الجلسة ٥",
      "timeEn": "Session 5",
      "titleAr": "الألعاب والذاكرة",
      "titleEn": "Games & Memory",
      "textAr": "المتغيرات والاستشعار.",
      "textEn": "Variables and sensing."
    },
    {
      "timeAr": "الجلسة ٦",
      "timeEn": "Session 6",
      "titleAr": "هندسة المشاريع",
      "titleEn": "Project Engineering",
      "textAr": "المشروع النهائي والاحتفال.",
      "textEn": "Final project and celebration."
    }
  ],
  "faqs": [],
  "policyTitleAr": "سياسة الكورس",
  "policyTitleEn": "Course Policy",
  "policiesAr": [
    "التسجيل يفتح قريباً."
  ],
  "policiesEn": [
    "Registration opens soon."
  ],
  "ctaAr": "قريباً",
  "ctaEn": "Coming Soon",
  "hasGallery": false
},
{
  "slug": "python-ai-programming",
  "icon": "🐍",
  "status": "coming-soon",
  "categoryAr": "برمجة وذكاء اصطناعي · متقدم",
  "categoryEn": "Programming & AI · Advanced",
  "titleAr": "بايثون وذكاء اصطناعي",
  "titleEn": "Python & AI Prodigy",
  "descriptionAr": "كورس شامل لتعلم بايثون وتطوير نماذج الذكاء الاصطناعي والتعرف على الوجوه.",
  "descriptionEn": "A comprehensive course to learn Python and develop AI face recognition models.",
  "priceOriginal": 5100,
  "priceDiscounted": 5100,
  "discount": "",
  "currency": "EGP",
  "priceBadgeAr": "٥١٠٠ ج.م",
  "priceBadgeEn": "5100 EGP",
  "discountNoteAr": "",
  "discountNoteEn": "",
  "requirements": [
    {
      "textAr": "يجب إحضار لابتوب خاص",
      "textEn": "Personal laptop required",
      "icon": "💻"
    }
  ],
  "slots": [],
  "stats": [
    {
      "icon": "⏰",
      "titleAr": "٨ أسابيع",
      "titleEn": "8 Weeks",
      "textAr": "٢٤ ساعة تدريبية",
      "textEn": "24 Training Hours"
    },
    {
      "icon": "🤖",
      "titleAr": "مشاريع عملية",
      "titleEn": "Hands-on Projects",
      "textAr": "تطوير نماذج ذكاء اصطناعي",
      "textEn": "Developing AI models"
    }
  ],
  "overviewAr": "برنامج تدريبي متكامل يمتد على مدار ٨ أسابيع يغطي أساسيات بايثون وهياكل البيانات ووصولاً إلى الذكاء الاصطناعي وتطبيقات التعرف على الوجه.",
  "overviewEn": "An 8-week intensive training program covering Python fundamentals, data structures, and advancing to AI and face recognition applications.",
  "specs": [
    {
      "labelAr": "المدة الزمنية",
      "labelEn": "Duration",
      "valueAr": "٨ أسابيع (٢٤ ساعة)",
      "valueEn": "8 Weeks (24 Hours)"
    }
  ],
  "pillars": [
    {
      "icon": "🐍",
      "titleAr": "أساسيات بايثون",
      "titleEn": "Python Fundamentals",
      "textAr": "بناء أساس قوي في لغة بايثون.",
      "textEn": "Building a strong foundation in Python."
    },
    {
      "icon": "💾",
      "titleAr": "هياكل البيانات",
      "titleEn": "Data Structures",
      "textAr": "تنظيم وإدارة البيانات المعقدة.",
      "textEn": "Organizing and managing complex data."
    },
    {
      "icon": "🧠",
      "titleAr": "الذكاء الاصطناعي",
      "titleEn": "Artificial Intelligence",
      "textAr": "تطوير نماذج التعرف على الصور.",
      "textEn": "Developing computer vision models."
    }
  ],
  "trainers": [],
  "timeline": [
    {
      "timeAr": "المستوى ١",
      "timeEn": "Level 1",
      "titleAr": "أساسيات بايثون",
      "titleEn": "Python Fundamentals",
      "textAr": "المتغيرات، الحلقات، والشروط.",
      "textEn": "Variables, loops, and conditionals."
    },
    {
      "timeAr": "المستوى ٢",
      "timeEn": "Level 2",
      "titleAr": "هياكل البيانات والتطبيقات",
      "titleEn": "Data Structures & Apps",
      "textAr": "القوائم، الدوال، والبرمجة الكائنية.",
      "textEn": "Lists, functions, and OOP."
    },
    {
      "timeAr": "المستوى ٣",
      "timeEn": "Level 3",
      "titleAr": "الذكاء الاصطناعي والتعرف على الوجوه",
      "titleEn": "AI & Face Recognition",
      "textAr": "الرؤية الحاسوبية وتدريب النماذج.",
      "textEn": "Computer vision and model training."
    }
  ],
  "faqs": [],
  "policyTitleAr": "التسجيل",
  "policyTitleEn": "Registration",
  "policiesAr": [
    "التسجيل يفتح قريباً."
  ],
  "policiesEn": [
    "Registration opens soon."
  ],
  "ctaAr": "قريباً",
  "ctaEn": "Coming Soon",
  "hasGallery": false
},
{
  "slug": "robotics-smart-systems",
  "icon": "⚙️",
  "status": "coming-soon",
  "categoryAr": "روبوتات وأنظمة ذكية · عملي",
  "categoryEn": "Robotics & Smart Systems · Hands-on",
  "titleAr": "الروبوتات والأنظمة الذكية",
  "titleEn": "RoboCraft & Smart Systems",
  "descriptionAr": "رحلة عملية في عالم الإلكترونيات والدوائر الذكية وبرمجة الأردوينو لتطوير أنظمة منزلية وروبوتات.",
  "descriptionEn": "A practical journey into electronics, smart circuits, and Arduino programming to develop robots and smart home systems.",
  "priceOriginal": 6200,
  "priceDiscounted": 6200,
  "discount": "",
  "currency": "EGP",
  "priceBadgeAr": "٦٢٠٠ ج.م",
  "priceBadgeEn": "6200 EGP",
  "discountNoteAr": "",
  "discountNoteEn": "",
  "requirements": [],
  "slots": [],
  "stats": [
    {
      "icon": "⏰",
      "titleAr": "٨ أسابيع",
      "titleEn": "8 Weeks",
      "textAr": "٢٤ ساعة تدريبية",
      "textEn": "24 Training Hours"
    },
    {
      "icon": "🔧",
      "titleAr": "تطبيق عملي 100%",
      "titleEn": "100% Hands-on",
      "textAr": "مشاريع وتجارب أسبوعية",
      "textEn": "Weekly projects and experiments"
    }
  ],
  "overviewAr": "برنامج تدريبي عملي بالكامل يأخذ الطلاب من أساسيات الكهرباء والدوائر إلى برمجة الأردوينو وتطوير روبوتات ذكية قادرة على تفادي العقبات.",
  "overviewEn": "A fully hands-on program taking students from electricity and circuit fundamentals to Arduino programming and developing smart obstacle-avoiding robots.",
  "specs": [
    {
      "labelAr": "المدة الزمنية",
      "labelEn": "Duration",
      "valueAr": "٨ أسابيع (٢٤ ساعة)",
      "valueEn": "8 Weeks (24 Hours)"
    }
  ],
  "pillars": [
    {
      "icon": "⚡",
      "titleAr": "الإلكترونيات والكهرباء",
      "titleEn": "Electronics & Electricity",
      "textAr": "فهم الجهد والتيار والمقاومة.",
      "textEn": "Understanding voltage, current, and resistance."
    },
    {
      "icon": "💻",
      "titleAr": "برمجة الأنظمة الذكية",
      "titleEn": "Smart Systems Coding",
      "textAr": "البرمجة بلغة سي سي++ باستخدام أردوينو.",
      "textEn": "C/C++ programming using Arduino."
    },
    {
      "icon": "🤖",
      "titleAr": "الروبوتات والحركة",
      "titleEn": "Robotics & Motion",
      "textAr": "المستشعرات، المحركات، والتحكم الذكي.",
      "textEn": "Sensors, motors, and smart control."
    }
  ],
  "trainers": [],
  "timeline": [
    {
      "timeAr": "المستوى ١",
      "timeEn": "Level 1",
      "titleAr": "الدوائر والإلكترونيات",
      "titleEn": "Circuits & Electronics",
      "textAr": "أساسيات الكهرباء وبناء لعبة يدوية.",
      "textEn": "Electricity basics and building a hand game."
    },
    {
      "timeAr": "المستوى ٢",
      "timeEn": "Level 2",
      "titleAr": "برمجة العقول (الأردوينو)",
      "titleEn": "Coding the Brains",
      "textAr": "البوابات المنطقية، وكتابة الأكواد للأردوينو.",
      "textEn": "Logic gates and writing Arduino code."
    },
    {
      "timeAr": "المستوى ٣",
      "timeEn": "Level 3",
      "titleAr": "صعود الروبوتات",
      "titleEn": "Rise of the Robots",
      "textAr": "المستشعرات، المحركات، والمشروع النهائي.",
      "textEn": "Sensors, motors, and the final capstone project."
    }
  ],
  "faqs": [],
  "policyTitleAr": "التسجيل",
  "policyTitleEn": "Registration",
  "policiesAr": [
    "التسجيل يفتح قريباً."
  ],
  "policiesEn": [
    "Registration opens soon."
  ],
  "ctaAr": "قريباً",
  "ctaEn": "Coming Soon",
  "hasGallery": false
},
{
  "slug": "ai-pilot-day",
  "icon": "🚀",
  "status": "coming-soon",
  "categoryAr": "الذكاء الاصطناعي التنفيذي · مكثف",
  "categoryEn": "Executive AI · Intensive",
  "titleAr": "القيادة بالذكاء الاصطناعي",
  "titleEn": "AI Executive Pilot",
  "descriptionAr": "برنامج تدريبي مكثف ليوم واحد مخصص للقادة والمديرين لتعلم كيفية دمج الذكاء الاصطناعي في بيئة العمل.",
  "descriptionEn": "An intensive one-day training program for leaders and managers to learn how to integrate AI into the workplace.",
  "priceOriginal": 4000,
  "priceDiscounted": 4000,
  "discount": "",
  "currency": "EGP",
  "priceBadgeAr": "٤٠٠٠ ج.م",
  "priceBadgeEn": "4000 EGP",
  "discountNoteAr": "",
  "discountNoteEn": "",
  "requirements": [
    {
      "textAr": "يجب إحضار لابتوب خاص",
      "textEn": "Personal laptop required",
      "icon": "💻"
    }
  ],
  "slots": [],
  "stats": [
    {
      "icon": "⏰",
      "titleAr": "يوم واحد",
      "titleEn": "1 Day",
      "textAr": "٩ ساعات تدريبية مكثفة",
      "textEn": "9 Intensive Training Hours"
    },
    {
      "icon": "💼",
      "titleAr": "مستوى تنفيذي",
      "titleEn": "Executive Level",
      "textAr": "مخصص للمدراء والقادة",
      "textEn": "Designed for managers and leaders"
    }
  ],
  "overviewAr": "يوم تدريبي مكثف يهدف إلى تزويد المدراء والتنفيذيين بالأدوات والمهارات اللازمة لقيادة فرقهم باستخدام أحدث تقنيات الذكاء الاصطناعي التوليدي والتفكير الاستراتيجي.",
  "overviewEn": "An intensive training day aimed at equipping managers and executives with the tools and skills needed to lead their teams using the latest generative AI technologies and strategic thinking.",
  "specs": [
    {
      "labelAr": "المدة الزمنية",
      "labelEn": "Duration",
      "valueAr": "يوم واحد (٩ ساعات)",
      "valueEn": "1 Day (9 Hours)"
    }
  ],
  "pillars": [
    {
      "icon": "🧠",
      "titleAr": "التفكير الاستراتيجي بالذكاء الاصطناعي",
      "titleEn": "AI Strategic Thinking",
      "textAr": "دمج الذكاء الاصطناعي في صنع القرار.",
      "textEn": "Integrating AI into decision making."
    },
    {
      "icon": "⚙️",
      "titleAr": "هندسة الأوامر المتقدمة",
      "titleEn": "Advanced Prompt Engineering",
      "textAr": "كتابة الأوامر الاحترافية للحصول على نتائج عالية الجودة.",
      "textEn": "Writing professional prompts for high-quality outputs."
    },
    {
      "icon": "🚀",
      "titleAr": "بناء الأنظمة الذكية",
      "titleEn": "Building Smart Systems",
      "textAr": "تطوير مستشار ذكاء اصطناعي شخصي.",
      "textEn": "Developing a personal AI consultant."
    }
  ],
  "trainers": [],
  "timeline": [
    {
      "timeAr": "الجزء ١",
      "timeEn": "Part 1",
      "titleAr": "أساسيات وتطبيقات الذكاء الاصطناعي",
      "titleEn": "AI Fundamentals & Applications",
      "textAr": "استكشاف إمكانيات الذكاء الاصطناعي.",
      "textEn": "Exploring AI capabilities."
    },
    {
      "timeAr": "الجزء ٢",
      "timeEn": "Part 2",
      "titleAr": "التفكير الاستراتيجي وصنع القرار",
      "titleEn": "Strategic Thinking & Decision Making",
      "textAr": "استخدام الذكاء الاصطناعي لحل المشكلات.",
      "textEn": "Using AI for problem-solving."
    },
    {
      "timeAr": "الجزء ٣",
      "timeEn": "Part 3",
      "titleAr": "بناء مستشارك الشخصي",
      "titleEn": "Building Your Personal Consultant",
      "textAr": "تطبيق عملي متقدم.",
      "textEn": "Advanced hands-on application."
    }
  ],
  "faqs": [],
  "policyTitleAr": "التسجيل",
  "policyTitleEn": "Registration",
  "policiesAr": [
    "التسجيل يفتح قريباً."
  ],
  "policiesEn": [
    "Registration opens soon."
  ],
  "ctaAr": "قريباً",
  "ctaEn": "Coming Soon",
  "hasGallery": false
}
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
