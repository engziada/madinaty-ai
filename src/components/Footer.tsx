import type { SiteContent, LocaleCode } from "@/types/site";
import { Facebook, Instagram, Twitter, Video, Mail, MessageCircle } from "lucide-react";

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
          <a className="footer-brand" href="#platform">
            Madinaty.AI
          </a>
          <p className="footer-copy">{footer.copy}</p>

          {/* Social Links */}
          <div className="footer-social">
            {footer.socialLinks.map((link) => (
              <a
                key={link.icon}
                href={link.url}
                className="footer-social-link"
                aria-label={link.label}
                title={link.label}
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
            {footer.links.map((linkText) => (
              <a key={linkText} href="#">
                {linkText}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p>
            {locale === "ar"
              ? "نادي مدينتي للذكاء الاصطناعي - تعليم آمن للأطفال"
              : "Madinaty AI Club - Safe AI Education for Kids"}
          </p>
        </div>
      </div>
    </footer>
  );
}
