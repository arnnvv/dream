import { getCurrentSession } from "@/actions";
import { LoginComp } from "@/components/LoginComp";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function LoginPage(): Promise<JSX.Element> {
  const { session } = await getCurrentSession();
  if (session !== null) return redirect("/");
  return <LoginComp />;
}
