import { redirect } from "next/navigation";

/**
 * Hidden: coming-soon page now redirects to the Arabic home.
 * Keep file intact so route can be restored later if needed.
 */
export default function ComingSoonAr(): never {
  redirect("/ar");
}
