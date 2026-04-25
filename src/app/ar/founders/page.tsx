import type { Metadata } from "next";
import Link from "next/link";
import { FounderCard3D } from "@/components/FounderCard3D";
import { ArrowLeft, Sparkles, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "المؤسسون | Madinaty AI",
  description: "تعرف على الرؤساء وراء Madinaty AI — المجتمع الذي يبني بُعد الذكاء لأذكى مدينة في مصر.",
};

/**
 * Founder roster (AR). Uses the same pinned randomuser.me portrait indices
 * as the English page to keep faces consistent across locales.
 */
const PORTRAIT_BASE = "https://randomuser.me/api/portraits";
const m = (n: number) => `${PORTRAIT_BASE}/men/${n}.jpg`;
const w = (n: number) => `${PORTRAIT_BASE}/women/${n}.jpg`;

const founders = [
  {
    name: "د. كريم المصري",
    role: "الرؤية والاستراتيجية",
    bio: "باحث في الذكاء الاصطناعي بخبرة ١٥+ عاماً في البنية التحتية للمدن الذكية. عمل سابقاً في مختبر MIT Media، ومكرس الآن لجلب الأنظمة الذكية للمجتمعات المصرية.",
    image: m(32),
    emoji: "🧠",
  },
  {
    name: "ليلى حسن",
    role: "مديرة المجتمع",
    bio: "رائدة أعمال اجتماعية شغوفة بربط التكنولوجيا والمجتمع. بنت أطر مشاركة لأكثر من ٥٠٠ ألف ساكن في مجمعات القاهرة الجديدة.",
    image: w(44),
    emoji: "🌟",
  },
  {
    name: "عمر فاروق",
    role: "رئيس الهندسة",
    bio: "مهندس أنظمة متكامل متخصص في الأنظمة الفورية. عمل سابقاً في أوبر وكريم. يطور الآن نشر الذكاء الاصطناعي على نطاق المدن.",
    image: m(75),
    emoji: "⚡",
  },
  {
    name: "نور أحمد",
    role: "قائدة التعليم",
    bio: "استراتيجية سابقة في Google for Education. تصمم برامج محو الأمية الرقمية للأطفال والبالغين في ٢٣ حياً من أحياء مدينتي.",
    image: w(68),
    emoji: "🎓",
  },
  {
    name: "يوسف خالد",
    role: "مهندس المنتج",
    bio: "رؤية UX مولعة بالتصميم المتمحور حول الإنسان. شكل سابقاً منتجات في شركات Y Combinator، ويصنع الآن التوأم الرقمي للمدينة.",
    image: m(11),
    emoji: "🎯",
  },
  {
    name: "مريم طارق",
    role: "قائدة الشراكات",
    bio: "بنت تحالفات استراتيجية عبر نظام التكنولوجيا في الشرق الأوسط. تربط Madinaty AI بالمستثمرين والحكومة وشركاء الابتكار.",
    image: w(21),
    emoji: "🤝",
  },
  {
    name: "أحمد سمير",
    role: "قائد البحث AI",
    bio: "دكتوراه في تعلم الآلة من الجامعة الأمريكية. يقود تطوير نماذج لغوية محلية تفهم اللهجات العربية المصرية.",
    image: m(52),
    emoji: "🔬",
  },
  {
    name: "سارة محمود",
    role: "مديرة العمليات",
    bio: "وسعت منصات لوجستية عبر ٦ دول. تدير الآن السيمفونية المعقدة للخدمات في مدينة تضم ٧٠٠ ألف+ ساكن.",
    image: w(8),
    emoji: "📊",
  },
  {
    name: "حسن إبراهيم",
    role: "مهندس الأمان",
    bio: "خبير أمن سيبراني من قطاع المصارف. يضمن خصوصية بيانات السكان وأمان المنصة للبنية التحتية الحرجة.",
    image: m(89),
    emoji: "🔒",
  },
  {
    name: "رانيا مصطفى",
    role: "مديرة الإبداع",
    bio: "فنانة رقمية حاصلة على جوائز واستراتيجية علامة تجارية. تصمم الهوية البصرية لأول منصة ذكاء اصطناعي مدعومة من المجتمع في مصر.",
    image: w(35),
    emoji: "🎨",
  },
];

export default function FoundersPageAr() {
  return (
    <main className="founders-page" dir="rtl">
      {/* Hero Section */}
      <section className="founders-hero">
        <h1 className="founders-hero-title">مهندسو المستقبل</h1>
        <p className="founders-hero-subtitle">
          مجموعة من الرؤساء والمهندسين وبناء المجتمعات يصنعون 
          بُعد الذكاء لأذكى مدينة في مصر.
        </p>
      </section>

      {/* Founders Grid */}
      <section className="founders-grid">
        {founders.map((founder, index) => (
          <FounderCard3D
            key={founder.name}
            {...founder}
            index={index}
          />
        ))}
      </section>

      {/* Vision, Mission, Values */}
      <section className="vmv-section">
        <div className="vmv-grid">
          <div className="vmv-card">
            <div className="vmv-icon">
              <Sparkles size={28} color="#fff" />
            </div>
            <h3 className="vmv-title">رؤيتنا</h3>
            <p className="vmv-text">
              تحويل مدينتي إلى النموذج الأولي للحياة الحضرية الذكية في مصر والعالم العربي — 
              حيث تخدم التكنولوجيا الإنسانية، لا العكس.
            </p>
          </div>

          <div className="vmv-card">
            <div className="vmv-icon">
              <Target size={28} color="#fff" />
            </div>
            <h3 className="vmv-title">مهمتنا</h3>
            <p className="vmv-text">
              بناء أدوات ذكاء اصطناعي تضع المجتمع أولاً: أحياء أكثر أماناً، 
              مواصلات أذكى، تعليم أفضل، وروابط أقوى بين الجيران.
            </p>
          </div>

          <div className="vmv-card">
            <div className="vmv-icon">
              <Heart size={28} color="#fff" />
            </div>
            <h3 className="vmv-title">قيمنا</h3>
            <p className="vmv-text">
              الخصوصية في التصميم. مبادئ المصدر المفتوح. بنية المعرفة الصفرية. 
              الحوسبة المحلية أولاً. وقبل كل شيء — الإيمان بأن الذكاء الاصطناعي يجب أن يتمكن، لا أن يحل محل.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="container" style={{ padding: "2rem 1rem", textAlign: "center" }}>
        <Link href="/ar" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={18} />
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
