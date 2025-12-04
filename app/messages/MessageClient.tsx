"use client";
import  { useEffect, useState } from "react";
import Btn from "../../component/component";
import { LucideMails } from "lucide-react";
import {  motion } from "framer-motion";
import Link from "next/link";
import { staggerAni } from "@/component/animation";
// type Post = {
//   id: string;
//     reciever: string;
//     message: string;
//     authorId: string | null;
//     createdAt: Date;
// }
import { Post } from "@prisma/client";
import { getMessage } from "./message-action";
import { useToast } from "@/context/ToastContext";
const timeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

export default function MessageClient() {
  const [allMessage, setAllmessage] = useState<Post[]>([]);
  const { toast } = useToast();
  const [count, setCount] = useState<number>();
  useEffect(() => {
    const MessageData = async () => {
      const res = await getMessage();
      if (res?.success && res.posts && res.count) {
        setAllmessage(res.posts);
        setCount(res.count);
      } else {
        toast(res.message, "error");
      }
    };
    MessageData();
  }, []);

  return (
    <div className="parentDiv ">
      <div className="mb-5">
        <h1 className="md:text-3xl text-2xl font-extrabold text-white mb-6 flex items-center space-x-3">
          <LucideMails className="w-7 h-7 text-indigo-400" />{" "}
          <span>Messages</span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <p className="text-slate-400 text-sm  md:text-base/7 leading-relaxed">
            You have received {count} anonymous messages!
          </p>
          <Link href="/dashboard">
            <Btn variant="primary">Dashboard</Btn>
          </Link>
        </div>
      </div>
      <div>
        <div >
          {allMessage.length === 0 ? (
            <div className="text-center  pt-50 leading-10">
              <h2 className="text-slate-400 text-center ">
                You have no Messages Yet{" "}
              </h2>
              <h2 className="text-slate-400 text-center ">
                Share Your Link to know what People have to say about you{" "}
              </h2>
            </div>
          ) : (
            <motion.div
              variants={staggerAni}
              animate="animate"
              initial="initial"
              className="space-y-4 lg:max-h-170"
            >
              {allMessage.map((c, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key={i}
                  className="p-5 bg-slate-700/70 border-l-4 border-indigo-400 rounded-xl shadow-md backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono text-indigo-300 bg-indigo-900/50 px-2 py-0.5 rounded-full">
                      Anonymous Sender
                    </span>
                    <span className="text-xs text-slate-500">
                      {timeAgo(new Date(c.createdAt))}
                    </span>
                  </div>
                  <p className="md:text-lg text-balance text-base text-white leading-relaxed ">
                    {c.message}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
