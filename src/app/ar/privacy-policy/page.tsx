import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Madinaty AI",
  description: "سياسة الخصوصية لمنصة مدينتي AI - كيفية جمع واستخدام وحماية بياناتك.",
};

export default function PrivacyPolicyPageAr() {
  return (
    <main className="legal-page" dir="rtl">
      <div className="container legal-container">
        <h1 className="legal-title">سياسة الخصوصية</h1>
        <p className="legal-updated">آخر تحديث: أبريل ٢٠٢٦</p>

        <section className="legal-section">
          <h2>١. مقدمة</h2>
          <p>
            تلتزم Madinaty AI (&quot;نحن&quot; أو &quot;لنا&quot;) بحماية خصوصيتك. توضح سياسة الخصوصية هذه 
            كيفية جمع واستخدام والإفصاح عن وحماية معلوماتك عند استخدام موقعنا وخدماتنا. 
            يرجى قراءة هذه السياسة بعناية.
          </p>
        </section>

        <section className="legal-section">
          <h2>٢. المعلومات التي نجمعها</h2>
          <p>قد نجمع أنواعًا من المعلومات التالية:</p>
          <ul>
            <li><strong>المعلومات الشخصية:</strong> الاسم وعنوان البريد الإلكتروني ورقم الهاتف ورقم الواتساب عند التسجيل للفعاليات أو التواصل معنا.</li>
            <li><strong>بيانات الاستخدام:</strong> معلومات حول كيفية تفاعلك مع موقعنا، بما في ذلك الصفحات المزورة والوقت المستغرق.</li>
            <li><strong>معلومات الجهاز:</strong> نوع المتصفح وعنوان IP ومُعرفات الجهاز.</li>
            <li><strong>بيانات الموقع:</strong> معلومات الموقع العامة استنادًا إلى عنوان IP الخاص بك.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>٣. كيفية استخدام معلوماتك</h2>
          <p>نستخدم معلوماتك من أجل:</p>
          <ul>
            <li>معالجة تسجيلات الفعاليات والالتحاق بورش الذكاء الاصطناعي</li>
            <li>التواصل معك حول خدماتنا وفعالياتنا</li>
            <li>تحسين موقعنا وتجربة المستخدم</li>
            <li>إرسال النشرات الإخبارية وتحديثات المجتمع (بموافقتك)</li>
            <li>ضمان الأمن ومنع الاحتيال</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>٤. مشاركة المعلومات</h2>
          <p>
            لا نبيع معلوماتك الشخصية. ق نشارك معلوماتك مع:
          </p>
          <ul>
            <li>مقدمي الخدمات الذين يساعدون في تشغيل موقعنا</li>
            <li>Google Workspace لمعالجة بيانات التسجيل</li>
            <li>السلطات القانونية عندما يتطلب القانون ذلك</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>٥. أمان البيانات</h2>
          <p>
            نطبق إجراءات تقنية وتنظيمية مناسبة لحماية بياناتك. ومع ذلك، لا توجد طريقة 
            لنقل البيانات عبر الإنترنت آمنة ١٠٠٪، ولا يمكننا ضمان الأمان المطلق.
          </p>
        </section>

        <section className="legal-section">
          <h2>٦. حقوقك</h2>
          <p>لديك الحق في:</p>
          <ul>
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>طلب تصحيح البيانات غير الدقيقة</li>
            <li>طلب حذف بياناتك</li>
            <li>سحب الموافقة على الاتصالات التسويقية</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>٧. ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            نستخدم ملفات تعريف الارتباط والتقنيات المشابهة لتحسين تجربة التصفح. 
            يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.
          </p>
        </section>

        <section className="legal-section">
          <h2>٨. خصوصية الأطفال</h2>
          <p>
            خدماتنا لا تستهدف الأطفال دون ١٣ سنة بدون موافقة ولي الأمر. 
            نتطلب معلومات ولي الأمر لجميع تسجيلات برامج الأطفال.
          </p>
        </section>

        <section className="legal-section">
          <h2>٩. تغييرات على هذه السياسة</h2>
          <p>
            قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنُعلمك بأي تغييرات 
            بنشر السياسة الجديدة على هذه الصفحة.
          </p>
        </section>

        <section className="legal-section">
          <h2>١٠. اتصل بنا</h2>
          <p>
            إذا كان لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:{" "}
            <a href="mailto:admin@madinatyai.com">admin@madinatyai.com</a>
          </p>
        </section>

        <div className="legal-nav">
          <Link href="/ar" className="btn btn-secondary">
            ← العودة للرئيسية
          </Link>
          <Link href="/ar/terms-of-use" className="btn btn-ghost">
            شروط الاستخدام →
          </Link>
        </div>
      </div>
    </main>
  );
}
