import type { SiteContent, LocaleCode } from "@/types/site";
import { Facebook, Instagram, Twitter, Video, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

// Social URLs from environment variables (fallback to #)
const SOCIAL_URLS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#",
};

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
    case "facebook":
      return <Facebook {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "youtube":
      return <Video {...iconProps} />;
    default:
      return null;
  }
}

/**
 * Enhanced footer with social links, contact info, and better layout.
 */
export function Footer({ content, locale }: FooterProps) {
  const { footer } = content;

  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        {/* Brand & Description */}
        <div className="footer-brand-section">
          <a className="footer-brand" href="#platform" aria-label="Madinaty AI">
            <BrandLogo size="lg" />
          </a>
          <p className="footer-slogan">
            {locale === "ar" ? "الطبقة الذكية لمجتمعات مصر" : "The Smart Layer for Egypt's Communities"}
          </p>
          <p className="footer-copy">{footer.copy}</p>

          {/* Social Links */}
          <div className="footer-social">
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
          <a href={`mailto:${footer.adminEmail}`} className="footer-contact-item">
            <Mail size={16} />
            <span>{footer.adminEmail}</span>
          </a>
          <a
            href={`https://wa.me/${footer.whatsappNumber.replace(/\D/g, "")}`}
            className="footer-contact-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            <span>{footer.whatsappNumber}</span>
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-links-section">
          <h4 className="footer-section-title">
            {locale === "ar" ? "روابط سريعة" : "Quick Links"}
          </h4>
          <div className="footer-links">
            <Link href={locale === "ar" ? "/ar/founders" : "/founders"}>
              {locale === "ar" ? "المؤسسون" : "Founders"}
            </Link>
            <Link href={locale === "ar" ? "/ar/gallery" : "/gallery"}>
              {locale === "ar" ? "المعرض" : "Gallery"}
            </Link>
            <Link href={locale === "ar" ? "/ar/privacy-policy" : "/privacy-policy"}>
              {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href={locale === "ar" ? "/ar/terms-of-use" : "/terms-of-use"}>
              {locale === "ar" ? "شروط الاستخدام" : "Terms of Use"}
            </Link>
            <Link href={locale === "ar" ? "/ar/vision-future" : "/vision-future"}>
              {locale === "ar" ? "خارطة الطريق" : "Roadmap"}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-slogan-bottom">
            {locale === "ar" ? "الطبقة الذكية لمجتمعات مصر" : "The Smart Layer for Egypt's Communities"}
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Madinaty AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
