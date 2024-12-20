import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { allTestimonials } from "@/lib/db/queries";
import Image from "next/image";

export const ExistingTestimonials = async (): Promise<JSX.Element> => (
  <section className="mt-12">
    <h2 className="text-2xl font-bold mb-4">Existing Testimonials</h2>
    {allTestimonials.length === 0 ? (
      <p>No testimonials found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allTestimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-gray-600">{testimonial.heading}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{testimonial.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </section>
);
