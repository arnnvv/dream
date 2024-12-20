import { db } from "@/lib/db";
import { trecks } from "@/lib/db/schema";
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

  console.error(treckId);
  return <></>;
}
