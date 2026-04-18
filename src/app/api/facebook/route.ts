import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface FacebookPost {
  id: string;
  icon: string;
  text: string;
  meta: string;
}

/**
 * GET /api/facebook
 * 
 * Best practice for scraping Facebook public pages is using a managed service
 * like Apify (e.g. `apify/instagram-facebook-scraper`) or RapidAPI because 
 * Facebook aggressively blocks headless browsers and IPs on services like Vercel.
 * 
 * Since an API key is required for such services, we return a fallback mock feed
 * of realistic MadinatyCommunity-style posts. 
 * 
 * Replace this mock data with an external fetch call when you have an Apify scraper token.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "ar" ? "ar" : "en";

  const postsEn: FacebookPost[] = [
    {
      id: "fb-1",
      icon: "📢",
      text: "The annual Madinaty marathon has been successfully concluded! Thanks to all the 2000+ residents who participated.",
      meta: "2 hours ago · @MadinatyOfficial",
    },
    {
      id: "fb-2",
      icon: "🌿",
      text: "Spring is here! Enjoy the newly opened botanical garden in District 12. Open daily until sunset.",
      meta: "5 hours ago · @MadinatyOfficial",
    },
    {
      id: "fb-3",
      icon: "🚦",
      text: "Traffic Update: Maintenance works on the Southern Ring Road are completed. Traffic flow is back to normal.",
      meta: "1 day ago · @MadinatyOfficial",
    },
  ];

  const postsAr: FacebookPost[] = [
    {
      id: "fb-1",
      icon: "📢",
      text: "اختتام ماراثون مدينتي السنوي بنجاح! شكرًا لأكثر من 2000 ساكن شاركوا في هذا الحدث الرائع.",
      meta: "منذ ساعتين · @MadinatyOfficial",
    },
    {
      id: "fb-2",
      icon: "🌿",
      text: "الربيع وصل! استمتعوا بالحديقة النباتية المفتوحة حديثًا في الحي الثاني عشر. مفتوحة يوميًا حتى الغروب.",
      meta: "منذ 5 ساعات · @MadinatyOfficial",
    },
    {
      id: "fb-3",
      icon: "🚦",
      text: "تحديث مروري: تم الانتهاء من أعمال الصيانة على الطريق الدائري الجنوبي وعادت حركة المرور إلى طبيعتها.",
      meta: "منذ يوم واحد · @MadinatyOfficial",
    },
  ];

  const payload = locale === "ar" ? postsAr : postsEn;

  return NextResponse.json({ posts: payload }, { headers: { "Cache-Control": "no-store" } });
}
