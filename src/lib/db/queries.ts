import "server-only";

import { db } from ".";
import { testimonials, treckImages, trecks } from "./schema";

export const allTrecks = await db.select().from(trecks).orderBy(trecks.id);

export const allTestimonials = await db
  .select()
  .from(testimonials)
  .orderBy(testimonials.id);

export const allImages = await db
  .select()
  .from(treckImages)
  .orderBy(treckImages.order);

export const imagesByTreckId: Record<
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
