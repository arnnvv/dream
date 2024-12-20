import { createTreck, getCurrentSession } from "@/actions";
import { FormComponent } from "@/components/FormComponent";
import { db } from "@/lib/db";
import { treckImages, trecks } from "@/lib/db/schema";
import Image from "next/image";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Admin(): Promise<JSX.Element> {
  const { session, user } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.is_admin !== true) return redirect("/");
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Treck</h1>
      <FormComponent action={createTreck}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="border border-gray-300 rounded px-2 py-1 w-full h-24"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Images (Paste image URLs):
          </label>
          <input
            name="images"
            type="text"
            placeholder="Image URL #1"
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          />
          <input
            name="images"
            type="text"
            placeholder="Image URL #2"
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          />
          <input
            name="images"
            type="text"
            placeholder="Image URL #3"
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Treck
        </button>
      </FormComponent>

      <h2 className="text-2xl font-bold mt-10 mb-4">Existing Trecks</h2>
      {allTrecks.length === 0 ? (
        <p>No trecks found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {allTrecks.map((t) => (
            <li key={t.id} className="py-4">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
