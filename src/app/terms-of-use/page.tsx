import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Madinaty AI",
  description: "Terms of Use for Madinaty AI - rules and guidelines for using our platform.",
};

export default function TermsOfUsePage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <h1 className="legal-title">Terms of Use</h1>
        <p className="legal-updated">Last Updated: April 2026</p>

        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Madinaty AI website and services, you agree to be bound by 
            these Terms of Use. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            Madinaty AI provides a community platform for residents of Madinaty and other 
            Egyptian communities, including AI-powered tools, educational programs, event 
            registration, and community services. Some features are currently in beta or 
            coming soon.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. User Conduct</h2>
          <p>When using our platform, you agree not to:</p>
          <ul>
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Post or transmit harmful, threatening, or offensive content</li>
            <li>Impersonate any person or entity</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use automated systems to access or scrape our content</li>
            <li>Interfere with other users&apos; enjoyment of the service</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Account Registration</h2>
          <p>
            Some features require registration. You agree to provide accurate information and 
            keep it updated. You are responsible for maintaining the confidentiality of your 
            account credentials and for all activities under your account.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the 
            property of Madinaty AI or its licensors and is protected by intellectual property laws. 
            You may not reproduce, distribute, or create derivative works without our permission.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Third-Party Services</h2>
          <p>
            Our platform may integrate with third-party services (Google, WhatsApp, etc.). 
            Your use of these services is subject to their respective terms and policies. We are 
            not responsible for third-party content or services.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            OUR SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
            OR IMPLIED. WE DO NOT GUARANTEE THAT OUR SERVICES WILL BE UNINTERRUPTED, SECURE, 
            OR ERROR-FREE.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MADINATY AI SHALL NOT BE LIABLE FOR ANY 
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR 
            USE OF OUR SERVICES.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Community Services Disclaimer</h2>
          <p>
            <strong>Important:</strong> Madinaty AI is a community initiative. Services such as 
            the Rental Portal, Trusted Services Directory, and Ghost Kitchen Incubator are 
            platforms connecting community members. We do not:
          </p>
          <ul>
            <li>Verify the identity or qualifications of all service providers</li>
            <li>Guarantee the quality of services exchanged between users</li>
            <li>Provide legal or financial intermediary services</li>
            <li>Assume liability for transactions between users</li>
          </ul>
          <p>
            Users are responsible for their own due diligence and legal compliance when using 
            community marketplace features.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective 
            immediately upon posting. Continued use of our services constitutes acceptance of 
            the modified terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Governing Law</h2>
          <p>
            These terms shall be governed by the laws of the Arab Republic of Egypt. 
            Any disputes shall be resolved in the courts of Cairo.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Contact Information</h2>
          <p>
            For questions about these Terms of Use, please contact us at:{" "}
            <a href="mailto:admin@madinatyai.com">admin@madinatyai.com</a>
          </p>
        </section>

        <div className="legal-nav">
          <Link href="/privacy-policy" className="btn btn-ghost">
            ← Privacy Policy
          </Link>
          <Link href="/" className="btn btn-secondary">
            Back to Home →
          </Link>
        </div>
      </div>
    </main>
  );
}
