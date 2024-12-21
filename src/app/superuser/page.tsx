import { addAdminAction, getCurrentSession, removeAdmin } from "@/actions";
import { FormComponent } from "@/components/FormComponent";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { User, users } from "@/lib/db/schema";
import { getSuperUser } from "@/lib/superuser";
import { eq } from "drizzle-orm";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function SuperPage(): Promise<JSX.Element> {
  const { user, session } = await getCurrentSession();
  if (session === null) return redirect("/login");
  if (user.email !== getSuperUser()) return redirect("/");

  const admins: User[] = await db
    .select()
    .from(users)
    .where(eq(users.is_admin, true));

  return (
    <>
      <Navbar />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Manage Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <FormComponent action={addAdminAction}>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="flex-1"
            />
            <Button type="submit">Add Admin</Button>
          </FormComponent>
          <div className="space-y-2">
            {admins.map((admin: User) => (
              <div
                key={admin.email}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{admin.name}</div>
                  <div className="text-sm text-gray-500">{admin.email}</div>
                </div>
                <FormComponent action={removeAdmin}>
                  <input type="hidden" name="email" value={admin.email} />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="submit"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </FormComponent>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
