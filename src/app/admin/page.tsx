import { createTestimonial, createTreck, getCurrentSession } from "@/actions";
import { ExistingTestimonials } from "@/components/ExistingTestimonials";
import { ExistingTrecks } from "@/components/ExistingTrecks";
import { FormComponent } from "@/components/FormComponent";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Admin(): Promise<JSX.Element> {
  const { session, user } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.is_admin !== true) return redirect("/");

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

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
              <label htmlFor="price" className="block font-semibold mb-1">
                Price:
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="any"
                min="0"
                required
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Dates */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Dates (Add one or more):
              </label>
              <input
                name="dates"
                type="date"
                className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                required
              />
              <input
                name="dates"
                type="date"
                className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
              />
              {/* Add more date fields as needed */}
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

        <ExistingTrecks />
        <ExistingTestimonials />
      </div>
    </>
  );
}
