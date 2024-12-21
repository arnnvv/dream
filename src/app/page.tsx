import { getCurrentSession } from "@/actions";
import HomePage from "@/components/HomePage";
import { db } from "@/lib/db";
import {
  Testimonial,
  testimonials,
  treckImages,
  trecks,
} from "@/lib/db/schema";
import { getSuperUser } from "@/lib/superuser";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const { user } = await getCurrentSession();
  if (user?.email === getSuperUser()) return redirect("/superuser");
  if (user?.is_admin === true) return redirect("/admin");

  const allTrecks = await db.select().from(trecks).orderBy(trecks.id);
  const allImages = await db
    .select()
    .from(treckImages)
    .orderBy(treckImages.order);
  const allTestimonials: Testimonial[] = await db.select().from(testimonials);

  const imagesByTreckId: Record<
    number,
    { imageUrl: string; order: number | null }[]
  > = {};
  for (const img of allImages) {
    if (!imagesByTreckId[img.treckId]) {
      imagesByTreckId[img.treckId] = [];
    }
    imagesByTreckId[img.treckId].push({
      imageUrl: img.imageUrl,
      order: img.order,
    });
  }

  return (
    <HomePage
      treks={allTrecks}
      imagesByTrekId={imagesByTreckId}
      testimonials={allTestimonials}
    />
  );
}
