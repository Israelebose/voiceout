import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import DashClient from "./DashClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const metadata : Metadata = {
  title: "VoiceOut Dashboard – Manage Your Anonymous Link & Settings",
  description:
    "Access your VoiceOut dashboard to copy your private message link, edit your username, manage settings and control your anonymous inbox.",
  keywords: [
    "VoiceOut dashboard",
    "edit username anonymous app",
    "copy anonymous link",
    "manage anonymous link",
  ],
  openGraph: {
    title: "VoiceOut Dashboard",
    description:
      "Manage your anonymous message link, username and privacy settings on VoiceOut.",
    type: "website",
  },
};




export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  return (
    <div>
      <DashClient />
    </div>
  );
}
