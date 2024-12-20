import { db } from "@/lib/db";
import { TreckImage, treckImages, trecks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}): Promise<JSX.Element> {
  const params = await props.params;
  const treckId = Number(params.id);

  const [foundTreck] = await db
    .select()
    .from(trecks)
    .where(eq(trecks.id, treckId));

  if (!foundTreck) {
    return redirect("/");
  }

  const images: TreckImage[] = await db
    .select()
    .from(treckImages)
    .where(eq(treckImages.treckId, treckId))
    .orderBy(treckImages.order);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{foundTreck.title}</h1>
      <p className="mb-4">{foundTreck.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Created at: {foundTreck.createdAt.toLocaleString()}
      </p>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="w-32 h-32 border border-gray-300 rounded overflow-hidden"
            >
              <img
                src={img.imageUrl}
                alt={`Treck ${foundTreck.title} Image #${img.order}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
