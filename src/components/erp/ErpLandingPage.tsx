"use client";

import Image from "next/image";
import Link from "next/link";
import { type LocaleCode } from "@/types/site";

interface ErpLandingPageProps {
  locale: LocaleCode;
}

export function ErpLandingPage({ locale }: ErpLandingPageProps) {
  const isAr = locale === "ar";

  const content = {
    title: isAr ? "نظام إدارة الأعمال (AZHA ERP)" : "AZHA ERP System",
    subtitle: isAr
      ? "نظام AZHA ERP متكامل وموثوق لإدارة أعمالك ونشاطك التجاري في منصة سحابية واحدة. سريع، سهل الاستخدام، ويوفر تقارير دقيقة لحظة بلحظة."
      : "A reliable, integrated AZHA ERP to manage your business on a single cloud platform. Fast, easy to use, and provides accurate real-time reports.",
    featuresTitle: isAr ? "كل ما تحتاجه لإدارة تجارتك بسهولة واحترافية" : "Everything you need to manage your business professionally",
    features: [
      { icon: "🛒", title: isAr ? "مبيعات وعملاء" : "Sales & Customers", desc: isAr ? "إدارة كاملة للمبيعات وبيانات العملاء." : "Complete sales and customer data management." },
      { icon: "📦", title: isAr ? "مشتريات وموردين" : "Purchases & Suppliers", desc: isAr ? "تنظيم مشترياتك وحسابات الموردين." : "Organize your purchases and supplier accounts." },
      { icon: "🏪", title: isAr ? "إدارة المخازن" : "Inventory Management", desc: isAr ? "جرد ومتابعة المخزون في جميع الفروع." : "Inventory tracking across all branches." },
      { icon: "💰", title: isAr ? "خزينة ومصروفات" : "Cash & Expenses", desc: isAr ? "مراقبة دقيقة للإيرادات والمصروفات." : "Precise monitoring of revenues and expenses." },
      { icon: "💳", title: isAr ? "بنوك وشيكات" : "Banks & Checks", desc: isAr ? "متابعة الحسابات البنكية والشيكات." : "Track bank accounts and checks." },
      { icon: "📊", title: isAr ? "حسابات ختامية" : "Final Accounts", desc: isAr ? "تقارير دقيقة لمعرفة الأرباح والخسائر." : "Accurate reports for profit and loss." },
      { icon: "🍽️", title: isAr ? "إدارة المطاعم" : "Restaurant Management", desc: isAr ? "حل متكامل لإدارة المطاعم، المنيو، والطاولات." : "Complete solution for restaurants, menus, and tables." },
      { icon: "🌐", title: isAr ? "متجر إلكتروني" : "E-commerce Integration", desc: isAr ? "ربط مع WooCommerce لتفعيل متجرك الإلكتروني." : "WooCommerce integration to launch your online store." },
    ],
    galleryTitle: isAr ? "نظرة داخل النظام" : "Inside the System",
    images: [
      { src: "/images/erp/624737040_1203130988641815_228917961878526788_n.jpg", alt: "لوحة التحكم الرئيسية (Dashboard)" },
      { src: "/images/erp/625337690_1203130965308484_9155184162974934277_n.jpg", alt: "قائمة المنتجات" },
      { src: "/images/erp/623868641_1203131058641808_6209954021025352297_n.jpg", alt: "عمليات جرد المخازن" },
      { src: "/images/erp/626727440_1203131025308478_6139536886225475632_n.jpg", alt: "جرد الفرع الرئيسي" },
    ],
    ctaTitle: isAr ? "ابدأ تجربتك الآن مع منصة إدارة أعمال متكاملة" : "Start your experience now with an integrated platform",
    ctaSubtitle: isAr
      ? "سرّع نمو أعمالك وحقق تواجدك الرقمي فورًا — متجرك الإلكتروني جاهز خلال أسبوع، وصفحة الهبوط خلال ٤٨ ساعة."
      : "Accelerate your business growth and achieve digital presence instantly — e-commerce ready in a week, landing page in 48 hours.",
    promo: isAr ? "🎁 صفحة الهبوط مجانية لأول ١٠ عملاء! عرض محدود" : "🎁 Free landing page for the first 10 customers! Limited time.",
    contactText: isAr
      ? "تواصل معنا الآن للإستفسارات والحجز عبر واتساب على +201026655008"
      : "Contact us now for inquiries and booking via WhatsApp at +201026655008",
    whatsappNum: "201026655008",
    demoBtnText: isAr ? "شاهد النسخة التجريبية (Demo)" : "View Live Demo",
    demoUrl: "https://smart.azhasoft.com/login_demo",
    marketingPoster: "/images/erp/erp.png"
  };

  return (
    <main id="main-content" tabIndex={-1} className="section" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-head center reveal" style={{ marginTop: '4rem' }}>
          <p className="overline">AZHA ERP SYSTEM</p>
          <h2>{content.title}</h2>
          <p style={{ maxWidth: '700px', margin: '1rem auto', color: 'var(--text-muted)' }}>
            {content.subtitle}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={content.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {content.demoBtnText}
            </a>
            <a
              href={`https://wa.me/${content.whatsappNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {isAr ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
            </a>
          </div>
        </div>

        {/* Poster Image */}
        <div className="reveal" style={{ marginTop: '4rem', marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <img
              src={content.marketingPoster}
              alt="AZHA Soft ERP"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="section-head center reveal">
          <h2>{content.featuresTitle}</h2>
        </div>
        <div className="service-bento reveal" style={{ margin: '3rem 0', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {content.features.map((feature, idx) => (
            <div key={idx} className="svc-card svc-normal">
              <div className="svc-header" style={{ marginBottom: '1rem' }}>
                <span className="svc-icon" aria-hidden="true" style={{ fontSize: '2rem' }}>{feature.icon}</span>
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>{feature.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="section-head center reveal" style={{ marginTop: '5rem' }}>
          <h2>{content.galleryTitle}</h2>
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {content.images.map((img, idx) => (
            <div key={idx} style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <img src={img.src} alt={img.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text)' }}>
                {img.alt}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="platform-horizontal reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6rem', background: 'var(--surface)', padding: '4rem 2rem', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
          <h3>{content.ctaTitle}</h3>
          <p style={{ maxWidth: '600px', marginTop: '1rem' }}>{content.ctaSubtitle}</p>
          <div style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: 'var(--gold-dim)', color: 'var(--sun)', borderRadius: '100px', fontWeight: 600 }}>
            {content.promo}
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>{content.contactText}</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={`https://wa.me/${content.whatsappNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {isAr ? "احجز نسختك الآن" : "Book Your Copy Now"}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
