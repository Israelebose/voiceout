"use client";
import Link from "next/link";
import Btn from "./component";
import { motion } from "framer-motion";
import { anime, entryDiv, staggerAni } from "./animation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { auth } from "@/lib/auth";
import { logOut } from "@/lib/action/auth-action";
import { useToast } from "@/context/ToastContext";
import { redirect } from "next/navigation";

type Session = typeof auth.$Infer.Session;

export default function Navbar({ session }: { session: Session | null }) {
  const [mobile, setMobile] = useState<boolean>(false);
  const { toast } = useToast();
  const navLinks = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Dashboard",
      url: "/dashboard",
    },
    {
      text: "Massages",
      url: "/messages",
    },
  ];

  const signOut = async () => {
    const res = await logOut();
    if (res?.success) {
      toast(res.message, "success");
      redirect("/");
    } else {
      toast(res.message, "error");
    }
  };
  return (
   <>
   {mobile && (<motion.div   initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }} onClick={()=> setMobile(false)} className={`bg-slate-900/80 transition-opacity opacity-0 ${mobile ? "opacity-80" : ""} z-20 fixed left-0 top-0 w-full h-screen`}/>)}
    <nav
      className={`fixed w-full flex md:flex-row flex-col justify-between px-5 pr-7 pt-4 md:px-10 lg:px-20 md:py-3 md:items-center shadow-lg ${
        mobile ? "bg-slate-800/90" : "bg-slate-800/90 "
      }  z-50 `}
    >
      <div className="flex  items-center justify-between w-full md:w-auto  ">
        <Link href="/"><h1 className="text-2xl font-bold">VoiceOut</h1></Link>
        {mobile ? (<div className="md:hidden" onClick={() => setMobile(!mobile)}>
          <X className="w-8 h-8" />
        </div>): (<div className="md:hidden" onClick={() => setMobile(!mobile)}>
         <Menu className="w-8 h-8" /> 
        </div>)}
      </div>
     
      <div className="md:flex hidden gap-10">
        {navLinks.map((l, i) => (
          <div key={i} className="group transition-transform hover:scale-105">
            <Link className="px-1 " href={l.url}>
              {l.text}
            </Link>
            
          </div>
        ))}
      </div>

      <div className="md:hidden  w-full mt-4">
        {mobile && (
          <motion.div 
          initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
          className=" ">
            {navLinks.map((l, i) => (
              <motion.div
               
                key={i}
                className="group flex flex-col justify-center gap-5 rounded-lg mb-3 bg-slate-700/30 hover:bg-slate-800/40"
              >
                <Link
                  className="p-4"
                  href={l.url}
                  onClick={() => setMobile(false)}
                >
                  {l.text}
                </Link>
              </motion.div>
            ))}
            <div className="pb-5 md:block">
              {session?.user ? (
                <Btn variant="primary" onClick={()=> {signOut(); setMobile(false)}} className="">
                  LogOut
                </Btn>
              ) : (
                <Link href="/auth">
                  <Btn variant="primary" onClick={()=> { setMobile(false)}} className="">
                    Get Started
                  </Btn>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
      {session?.user ? (
        <div className="hidden md:block">
          <Btn variant="primary" onClick={signOut} className="">
            LogOut
          </Btn>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link href="/auth">
            <Btn variant="primary" className="">
              Get Started
            </Btn>
          </Link>
        </div>
      )}
    </nav>
   </>
  );
}
