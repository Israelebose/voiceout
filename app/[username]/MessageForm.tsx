"use client";
import Btn, { Card } from "@/component/component";
import { Check, Info, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { sendMessage } from "@/app/dashboard/dasboard-action";
import { useToast } from "@/context/ToastContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { entryDiv } from "@/component/animation";

export default function MessageForm() {
  const { toast } = useToast();
  const [message, setMessage] = useState<string>("");
  const [receiverUrl, setReceiverUrl] = useState<string>("");
  useEffect(() => {
    const getUrl = () => {
      if (window.location.href !== null) {
        setReceiverUrl(window.location.href);
      }
    };
    getUrl();
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await sendMessage(message, receiverUrl);
    if (res?.success) {
      toast(res.message, "success");
      setMessage("");
    } else {
      toast(res.message, "error");
    }
  };
  return (
    <div className="w-full  parentDiv grid grid-cols-1 gap-10 md:gap-30 h-screen  ">
    <div className="flex justify-center w-full">
          <Card
        title="Send A Secret Message"
        Icon={<MessageSquare />}
        className="md:max-w-2xl relative max-w-lg px-4 py-5 bg-slate-800/80"
      >
        <div className="absolute top-8 right-10"></div>
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className=" flex flex-col gap-5"
        >
          <div className="group flex flex-col">
            <label className="group-hover:scale-95 text-left left-0 transition-transform group-focus-within:-translate-y-2.5 text-sm md:text-base  group-focus-within:opacity-100 opacity-0">
              Reciever&apos;s Link
            </label>
            <input
              value={receiverUrl}
              onChange={(e) => setReceiverUrl(e.target.value)}
              type="text"
              placeholder="Link:  https://your-next-app.com/secret/username "
              className="text-sm md:text-base"
              required
            />
          </div>
          <div className="group flex flex-col">
            <label className="group-hover:scale-95 text-left left-0 transition-transform group-focus-within:-translate-y-2.5 text-sm md:text-base group-focus-within:opacity-100 opacity-0">
              Message
            </label>
            <textarea
              className="text-sm md:text-base"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Write Your Heart's Content and Send it Anonymously "
            ></textarea>
          </div>
          <div className="flex gap-5 mt-2">
            <Btn variant="primary" className="w-full">
              Send
            </Btn>
          </div>
        </form>
      </Card>
    </div>

      {/* How to use it  */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Card
          id="card"
          title="How it works"
          Icon={<Info />}
          className=" md:max-w-6xl bg-slate-800/40  "
        >
          <p className="text-slate-400 mb-6 md:text-base/7 leading-relaxed">
            Voice Out allows you to create a unique, private link that you can
            share with anyone. Your friends, colleagues, or followers can use
            this link to send you anonymous compliments, kind words, or
            confessions. You&apos;ll never know who sent it, but you&apos;ll
            feel the love!
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 text-slate-300">
              <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
              <p>Create a personalized, shareable link.</p>
            </div>
            <div className="flex items-start space-x-3 text-slate-300">
              <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
              <p>Receive messages with guaranteed anonymity.</p>
            </div>
            <div className="flex items-start space-x-3 text-slate-300">
              <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
              <p>Boost positivity and connection among your network.</p>
            </div>
            <Link href="/auth" className="">
              <Btn variant="primary" className="mt-5">
                Get Started
              </Btn>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export const SmallMess = () => {
  return (
    <div>
      <motion.span
        className="text-sm md:text-3xl"
        variants={entryDiv}
        transition={{ ease: "easeInOut" }}
      >
        Welcome to <span className="font-bold">Voice Out</span>
      </motion.span>
      <motion.p
        variants={entryDiv}
        transition={{ ease: "easeInOut" }}
        className="text-sm mt-4 text-wrap max-w-xl md:text-xl text-slate-300 leading-relaxed"
      >
        Your voice matters. Share your experience, report an issue, or express
        how you feel — all{" "}
        <span className="text-white font-semibold">100% anonymous</span> and
        secure.
      </motion.p>
    </div>
  );
};
