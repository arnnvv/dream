import { getCurrentSession } from "@/actions";
import { db } from "@/lib/db";
import { trecks } from "@/lib/db/schema";
import { getSuperUser } from "@/lib/superuser";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const { session, user } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.email === getSuperUser()) return redirect("/superuser");
  if (user.is_admin === true) return redirect("/admin");
  const allTrecks = await db.select().from(trecks).orderBy(trecks.id);

  return (
    <div>
      <h1>Trecks</h1>
      <ul>
        {allTrecks.map((t) => (
          <li key={t.id}>
            <div>
              <strong>{t.title}</strong> - {t.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
