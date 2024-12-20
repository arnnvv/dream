import { getCurrentSession } from "@/actions";
import { getSuperUser } from "@/lib/superuser";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const { session, user } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.email === getSuperUser()) return redirect("/superuser");
  if (user.is_admin === true) return redirect("/admin");
  return <>HI</>;
}
