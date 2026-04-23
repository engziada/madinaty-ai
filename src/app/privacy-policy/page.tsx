import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Madinaty AI",
  description: "Privacy Policy for Madinaty AI - how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last Updated: April 2026</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Madinaty AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our website and services. Please read this policy carefully.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and WhatsApp number when you register for events or contact us.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
            <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers.</li>
            <li><strong>Location Data:</strong> General location information based on your IP address.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process event registrations and enrollment for AI workshops</li>
            <li>Communicate with you about our services and events</li>
            <li>Improve our website and user experience</li>
            <li>Send newsletters and community updates (with your consent)</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in operating our website</li>
            <li>Google Workspace for enrollment data processing</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data. 
            However, no method of transmission over the internet is 100% secure, and we cannot 
            guarantee absolute security.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience. 
            You can control cookies through your browser settings.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to children under 13 without parental consent. 
            We require guardian information for all children&apos;s program registrations.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new policy on this page.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:admin@madinatyai.com">admin@madinatyai.com</a>
          </p>
        </section>

        <div className="legal-nav">
          <Link href="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
          <Link href="/terms-of-use" className="btn btn-ghost">
            Terms of Use →
          </Link>
        </div>
      </div>
    </main>
  );
}
