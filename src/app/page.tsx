import { redirect } from "next/navigation";

/**
 * Root route — Arabic is the default landing language.
 * Visitors who want the English interface can navigate to /en.
 */
export default function RootPage(): never {
  redirect("/ar");
}
