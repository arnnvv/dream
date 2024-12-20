import { createTreck, getCurrentSession, createTestimonial } from "@/actions";
import { FormComponent } from "@/components/FormComponent";
import { db } from "@/lib/db";
import { treckImages, trecks, testimonials } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Admin(): Promise<JSX.Element> {
  const { session, user } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.is_admin !== true) return redirect("/");

  const allTrecks = await db.select().from(trecks).orderBy(trecks.id);
  const allTestimonials = await db
    .select()
    .from(testimonials)
    .orderBy(testimonials.id);

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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Treck Form Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Add New Treck</h2>
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
      </section>

      {/* Testimonial Form Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Add New Testimonial</h2>
        <FormComponent action={createTestimonial}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-1">
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="heading" className="block font-semibold mb-1">
              Heading/Title:
            </label>
            <input
              id="heading"
              name="heading"
              type="text"
              required
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block font-semibold mb-1">
              Review:
            </label>
            <textarea
              id="review"
              name="review"
              required
              className="border border-gray-300 rounded px-2 py-1 w-full h-24"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-semibold mb-1">
              Profile Image URL:
            </label>
            <input
              id="image"
              name="image"
              type="text"
              required
              placeholder="https://example.com/profile-image.jpg"
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Testimonial
          </button>
        </FormComponent>
      </section>

      {/* Existing Trecks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Existing Trecks</h2>
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
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Existing Testimonials</h2>
        {allTestimonials.length === 0 ? (
          <p>No testimonials found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {allTestimonials.map((testimonial) => (
              <li key={testimonial.id} className="py-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.heading}</div>
                  </div>
                </div>
                <div className="text-gray-700">{testimonial.review}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
