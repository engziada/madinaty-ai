import type { Metadata } from "next";
import { ErpLandingPage } from "@/components/erp/ErpLandingPage";

export const metadata: Metadata = {
  title: "نظام AZHA ERP الذكي | Madinaty AI",
  description: "نظام AZHA ERP متكامل لإدارة أعمالك في منصة سحابية واحدة.",
};

export default function Page() {
  return <ErpLandingPage locale="ar" />;
}
