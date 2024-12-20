import { getCurrentSession } from "@/actions";
import { AddTrecks } from "@/components/AddTrecks";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Admin(): Promise<JSX.Element> {
  const { session, user } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.is_admin !== true) return redirect("/");
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Treck</h1>
      <AddTrecks />
    </div>
  );
}
