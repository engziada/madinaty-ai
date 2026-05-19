import { ComingSoonPage } from "@/components/ComingSoonPage";

export default async function ComingSoonAr({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  return <ComingSoonPage locale="ar" citySlug={c} />;
}
