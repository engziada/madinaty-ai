import type { LocaleCode } from "@/types/site";

export interface AiToolLink {
  name: string;
  href: string;
  tagline?: string;
  icon?: string;
}

export interface AiToolCategory {
  id: string;
  title: string;
  icon: string;
  accent: "coral" | "blue" | "teal" | "sun" | "mint" | "lilac";
  tools: AiToolLink[];
}

export interface AiToolsSectionCopy {
  overline: string;
  title: string;
  subtitle: string;
  visitLabel: string;
  categories: AiToolCategory[];
}

const common = {
  icons: {
    general: "🧠",
    productivity: "⚡",
    writing: "✍️",
    design: "🎨",
    coding: "💻",
    research: "🔬",
    video: "🎬",
    voice: "🎙️",
    learning: "🎓",
    images: "🖼️"
  }
};

const categoriesEn: AiToolCategory[] = [
  {
    id: "general",
    title: "General Assistants",
    icon: common.icons.general,
    accent: "blue",
    tools: [
      { name: "ChatGPT", href: "https://chat.openai.com", tagline: "OpenAI's conversational AI" },
      { name: "Claude", href: "https://claude.ai", tagline: "Anthropic's helpful assistant" },
      { name: "Gemini", href: "https://gemini.google.com", tagline: "Google's multimodal model" },
      { name: "Copilot", href: "https://copilot.microsoft.com", tagline: "Microsoft 365 integrated AI" },
      { name: "Perplexity", href: "https://www.perplexity.ai", tagline: "AI search with citations" }
    ]
  },
  {
    id: "productivity",
    title: "Productivity",
    icon: common.icons.productivity,
    accent: "teal",
    tools: [
      { name: "Notion AI", href: "https://www.notion.so/product/ai", tagline: "Docs, notes & wiki AI" },
      { name: "Fathom", href: "https://fathom.video", tagline: "Auto meeting notes" },
      { name: "Reclaim", href: "https://reclaim.ai", tagline: "AI calendar scheduling" },
      { name: "Motion", href: "https://usemotion.com", tagline: "AI task prioritization" },
      { name: "Superhuman", href: "https://superhuman.com", tagline: "AI-powered email" }
    ]
  },
  {
    id: "writing",
    title: "Writing",
    icon: common.icons.writing,
    accent: "coral",
    tools: [
      { name: "Grammarly", href: "https://www.grammarly.com", tagline: "Grammar & tone assistant" },
      { name: "Jasper", href: "https://www.jasper.ai", tagline: "Marketing copy at scale" },
      { name: "Copy.ai", href: "https://www.copy.ai", tagline: "Sales & social copy" },
      { name: "QuillBot", href: "https://quillbot.com", tagline: "Paraphrase & summarize" }
    ]
  },
  {
    id: "design",
    title: "Design",
    icon: common.icons.design,
    accent: "lilac",
    tools: [
      { name: "Figma AI", href: "https://www.figma.com/ai/", tagline: "UI design co-pilot" },
      { name: "Canva Magic", href: "https://www.canva.com/magic", tagline: "One-click visuals" },
      { name: "Framer AI", href: "https://www.framer.com/ai", tagline: "AI website builder" },
      { name: "Uizard", href: "https://uizard.io", tagline: "Sketch to app mockup" }
    ]
  },
  {
    id: "images",
    title: "Image Generation",
    icon: common.icons.images,
    accent: "sun",
    tools: [
      { name: "Midjourney", href: "https://www.midjourney.com", tagline: "Artistic image generation" },
      { name: "DALL·E", href: "https://openai.com/dall-e-3", tagline: "OpenAI's image model" },
      { name: "Stable Diffusion", href: "https://stablediffusionweb.com", tagline: "Open-source imagery" },
      { name: "Ideogram", href: "https://ideogram.ai", tagline: "Typography-friendly AI art" },
      { name: "Leonardo", href: "https://leonardo.ai", tagline: "Game & asset generation" }
    ]
  },
  {
    id: "coding",
    title: "Coding",
    icon: common.icons.coding,
    accent: "mint",
    tools: [
      { name: "GitHub Copilot", href: "https://github.com/features/copilot", tagline: "Pair-programmer" },
      { name: "Cursor", href: "https://www.cursor.com", tagline: "AI-native IDE" },
      { name: "Windsurf", href: "https://windsurf.com", tagline: "Agentic code editor" },
      { name: "v0", href: "https://v0.dev", tagline: "UI from prompts" },
      { name: "Bolt", href: "https://bolt.new", tagline: "Full-stack from a prompt" }
    ]
  },
  {
    id: "video",
    title: "Video & Voice",
    icon: common.icons.video,
    accent: "coral",
    tools: [
      { name: "Runway", href: "https://runwayml.com", tagline: "AI video generation" },
      { name: "Synthesia", href: "https://www.synthesia.io", tagline: "AI avatar presenters" },
      { name: "ElevenLabs", href: "https://elevenlabs.io", tagline: "Realistic voice synthesis" },
      { name: "HeyGen", href: "https://www.heygen.com", tagline: "AI video avatars" },
      { name: "Descript", href: "https://www.descript.com", tagline: "Edit video by text" }
    ]
  },
  {
    id: "research",
    title: "Research & Learning",
    icon: common.icons.research,
    accent: "teal",
    tools: [
      { name: "Elicit", href: "https://elicit.com", tagline: "Research paper assistant" },
      { name: "Consensus", href: "https://consensus.app", tagline: "Science-backed answers" },
      { name: "NotebookLM", href: "https://notebooklm.google", tagline: "Notebook with citations" },
      { name: "Khanmigo", href: "https://www.khanmigo.ai", tagline: "AI tutor for students" },
      { name: "Duolingo Max", href: "https://www.duolingo.com", tagline: "AI language tutor" }
    ]
  }
];

