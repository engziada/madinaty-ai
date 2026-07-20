/**
 * Testimonials Data — Parent & Student Reviews
 *
 * Replace the placeholder entries below with real testimonials.
 * Each entry has Arabic and English text, a name, relation, course slug,
 * and an optional rating (1–5).
 *
 * The TestimonialsSection component reads from this file.
 */

export interface Testimonial {
  id: string;
  nameAr: string;
  nameEn: string;
  /** e.g. "Parent", "Student", "Business Owner" */
  relationAr: string;
  relationEn: string;
  /** Which course this review is about (slug from courseData) */
  courseSlug?: string;
  /** Star rating 1–5 */
  rating: number;
  textAr: string;
  textEn: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    nameAr: "أحمد م.",
    nameEn: "Ahmed M.",
    relationAr: "ولي أمر",
    relationEn: "Parent",
    courseSlug: "kids-session",
    rating: 5,
    textAr: "ابني رجع من الورشة متحمس جداً وبدأ يسألني أسئلة عن الذكاء الاصطناعي. المدربين كانوا ممتازين والمكان آمن ومنظم.",
    textEn: "My son came back from the workshop incredibly excited and started asking me questions about AI. The trainers were excellent and the venue was safe and well-organized.",
  },
  {
    id: "t2",
    nameAr: "سارة ع.",
    nameEn: "Sara A.",
    relationAr: "ولية أمر",
    relationEn: "Parent",
    courseSlug: "kids-ai-dev",
    rating: 5,
    textAr: "بنتي اتعلمت تعمل لعبة بنفسها في ٦ أسابيع! الكورس عملي جداً ومش مجرد نظري. أنصح كل أم وأب في مدينتي يسجلوا أولادهم.",
    textEn: "My daughter learned to build her own game in just 6 weeks! The course is very hands-on, not just theory. I recommend every parent in Madinaty to enroll their kids.",
  },
  {
    id: "t3",
    nameAr: "محمد ر.",
    nameEn: "Mohamed R.",
    relationAr: "رائد أعمال",
    relationEn: "Entrepreneur",
    courseSlug: "ai-pilot-day",
    rating: 4,
    textAr: "كورس القيادة بالذكاء الاصطناعي غيّر طريقة تفكيري في إدارة شركتي. يوم واحد مكثف لكنه يستاهل كل قرش.",
    textEn: "The AI Executive Pilot course changed how I think about managing my company. One intensive day but worth every penny.",
  },
  {
    id: "t4",
    nameAr: "نورا ح.",
    nameEn: "Noura H.",
    relationAr: "ولية أمر",
    relationEn: "Parent",
    courseSlug: "kids-session",
    rating: 5,
    textAr: "أكتر حاجة عجبتني إن الأطفال اتعلموا إزاي يحموا نفسهم على الإنترنت. مش بس برمجة، ده أمان رقمي كمان.",
    textEn: "What I loved most is that children learned how to protect themselves online. It's not just coding — it's digital safety too.",
  },
  {
    id: "t5",
    nameAr: "عمر ك.",
    nameEn: "Omar K.",
    relationAr: "ولي أمر",
    relationEn: "Parent",
    courseSlug: "robotics-smart-systems",
    rating: 5,
    textAr: "ابني بقى يعرف يركب دوائر كهربائية ويبرمج أردوينو! حاجة ما كنتش أتخيلها لطفل عمره ١٠ سنين.",
    textEn: "My son can now build electrical circuits and program Arduino! Something I never imagined for a 10-year-old.",
  },
];
