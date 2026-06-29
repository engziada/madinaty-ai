import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/data/courseData";
import { CourseTabsPage } from "@/components/course/CourseTabsPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "غير موجود | Madinaty AI" };

  return {
    title: `${course.titleAr} | Madinaty AI`,
    description: course.descriptionAr,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  return <CourseTabsPage course={course} locale="ar" />;
}
