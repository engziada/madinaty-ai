import { cookies } from "next/headers";
import { AdminHeroClient } from "./AdminHeroClient";

export const metadata = {
  title: "Admin - Hero Panel Editor",
};

export default async function AdminHeroPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const isAuthenticated = sessionToken === "authenticated";

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Hero Panel Editor</h1>
      <p style={{ marginBottom: "20px" }}>Edit the recent activities shown on the Landing Page.</p>
      
      <AdminHeroClient initialAuthenticated={isAuthenticated} />
    </div>
  );
}
