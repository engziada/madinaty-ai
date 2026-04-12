import type { SiteContent } from "@/types/site";

interface FooterProps {
  content: SiteContent;
}

/**
 * Shared footer for all pages.
 */
export function Footer({ content }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <a className="footer-brand" href="#platform">
            Madinaty.AI
          </a>
          <p>{content.footer.copy}</p>
        </div>
        <div className="footer-links">
          {content.footer.links.map((linkText) => (
            <a key={linkText} href="#">
              {linkText}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
