import { getCurrentSession } from "@/actions";
import { db } from "@/lib/db";
import { treckImages, trecks } from "@/lib/db/schema";
import { getSuperUser } from "@/lib/superuser";
import { redirect } from "next/navigation";
import { JSX } from "react";
import Link from "next/link";
import { Reviews } from "@/components/Reviews";

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
      <Reviews items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
