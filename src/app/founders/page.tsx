import type { Metadata } from "next";
import Link from "next/link";
import { FounderCard3D } from "@/components/FounderCard3D";
import { ArrowLeft, Sparkles, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Founders | Madinaty AI",
  description: "Meet the visionaries behind Madinaty AI — the community building Egypt's smartest city layer.",
};

/**
 * Founder roster. Portrait URLs use randomuser.me — a free, stable CDN that
 * serves photo-realistic headshots organized by gender (`/men/{n}.jpg` or
 * `/women/{n}.jpg`, 0-99). We pin specific indices so reloads never swap
 * faces, and the gender of each URL matches the founder's name.
 *
 * When real team photos are ready, replace each `image` with the local asset.
 */
const PORTRAIT_BASE = "https://randomuser.me/api/portraits";
const m = (n: number) => `${PORTRAIT_BASE}/men/${n}.jpg`;
const w = (n: number) => `${PORTRAIT_BASE}/women/${n}.jpg`;

const founders = [
  {
    name: "Dr. Karim El-Masry",
    role: "Chief Visionary Officer",
    bio: "AI researcher with 15+ years in smart city infrastructure. Formerly at MIT Media Lab, now dedicated to bringing intelligent systems to Egyptian communities.",
    image: m(32),
    emoji: "🧠",
  },
  {
    name: "Laila Hassan",
    role: "Community Director",
    bio: "Social entrepreneur passionate about bridging technology and community. Built engagement frameworks for 500K+ residents across New Cairo compounds.",
    image: w(44),
    emoji: "🌟",
  },
  {
    name: "Omar Farouk",
    role: "Head of Engineering",
    bio: "Full-stack architect specializing in real-time systems. Ex-Uber, ex-Careem. Now optimizing city-scale AI deployments for local contexts.",
    image: m(75),
    emoji: "⚡",
  },
  {
    name: "Nour Ahmad",
    role: "Education Lead",
    bio: "Former Google for Education strategist. Designing AI literacy programs for kids and adults across Madinaty's 23 districts.",
    image: w(68),
    emoji: "🎓",
  },
  {
    name: "Youssef Khaled",
    role: "Product Architect",
    bio: "UX visionary obsessed with human-centered design. Previously shaped products at Y Combinator startups, now crafting the city's digital twin.",
    image: m(11),
    emoji: "🎯",
  },
  {
    name: "Mariam Tarek",
    role: "Partnerships Lead",
    bio: "Built strategic alliances across MENA tech ecosystem. Connecting Madinaty AI with investors, government, and innovation partners.",
    image: w(21),
    emoji: "🤝",
  },
  {
    name: "Ahmed Samir",
    role: "AI Research Lead",
    bio: "PhD in Machine Learning from AUC. Leading the development of local-first LLMs that understand Egyptian Arabic dialects.",
    image: m(52),
    emoji: "🔬",
  },
  {
    name: "Sara Mahmoud",
    role: "Operations Director",
    bio: "Scaled logistics platforms across 6 countries. Now orchestrating the complex symphony of services in a 700K+ resident city.",
    image: w(8),
    emoji: "📊",
  },
  {
    name: "Hassan Ibrahim",
    role: "Security Architect",
    bio: "Cybersecurity veteran from banking sector. Ensuring resident data privacy and platform security for mission-critical city infrastructure.",
    image: m(89),
    emoji: "🔒",
  },
  {
    name: "Rania Mostafa",
    role: "Creative Director",
    bio: "Award-winning digital artist and brand strategist. Crafting the visual identity of Egypt's first community-powered AI platform.",
    image: w(35),
    emoji: "🎨",
  },
];

export default function FoundersPage() {
  return (
    <main className="founders-page">
      {/* Hero Section */}
      <section className="founders-hero">
        <h1 className="founders-hero-title">The Architects of Tomorrow</h1>
        <p className="founders-hero-subtitle">
          A collective of visionaries, engineers, and community builders creating 
          the intelligence layer for Egypt&apos;s smartest city.
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
            <h3 className="vmv-title">Our Vision</h3>
            <p className="vmv-text">
              To transform Madinaty into the blueprint for intelligent urban living across 
              Egypt and the Arab world — where technology serves humanity, not the other way around.
            </p>
          </div>

          <div className="vmv-card">
            <div className="vmv-icon">
              <Target size={28} color="#fff" />
            </div>
            <h3 className="vmv-title">Our Mission</h3>
            <p className="vmv-text">
              Build community-first AI tools that enhance daily life: safer neighborhoods, 
              smarter commutes, better education, and stronger connections between neighbors.
            </p>
          </div>

          <div className="vmv-card">
            <div className="vmv-icon">
              <Heart size={28} color="#fff" />
            </div>
            <h3 className="vmv-title">Our Values</h3>
            <p className="vmv-text">
              Privacy by design. Open source principles. Zero-knowledge architecture. 
              Local-first computing. And above all — the belief that AI should empower, not replace.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="container" style={{ padding: "2rem 1rem", textAlign: "center" }}>
        <Link href="/" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
