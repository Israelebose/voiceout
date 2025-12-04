import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import MessageClient from "./MessageClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Your Anonymous Messages – VoiceOut Inbox",
  description:
    "View all anonymous messages sent to you on VoiceOut. Safe, private and secure anonymous inbox.",
  keywords: [
    "anonymous messages",
    "anonymous inbox",
    "read anonymous messages",
    "VoiceOut messages",
  ],
  openGraph: {
    title: "VoiceOut – Anonymous Message Inbox",
    description:
      "Check all anonymous messages sent to you using your VoiceOut link.",
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
      <MessageClient />
    </div>
  );
}
