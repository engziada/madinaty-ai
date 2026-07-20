import type { Metadata } from "next";
import { ErpLandingPage } from "@/components/erp/ErpLandingPage";

export const metadata: Metadata = {
  title: "AZHA ERP System | Madinaty AI",
  description: "Integrated AZHA ERP to manage your business on a single cloud platform.",
};

export default function Page() {
  return <ErpLandingPage locale="en" />;
}
