import { getCurrentSession } from "@/actions";
import { HomePage } from "@/components/HomePage";
import { allTestimonials, allTrecks, imagesByTreckId } from "@/lib/db/queries";
import { getSuperUser } from "@/lib/superuser";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const { user } = await getCurrentSession();
  if (user?.email === getSuperUser()) return redirect("/superuser");
  if (user?.is_admin === true) return redirect("/admin");

  return (
    <HomePage
      treks={allTrecks}
      imagesByTrekId={imagesByTreckId}
      testimonials={allTestimonials}
    />
  );
}
