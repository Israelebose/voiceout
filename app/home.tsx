"use client";

import { entryDiv, staggerAni } from "@/component/animation";
import Btn, { Card } from "@/component/component";
import { motion } from "framer-motion";

import {
  Mic,
  ShieldCheck,
  Check,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full ">
      <div className="parentDiv grid grid-cols-1 gap-10 md:gap-20  h-screen ">
        <div className="md:max-w-6xl  mx-auto grid lg:grid-cols-2 gap-10 items-center md:mb-20">
          {/* Text */}
          <motion.div
            className="space-y-6"
            variants={staggerAni}
            animate="animate"
            initial="initial"
          >
            <div className="space-y-3">
              <motion.h1
                variants={entryDiv}
                transition={{ ease: "easeInOut" }}
                className="text-4xl md:text-6xl font-bold leading-tight text-balance"
              >
                Speak Up.
                <span className="text-indigo-500"> Stay Anonymous.</span>
              </motion.h1>
              <motion.span
                variants={entryDiv}
                transition={{ ease: "easeInOut" }}
              >
                Welcome to <span className="font-bold">Voice Out</span>
              </motion.span>
            </div>
            <motion.p
              variants={entryDiv}
              transition={{ ease: "easeInOut" }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              Your voice matters. Share your experience, report an issue, or
              express how you feel — all{" "}
              <span className="text-white font-semibold">100% anonymous</span>{" "}
              and secure.
            </motion.p>

            <motion.div
              variants={entryDiv}
              transition={{ ease: "easeInOut" }}
              className="flex gap-4 pt-4"
            >
              <Link href="/auth">
                {" "}
                <Btn variant="primary" Icon={<Mic size={18} />}>
                  Start Speaking
                </Btn>
              </Link>

              <Btn variant="secondary" Icon={<ShieldCheck size={18} />}>
                <Link href="#card">How It Works</Link>
              </Btn>
            </motion.div>

            {/* Mini Features */}
            <motion.div
              variants={entryDiv}
              transition={{ ease: "easeInOut" }}
              className="flex flex-col md:flex-row gap-4 pt-4 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                100% Anonymous
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                End-to-End Privacy
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Safe Reporting
              </div>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="bg-slate-800/70 rounded-3xl p-8 border border-slate-700 shadow-2xl backdrop-blur-xl max-w-sm w-full">
              <Mic size={80} className="text-indigo-400 mx-auto" />
              <p className="text-center text-slate-300 mt-4">
                “Let your voice be heard — without revealing who you are.”
              </p>
            </div>
          </motion.div>
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
            className=" md:max-w-6xl mb-10 md:mb-20 bg-slate-800/70  "
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
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
