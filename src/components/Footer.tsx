import type { SiteContent, LocaleCode } from "@/types/site";
import { Facebook, Instagram, Twitter, Video, Mail, MessageCircle, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Hard-coded real social URLs (data/content.ts is the source of truth;
// env-vars can still override per-environment).
const SOCIAL_URLS: Record<string, string> = {
  facebook:  process.env.NEXT_PUBLIC_FACEBOOK_URL  || "https://www.facebook.com/profile.php?id=61587705874177",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/invites/contact/?igsh=1j16tus21g2ro&utm_content=d24zbtm",
  twitter:   process.env.NEXT_PUBLIC_TWITTER_URL   || "https://x.com/MadinatyAI",
  youtube:   process.env.NEXT_PUBLIC_YOUTUBE_URL   || "https://www.youtube.com/",
  linkedin:  process.env.NEXT_PUBLIC_LINKEDIN_URL  || "https://www.linkedin.com/company/112226033/",
};

const WHATSAPP_NUMBER = "+201026655008";
const ADMIN_EMAIL     = "engziada@gmail.com";

interface FooterProps {
  content: SiteContent;
  locale: LocaleCode;
}

/**
 * Social icon component based on icon name
 */
function SocialIcon({ name }: { name: string }) {
  const iconProps = { size: 18, strokeWidth: 1.5 };
  switch (name) {
    case "facebook":  return <Facebook  {...iconProps} />;
    case "instagram": return <Instagram {...iconProps} />;
    case "twitter":   return <Twitter   {...iconProps} />;
    case "youtube":   return <Video     {...iconProps} />;
    case "linkedin":  return <Linkedin  {...iconProps} />;
    default:          return null;
  }
}

/**
 * Enhanced footer with real social links, logo, contact info, and
 * theme-aware WhatsApp logo button.
 */
export function Footer({ content, locale }: FooterProps) {
  const { footer } = content;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        {/* Brand & Description */}
        <div className="footer-brand-section footer-brand-section--centered">
          <p className="footer-slogan footer-slogan--large">
            {locale === "ar" ? "البُعد الذكي لمجتمعات مصر" : "The Smart Layer for Egypt's Communities"}
          </p>

          {/* Social Links */}
          <div className="footer-social footer-social--centered">
            {footer.socialLinks.map((link) => (
              <a
                key={link.icon}
                href={SOCIAL_URLS[link.icon as keyof typeof SOCIAL_URLS] || link.url}
                className="footer-social-link"
                aria-label={link.label}
                title={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name={link.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4 className="footer-section-title">
            {locale === "ar" ? "تواصل معنا" : "Contact Us"}
          </h4>
          <a href={`tel:${WHATSAPP_NUMBER}`} className="footer-contact-item">
            <MessageCircle size={16} />
            <span>{WHATSAPP_NUMBER}</span>
          </a>
          <a href={`mailto:${ADMIN_EMAIL}`} className="footer-contact-item">
            <Mail size={16} />
            <span>{ADMIN_EMAIL}</span>
          </a>
          <a
            href={whatsappHref}
            className="footer-contact-item footer-wa-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.522 5.86L0 24l6.296-1.498A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.502-5.204-1.381l-.373-.22-3.739.89.942-3.639-.242-.384A9.943 9.943 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            <span>{locale === "ar" ? "واتساب" : "WhatsApp"}</span>
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-links-section">
          <h4 className="footer-section-title">
            {locale === "ar" ? "روابط سريعة" : "Quick Links"}
          </h4>
          <div className="footer-links">
            <Link href={locale === "ar" ? "/ar/founders"       : "/founders"}>
              {locale === "ar" ? "المؤسسون" : "Founders"}
            </Link>
            <Link href={locale === "ar" ? "/ar/gallery"        : "/gallery"}>
              {locale === "ar" ? "المعرض" : "Gallery"}
            </Link>
            <Link href={locale === "ar" ? "/ar/privacy-policy" : "/privacy-policy"}>
              {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href={locale === "ar" ? "/ar/terms-of-use"   : "/terms-of-use"}>
              {locale === "ar" ? "شروط الاستخدام" : "Terms of Use"}
            </Link>
            <Link href={locale === "ar" ? "/ar/vision-future"  : "/vision-future"}>
              {locale === "ar" ? "خارطة الطريق" : "Roadmap"}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          {/* Minimal footer bottom without ZSolutions logo */}
          <div className="footer-bottom-spacer" />

          <p className="footer-copyright">
            © {new Date().getFullYear()} ZSolutions. {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
