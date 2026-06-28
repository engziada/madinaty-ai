const fs = require('fs');

const courses = [
  {
    slug: "kids-coding-scratch",
    icon: "🎮",
    status: "coming-soon",
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
    priceBadgeEn: "1800 EGP",
    discountNoteAr: "",
    discountNoteEn: "",
    requirements: [
      { textAr: "يجب إحضار لابتوب خاص بالطفل", textEn: "A personal laptop is required", icon: "💻" }
    ],
    slots: [],
    stats: [
      { icon: "⏰", titleAr: "٦ أسابيع", titleEn: "6 Weeks", textAr: "جلستان في الأسبوع", textEn: "Two sessions per week" },
      { icon: "👥", titleAr: "مجموعات صغيرة", titleEn: "Small Groups", textAr: "لضمان التركيز والمتابعة", textEn: "To ensure focus and follow-up" }
    ],
    overviewAr: "هل تبحث عن الطريقة المثالية لاستغلال شغف طفلك بالكمبيوتر؟ في المرحلة العمرية من 8 إلى 12 سنة، يمتلك الأطفال مزيجاً رائعاً من الخيال والقدرة على فهم المنطق. نقدم لكم كورساً تفاعلياً وعملياً ممتعاً مقسماً على 6 جلسات مكثفة.",
    overviewEn: "Looking for the perfect way to utilize your child's passion for computers? At ages 8-12, kids have a great mix of imagination and logic. We offer an interactive and fun 6-session practical course.",
    specs: [
      { labelAr: "الفئة العمرية", labelEn: "Target Age", valueAr: "٨ إلى ١٢ سنة", valueEn: "8 to 12 years old" },
      { labelAr: "المدة الزمنية", labelEn: "Duration", valueAr: "٦ أسابيع (١٢ ساعة)", valueEn: "6 Weeks (12 Hours)" }
    ],
    pillars: [
      { icon: "🎮", titleAr: "مدخل إلى عالم البرمجة", titleEn: "Intro to Coding", textAr: "ما هي البرمجة وكيف يفكر الكمبيوتر.", textEn: "What is coding and how computers think." },
      { icon: "🚀", titleAr: "الذكاء والتكرار", titleEn: "Logic & Loops", textAr: "كيف نكرر الأوامر وكيف نصنع الشروط.", textEn: "How to use loops and conditionals." },
      { icon: "🏆", titleAr: "صناعة الألعاب", titleEn: "Game Development", textAr: "تصميم وبناء ألعاب وقصص تفاعلية.", textEn: "Designing and building interactive games and stories." }
    ],
    trainers: [],
    timeline: [
      { timeAr: "الجلسة ١", timeEn: "Session 1", titleAr: "مدخل إلى عالم البرمجة", titleEn: "Intro to Coding", textAr: "التعرف على بيئة العمل.", textEn: "Understanding the workspace." },
      { timeAr: "الجلسة ٢", timeEn: "Session 2", titleAr: "تحريك الأشياء", titleEn: "Animation & Events", textAr: "كيف نجعل الكائن يتحرك.", textEn: "Making objects move." },
      { timeAr: "الجلسة ٣", timeEn: "Session 3", titleAr: "التصميم والتفاعل", titleEn: "Design & Interaction", textAr: "المظاهر والأصوات والتفاعل.", textEn: "Costumes, sounds, and interaction." },
      { timeAr: "الجلسة ٤", timeEn: "Session 4", titleAr: "الذكاء والتكرار", titleEn: "Loops & Conditionals", textAr: "تعليم الكمبيوتر اتخاذ القرارات.", textEn: "Teaching the computer to make decisions." },
      { timeAr: "الجلسة ٥", timeEn: "Session 5", titleAr: "الألعاب والذاكرة", titleEn: "Games & Memory", textAr: "المتغيرات والاستشعار.", textEn: "Variables and sensing." },
      { timeAr: "الجلسة ٦", timeEn: "Session 6", titleAr: "هندسة المشاريع", titleEn: "Project Engineering", textAr: "المشروع النهائي والاحتفال.", textEn: "Final project and celebration." }
    ],
    faqs: [],
    policyTitleAr: "سياسة الكورس",
    policyTitleEn: "Course Policy",
    policiesAr: ["التسجيل يفتح قريباً."],
    policiesEn: ["Registration opens soon."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  },
  {
    slug: "python-ai-programming",
    icon: "🐍",
    status: "coming-soon",
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
    priceBadgeEn: "5100 EGP",
    discountNoteAr: "",
    discountNoteEn: "",
    requirements: [
      { textAr: "يجب إحضار لابتوب خاص", textEn: "Personal laptop required", icon: "💻" }
    ],
    slots: [],
    stats: [
      { icon: "⏰", titleAr: "٨ أسابيع", titleEn: "8 Weeks", textAr: "٢٤ ساعة تدريبية", textEn: "24 Training Hours" },
      { icon: "🤖", titleAr: "مشاريع عملية", titleEn: "Hands-on Projects", textAr: "تطوير نماذج ذكاء اصطناعي", textEn: "Developing AI models" }
    ],
    overviewAr: "برنامج تدريبي متكامل يمتد على مدار ٨ أسابيع يغطي أساسيات بايثون وهياكل البيانات ووصولاً إلى الذكاء الاصطناعي وتطبيقات التعرف على الوجه.",
    overviewEn: "An 8-week intensive training program covering Python fundamentals, data structures, and advancing to AI and face recognition applications.",
    specs: [
      { labelAr: "المدة الزمنية", labelEn: "Duration", valueAr: "٨ أسابيع (٢٤ ساعة)", valueEn: "8 Weeks (24 Hours)" }
    ],
    pillars: [
      { icon: "🐍", titleAr: "أساسيات بايثون", titleEn: "Python Fundamentals", textAr: "بناء أساس قوي في لغة بايثون.", textEn: "Building a strong foundation in Python." },
      { icon: "💾", titleAr: "هياكل البيانات", titleEn: "Data Structures", textAr: "تنظيم وإدارة البيانات المعقدة.", textEn: "Organizing and managing complex data." },
      { icon: "🧠", titleAr: "الذكاء الاصطناعي", titleEn: "Artificial Intelligence", textAr: "تطوير نماذج التعرف على الصور.", textEn: "Developing computer vision models." }
    ],
    trainers: [],
    timeline: [
      { timeAr: "المستوى ١", timeEn: "Level 1", titleAr: "أساسيات بايثون", titleEn: "Python Fundamentals", textAr: "المتغيرات، الحلقات، والشروط.", textEn: "Variables, loops, and conditionals." },
      { timeAr: "المستوى ٢", timeEn: "Level 2", titleAr: "هياكل البيانات والتطبيقات", titleEn: "Data Structures & Apps", textAr: "القوائم، الدوال، والبرمجة الكائنية.", textEn: "Lists, functions, and OOP." },
      { timeAr: "المستوى ٣", timeEn: "Level 3", titleAr: "الذكاء الاصطناعي والتعرف على الوجوه", titleEn: "AI & Face Recognition", textAr: "الرؤية الحاسوبية وتدريب النماذج.", textEn: "Computer vision and model training." }
    ],
    faqs: [],
    policyTitleAr: "التسجيل",
    policyTitleEn: "Registration",
    policiesAr: ["التسجيل يفتح قريباً."],
    policiesEn: ["Registration opens soon."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  },
  {
    slug: "robotics-smart-systems",
    icon: "⚙️",
    status: "coming-soon",
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
    priceBadgeEn: "6200 EGP",
    discountNoteAr: "",
    discountNoteEn: "",
    requirements: [],
    slots: [],
    stats: [
      { icon: "⏰", titleAr: "٨ أسابيع", titleEn: "8 Weeks", textAr: "٢٤ ساعة تدريبية", textEn: "24 Training Hours" },
      { icon: "🔧", titleAr: "تطبيق عملي 100%", titleEn: "100% Hands-on", textAr: "مشاريع وتجارب أسبوعية", textEn: "Weekly projects and experiments" }
    ],
    overviewAr: "برنامج تدريبي عملي بالكامل يأخذ الطلاب من أساسيات الكهرباء والدوائر إلى برمجة الأردوينو وتطوير روبوتات ذكية قادرة على تفادي العقبات.",
    overviewEn: "A fully hands-on program taking students from electricity and circuit fundamentals to Arduino programming and developing smart obstacle-avoiding robots.",
    specs: [
      { labelAr: "المدة الزمنية", labelEn: "Duration", valueAr: "٨ أسابيع (٢٤ ساعة)", valueEn: "8 Weeks (24 Hours)" }
    ],
    pillars: [
      { icon: "⚡", titleAr: "الإلكترونيات والكهرباء", titleEn: "Electronics & Electricity", textAr: "فهم الجهد والتيار والمقاومة.", textEn: "Understanding voltage, current, and resistance." },
      { icon: "💻", titleAr: "برمجة الأنظمة الذكية", titleEn: "Smart Systems Coding", textAr: "البرمجة بلغة سي سي++ باستخدام أردوينو.", textEn: "C/C++ programming using Arduino." },
      { icon: "🤖", titleAr: "الروبوتات والحركة", titleEn: "Robotics & Motion", textAr: "المستشعرات، المحركات، والتحكم الذكي.", textEn: "Sensors, motors, and smart control." }
    ],
    trainers: [],
    timeline: [
      { timeAr: "المستوى ١", timeEn: "Level 1", titleAr: "الدوائر والإلكترونيات", titleEn: "Circuits & Electronics", textAr: "أساسيات الكهرباء وبناء لعبة يدوية.", textEn: "Electricity basics and building a hand game." },
      { timeAr: "المستوى ٢", timeEn: "Level 2", titleAr: "برمجة العقول (الأردوينو)", titleEn: "Coding the Brains", textAr: "البوابات المنطقية، وكتابة الأكواد للأردوينو.", textEn: "Logic gates and writing Arduino code." },
      { timeAr: "المستوى ٣", timeEn: "Level 3", titleAr: "صعود الروبوتات", titleEn: "Rise of the Robots", textAr: "المستشعرات، المحركات، والمشروع النهائي.", textEn: "Sensors, motors, and the final capstone project." }
    ],
    faqs: [],
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
    categoryAr: "الذكاء الاصطناعي التنفيذي · مكثف",
    categoryEn: "Executive AI · Intensive",
    titleAr: "القيادة بالذكاء الاصطناعي",
    titleEn: "AI Executive Pilot",
    descriptionAr: "برنامج تدريبي مكثف ليوم واحد مخصص للقادة والمديرين لتعلم كيفية دمج الذكاء الاصطناعي في بيئة العمل.",
    descriptionEn: "An intensive one-day training program for leaders and managers to learn how to integrate AI into the workplace.",
    priceOriginal: 4000,
    priceDiscounted: 4000,
    discount: "",
    currency: "EGP",
    priceBadgeAr: "٤٠٠٠ ج.م",
    priceBadgeEn: "4000 EGP",
    discountNoteAr: "",
    discountNoteEn: "",
    requirements: [
      { textAr: "يجب إحضار لابتوب خاص", textEn: "Personal laptop required", icon: "💻" }
    ],
    slots: [],
    stats: [
      { icon: "⏰", titleAr: "يوم واحد", titleEn: "1 Day", textAr: "٩ ساعات تدريبية مكثفة", textEn: "9 Intensive Training Hours" },
      { icon: "💼", titleAr: "مستوى تنفيذي", titleEn: "Executive Level", textAr: "مخصص للمدراء والقادة", textEn: "Designed for managers and leaders" }
    ],
    overviewAr: "يوم تدريبي مكثف يهدف إلى تزويد المدراء والتنفيذيين بالأدوات والمهارات اللازمة لقيادة فرقهم باستخدام أحدث تقنيات الذكاء الاصطناعي التوليدي والتفكير الاستراتيجي.",
    overviewEn: "An intensive training day aimed at equipping managers and executives with the tools and skills needed to lead their teams using the latest generative AI technologies and strategic thinking.",
    specs: [
      { labelAr: "المدة الزمنية", labelEn: "Duration", valueAr: "يوم واحد (٩ ساعات)", valueEn: "1 Day (9 Hours)" }
    ],
    pillars: [
      { icon: "🧠", titleAr: "التفكير الاستراتيجي بالذكاء الاصطناعي", titleEn: "AI Strategic Thinking", textAr: "دمج الذكاء الاصطناعي في صنع القرار.", textEn: "Integrating AI into decision making." },
      { icon: "⚙️", titleAr: "هندسة الأوامر المتقدمة", titleEn: "Advanced Prompt Engineering", textAr: "كتابة الأوامر الاحترافية للحصول على نتائج عالية الجودة.", textEn: "Writing professional prompts for high-quality outputs." },
      { icon: "🚀", titleAr: "بناء الأنظمة الذكية", titleEn: "Building Smart Systems", textAr: "تطوير مستشار ذكاء اصطناعي شخصي.", textEn: "Developing a personal AI consultant." }
    ],
    trainers: [],
    timeline: [
      { timeAr: "الجزء ١", timeEn: "Part 1", titleAr: "أساسيات وتطبيقات الذكاء الاصطناعي", titleEn: "AI Fundamentals & Applications", textAr: "استكشاف إمكانيات الذكاء الاصطناعي.", textEn: "Exploring AI capabilities." },
      { timeAr: "الجزء ٢", timeEn: "Part 2", titleAr: "التفكير الاستراتيجي وصنع القرار", titleEn: "Strategic Thinking & Decision Making", textAr: "استخدام الذكاء الاصطناعي لحل المشكلات.", textEn: "Using AI for problem-solving." },
      { timeAr: "الجزء ٣", timeEn: "Part 3", titleAr: "بناء مستشارك الشخصي", titleEn: "Building Your Personal Consultant", textAr: "تطبيق عملي متقدم.", textEn: "Advanced hands-on application." }
    ],
    faqs: [],
    policyTitleAr: "التسجيل",
    policyTitleEn: "Registration",
    policiesAr: ["التسجيل يفتح قريباً."],
    policiesEn: ["Registration opens soon."],
    ctaAr: "قريباً",
    ctaEn: "Coming Soon",
    hasGallery: false
  }
];

const content = fs.readFileSync('F:/Web-Projects/MadinatyAI/Codes/Platform/src/data/courseData.ts', 'utf8');

// The array ends with \n];
// We will insert the courses right before the closing bracket of courses array
// The courses array declaration starts with `export const courses: Course[] = [`

const insertIndex = content.indexOf('];', content.indexOf('export const courses: Course[] = ['));

const newContent = content.slice(0, insertIndex) + ',\\n' + courses.map(c => JSON.stringify(c, null, 2)).join(',\\n') + '\\n' + content.slice(insertIndex);

fs.writeFileSync('F:/Web-Projects/MadinatyAI/Codes/Platform/src/data/courseData.ts', newContent, 'utf8');
console.log('Successfully injected courses');
