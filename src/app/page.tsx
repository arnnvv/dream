import { getCurrentSession } from "@/actions";
import { db } from "@/lib/db";
import { treckImages, trecks } from "@/lib/db/schema";
import { getSuperUser } from "@/lib/superuser";
import { redirect } from "next/navigation";
import { JSX } from "react";
import Link from "next/link";

export default async function Home(): Promise<JSX.Element> {
  const { user } = await getCurrentSession();
  if (user?.email === getSuperUser()) return redirect("/superuser");
  if (user?.is_admin === true) return redirect("/admin");

  const allTrecks = await db.select().from(trecks).orderBy(trecks.id);

  const allImages = await db
    .select()
    .from(treckImages)
    .orderBy(treckImages.order);

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
    <div>
      <h1 className="text-2xl font-bold mt-10 mb-4">Trecks</h1>
      {allTrecks.length === 0 ? (
        <p>No trecks found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {allTrecks.map((t) => (
            <li key={t.id}>
              <Link
                href={`/trecks/${t.id}`}
                className="block py-4 hover:bg-gray-100 transition-colors"
              >
                <div className="font-semibold text-xl">{t.title}</div>
                <div className="text-gray-700 mb-2">{t.description}</div>
                <div className="text-sm text-gray-500 mb-4">
                  Created at: {t.createdAt.toLocaleString()}
                </div>
                {imagesByTreckId[t.id]?.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {imagesByTreckId[t.id].map((img, idx) => (
                      <div
                        key={idx}
                        className="w-32 h-32 border border-gray-300 rounded overflow-hidden"
                      >
                        <img
                          src={img.imageUrl}
                          alt={`Treck ${t.title} Image #${img.order}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