const categoriesAr: AiToolCategory[] = categoriesEn.map((cat) => ({ ...cat }));
// Translate titles + taglines for Arabic
const arOverrides: Record<string, { title: string; tools: AiToolLink[] }> = {
  general: {
    title: "مساعدون عامون",
    tools: [
      { name: "ChatGPT", href: "https://chat.openai.com", tagline: "الذكاء الحواري من OpenAI" },
      { name: "Claude", href: "https://claude.ai", tagline: "المساعد المفيد من Anthropic" },
      { name: "Gemini", href: "https://gemini.google.com", tagline: "نموذج Google متعدد الوسائط" },
      { name: "Copilot", href: "https://copilot.microsoft.com", tagline: "ذكاء مدمج مع Microsoft 365" },
      { name: "Perplexity", href: "https://www.perplexity.ai", tagline: "بحث بالذكاء مع مراجع" }
    ]
  },
  productivity: {
    title: "الإنتاجية",
    tools: [
      { name: "Notion AI", href: "https://www.notion.so/product/ai", tagline: "ذكاء في مستنداتك وويكي" },
      { name: "Fathom", href: "https://fathom.video", tagline: "محاضر اجتماعات تلقائية" },
      { name: "Reclaim", href: "https://reclaim.ai", tagline: "جدولة تقويم ذكية" },
      { name: "Motion", href: "https://usemotion.com", tagline: "ترتيب مهام تلقائي" },
      { name: "Superhuman", href: "https://superhuman.com", tagline: "بريد مدعوم بالذكاء" }
    ]
  },
  writing: {
    title: "الكتابة",
    tools: [
      { name: "Grammarly", href: "https://www.grammarly.com", tagline: "مساعد قواعد ونبرة" },
      { name: "Jasper", href: "https://www.jasper.ai", tagline: "كتابة تسويقية بحجم كبير" },
      { name: "Copy.ai", href: "https://www.copy.ai", tagline: "نصوص مبيعات وسوشيال" },
      { name: "QuillBot", href: "https://quillbot.com", tagline: "إعادة صياغة وتلخيص" }
    ]
  },
  design: {
    title: "التصميم",
    tools: [
      { name: "Figma AI", href: "https://www.figma.com/ai/", tagline: "مساعد تصميم واجهات" },
      { name: "Canva Magic", href: "https://www.canva.com/magic", tagline: "تصاميم بنقرة واحدة" },
      { name: "Framer AI", href: "https://www.framer.com/ai", tagline: "بناء مواقع بالذكاء" },
      { name: "Uizard", href: "https://uizard.io", tagline: "تحويل الرسم إلى تطبيق" }
    ]
  },
  images: {
    title: "توليد الصور",
    tools: [
      { name: "Midjourney", href: "https://www.midjourney.com", tagline: "فن بصري فاخر" },
      { name: "DALL·E", href: "https://openai.com/dall-e-3", tagline: "نموذج صور من OpenAI" },
      { name: "Stable Diffusion", href: "https://stablediffusionweb.com", tagline: "توليد صور مفتوح المصدر" },
      { name: "Ideogram", href: "https://ideogram.ai", tagline: "فن بصري للطباعة والخطوط" },
      { name: "Leonardo", href: "https://leonardo.ai", tagline: "أصول ألعاب وتصميم" }
    ]
  },
  coding: {
    title: "البرمجة",
    tools: [
      { name: "GitHub Copilot", href: "https://github.com/features/copilot", tagline: "شريك برمجة" },
      { name: "Cursor", href: "https://www.cursor.com", tagline: "بيئة تطوير بالذكاء" },
      { name: "Windsurf", href: "https://windsurf.com", tagline: "محرر أكواد ذاتي القيادة" },
      { name: "v0", href: "https://v0.dev", tagline: "واجهات من مجرد وصف" },
      { name: "Bolt", href: "https://bolt.new", tagline: "تطبيق كامل من سطر وصف" }
    ]
  },
  video: {
    title: "الفيديو والصوت",
    tools: [
      { name: "Runway", href: "https://runwayml.com", tagline: "توليد فيديو بالذكاء" },
      { name: "Synthesia", href: "https://www.synthesia.io", tagline: "مقدمون افتراضيون" },
      { name: "ElevenLabs", href: "https://elevenlabs.io", tagline: "توليد صوت واقعي" },
      { name: "HeyGen", href: "https://www.heygen.com", tagline: "فيديوهات بأفاتار ذكي" },
      { name: "Descript", href: "https://www.descript.com", tagline: "تحرير الفيديو بالنص" }
    ]
  },
  research: {
    title: "البحث والتعلّم",
    tools: [
      { name: "Elicit", href: "https://elicit.com", tagline: "مساعد أبحاث أكاديمية" },
      { name: "Consensus", href: "https://consensus.app", tagline: "إجابات مدعومة بالعلم" },
      { name: "NotebookLM", href: "https://notebooklm.google", tagline: "دفتر ملاحظات بمراجع" },
      { name: "Khanmigo", href: "https://www.khanmigo.ai", tagline: "معلم افتراضي للطلاب" },
      { name: "Duolingo Max", href: "https://www.duolingo.com", tagline: "معلم لغات بالذكاء" }
    ]
  }
};

for (const cat of categoriesAr) {
  const tr = arOverrides[cat.id];
  if (tr) {
    cat.title = tr.title;
    cat.tools = tr.tools;
  }
}

export function getAiTools(locale: LocaleCode): AiToolsSectionCopy {
  if (locale === "ar") {
    return {
      overline: "أدوات ذكاء اصطناعي",
      title: "مجموعة الأدوات المختارة بعناية",
      subtitle:
        "اكتشف أفضل أدوات الذكاء الاصطناعي — مصنّفة حسب الاستخدام. كل رابط جربناه، وهو آمن للاستكشاف مع أسرتك.",
      visitLabel: "افتح",
      categories: categoriesAr
    };
  }
  return {
    overline: "AI Tools",
    title: "A Curated Toolbox for Every Job",
    subtitle:
      "The best AI tools on the web — grouped by what you want to get done. Every link is vetted and safe to explore with your family.",
    visitLabel: "Open",
    categories: categoriesEn
  };
}
