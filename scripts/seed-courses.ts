import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || "");

const contentEn = `[🚀 **AI Pilot Day: From User to Leader** 9-hour practical boot camp for managers to double productivity using AI.](https://khemet.ai/ai-pilot-day)

[🎮 **From Gamer to Creator: Kids Coding Lab** 6-Week masterclass for young innovators to build their own games.](https://khemet.ai/kids-coding)

[🐍 **Code the Future: Python & AI for Kids** 24 hours of expert training from logic to Artificial Intelligence.](https://khemet.ai/python-kids)

[🤖 **Level Up: Become a Robot Master!** 24 hours of training. Build circuits, code brains, and make robots.](https://khemet.ai/robot-master)
`;

const contentAr = `[🚀 **AI Pilot Day: من مستخدم إلى قائد** يوم عملي مكثف للمديرين والتنفيذيين لمضاعفة الإنتاجية باستخدام الذكاء الاصطناعي.](https://khemet.ai/ai-pilot-day)

[🎮 **From Gamer to Creator: Kids Coding Lab** 6 أسابيع من التدريب للمبتكرين الصغار لبرمجة ألعابهم الخاصة.](https://khemet.ai/kids-coding)

[🐍 **Code the Future: Python & AI for Kids** 24 ساعة من التدريب الاحترافي، من أساسيات المنطق إلى الذكاء الاصطناعي.](https://khemet.ai/python-kids)

[🤖 **Level Up: Become a Robot Master!** 24 ساعة للتدريب على الدوائر الكهربائية، وبرمجة العقول، وبناء الروبوتات.](https://khemet.ai/robot-master)
`;

async function seed() {
  console.log("Updating database...");
  await sql`
    INSERT INTO platform_activities (id, locale, content, updated_at) 
    VALUES ('hero-en', 'en', ${contentEn}, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
  `;
  
  await sql`
    INSERT INTO platform_activities (id, locale, content, updated_at) 
    VALUES ('hero-ar', 'ar', ${contentAr}, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
  `;
  console.log("Done!");
}

seed().catch(console.error);
