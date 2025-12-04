import React from 'react';
import AuthClient from './AuthClient';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/action/auth-action';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login or Sign Up – VoiceOut",
  description:
    "Create a VoiceOut account or log in to manage your anonymous messages, private link, and dashboard.",
  keywords: [
    "VoiceOut login",
    "VoiceOut signup",
    "anonymous message login",
    "create anonymous link",
    "anonymous messaging account",
  ],
  openGraph: {
    title: "VoiceOut – Login or Sign Up",
    description:
      "Access your anonymous dashboard and manage your private messaging link on VoiceOut.",
    type: "website",
  },
};


const Page = async () => {
   const session = await getUserSession();
    if(session){
        redirect('/dashboard');
    }
    return (
        <div>
            <AuthClient/>
        </div>
    );
}

export default Page;
