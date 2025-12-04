import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/component/Navbar";
import { ToastProvider } from "@/context/ToastContext";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Inter } from "next/font/google";

const host = process.env.HOST
// app/page.tsx
export const metadata: Metadata = {
  title: "VoiceOut – Speak Up, Stay Anonymous | Anonymous Messaging Platform",
  description:
    "VoiceOut is a secure anonymous messaging platform. Create your private link and receive anonymous messages, confessions or compliments safely and privately.",
  keywords: [
    "anonymous messaging",
    "send anonymous message",
    "VoiceOut",
    "anonymous confession",
    "private message link",
    "anonymous feedback platform",
    "speak anonymously",
    "secure anonymous messages",
  ],
  openGraph: {
    title: "VoiceOut – Speak Up, Stay Anonymous",
    description:
      "Share your thoughts & receive anonymous messages safely with VoiceOut.",
    url: `${host}`,
    siteName: "VoiceOut",
    type: "website",
  },
};

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body className={`${inter.className} bg  antialiased`}>
        <ToastProvider>
          <Navbar session={session} />

          <div className="h-screen overflow-y-scroll custom-scrollbar relative">
            
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
