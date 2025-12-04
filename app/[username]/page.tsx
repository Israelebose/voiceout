import Link from "next/link";
import MessageForm, { SmallMess } from "./MessageForm";
import { prisma } from "@/lib/auth";
import type { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `Send Anonymous Message to @${username} – VoiceOut`,
    description: `Send a completely anonymous message to @${username} on VoiceOut. Share your thoughts, compliments, confessions, or feedback securely.`,
    keywords: [
      "send anonymous message",
      `message ${username}`,
      "anonymous confession",
      "anonymous feedback",
      "VoiceOut messages",
    ],
    openGraph: {
      title: `Send Anonymous Message to @${username}`,
      description:
        "Speak freely and anonymously. VoiceOut lets you send private messages without revealing your identity.",
      type: "website",
    },
  };
}


export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { username: true },
  });
  
  return (
    <div className=" parentDiv">
      {!user ? (
        <div className=" px-5 md:px-10 text-center flex gap-5 flex-col h-screen justify-center items-center">
          <h2 className="md:text-4xl text-xl">User not Found</h2>
          <SmallMess/>
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-sm md:text-lg text-white shadow-indigo-500/50 btn cursor-pointer">
            Get Started
          </Link>
        </div>
      ) : (
        <MessageForm />
      )}
    </div>
  );
}
