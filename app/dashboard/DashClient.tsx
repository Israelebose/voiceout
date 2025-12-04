"use client";
import Btn, { Card, HandleUser } from "@/component/component";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  Edit,
  LucideLink,
  LucideMails,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import {
  saveEdit,
  sendMessage,
  getMessage,
  setUsername,
} from "./dasboard-action";
import { Post } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { staggerAni } from "@/component/animation";
import { getUserSession } from "@/lib/action/auth-action";
import { prisma } from "@/lib/auth";

export default function DashClient() {
  const user = HandleUser()?.user;
  const [copied, setCopied] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [allMessage, setAllmessage] = useState<Post[]>([]);
  const [receiverUrl, setReceiverUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState(user?.username);
  const [sendMess, setSendMess] = useState<boolean>();

  const { toast } = useToast();
  const host = process.env.NEXT_PUBLIC_HOST;
  const setEditing = () => {
    setIsEditing(true);
    setNewUserName(user?.username);
  };
  const handleCopy = async () => {
    if (user?.userUrl) {
      await navigator.clipboard.writeText(user?.userUrl);
      toast("copied Url", "success");
    } else {
      toast("failed to copy Url", "error");
    }
  };

  const checkUsername = async () => {
    const res = await setUsername();
    if (res?.success) {
      toast(res.message, "success");
      setIsPending(false);
      window.location.href = "/dashboard";
    } else {
      setIsPending(false);
      toast(res.message, "error");
    }
  };
  // client or server component on /dashboard

  useEffect(() => {
  
   const updateUsername = async()=>{
      const session = await getUserSession()
      if((session?.user?.name || session?.user?.email) && (session?.user?.userUrl === null || session?.user?.username === null)){
       checkUsername()
      }

   }
   updateUsername()
    MessageData();
  }, []);

  const MessageData = async () => {
    const res = await getMessage();
    if (res?.success && res.posts) {
      setAllmessage(res.posts);
    } else {
      toast(res.message, "error");
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewUserName(
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  };

  const handleEdithChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setIsEditing(false);

    if (user?.username) {
      const res = await saveEdit(newUserName!, user?.username);
      if (res?.success) {
        toast(res.message, "success");
        setIsPending(false);
        window.location.href = "/dashboard";
      } else {
        setIsPending(false);
        toast(res.message, "error");
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await sendMessage(message, receiverUrl);
    if (res?.success) {
      toast(res.message, "success");
      setSendMess(false);
    } else {
      setSendMess(true);
      toast(res.message, "error");
    }
  };

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

  return (
    <div className="parentDiv pb-5 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={` w-full  $`}
      >
        <div className="mb-5 w-full">
          <h1 className="md:text-3xl text-2xl text-balance font-extrabold text-white mb-6 flex items-center space-x-3">
            <LucideLink className="w-7 h-7 text-indigo-400" />{" "}
            <span>Welcome, {user?.username}</span>
          </h1>
          <p className="text-slate-400 mb-4 text-sm w-full md:text-base">
            This is your unique link for receiving anonymous messages.
          </p>
        </div>

        <div className=" w-">
          {isEditing ? (
            <form
              onSubmit={(e) => handleEdithChange(e)}
              className="space-y-4 mb-6"
            >
              <label className="block text-sm font-medium text-slate-400">
                a Edit Username (optional)
              </label>
              <input
                type="text"
                name="username"
                value={newUserName!}
                onChange={(e) => handleUserNameChange(e)}
                placeholder="New Username"
                className="w-full text-sm md:text-base p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />

              <label className="block text-sm font-medium text-slate-400">
                {/* Edit Link ID (e.g., `secret/{id}`) */}
              </label>
              <div className="flex items-center text-sm font-mono bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                <span className="p-3 text-slate-300  shrink-0">
                  {host}
                  {newUserName}
                </span>
              </div>

              <div className="flex flex-col pt-5 sm:flex-row md:gap-10 gap-6 mb-6 items-center justify-center w-full">
                <Btn
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isPending ? true : false}
                >
                  Save New Link
                </Btn>
                <Btn
                  onClick={() => {
                    setIsEditing(false);
                    setIsPending(false);
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Cancel
                </Btn>
              </div>
            </form>
          ) : (
            <>
              <p className="text-indigo-300 mb-4 font-mono text-sm break-all bg-slate-700 p-3 rounded-xl border border-slate-600 select-all flex justify-between items-center">
                {user?.userUrl}
                <motion.button
                  onClick={() => setEditing()}
                  className="ml-4 text-slate-400 hover:text-indigo-400 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
              </p>
              <p className="text-xs text-slate-500 mt-6">
                Click the edit icon to change your custom link ID.
              </p>

              <div className="flex pt-5 sm:flex-row gap-5 sm:gap-10 mb-6 items-center justify-center w-full">
                <Btn
                  onClick={handleCopy}
                  variant="primary"
                  Icon={copied ? <Check /> : <Copy />}
                  className="text-xs sm:text-base"
                >
                  {copied ? "Link Copied!" : "Copy Link to Share"}
                </Btn>

                <Btn
                  // onClick={() => setView(VIEWS.MESSAGES)}
                  variant="secondary"
                  Icon={<Mail />}
                  className="text-xs sm:text-base"
                  onClick={() => setSendMess(true)}
                >
                  Send a Message
                </Btn>
              </div>
            </>
          )}
        </div>
      </motion.div>

      <motion.div className="mt-10">
        <Card
          title="Messages"
          Icon={<LucideMails />}
          className="bg-slate-800/80  "
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <p className="text-slate-400 text-sm  md:text-base/7 leading-relaxed">
              You have received anonymous messages!
            </p>
            <Link href="/messages">
              <Btn variant="primary">More Messages</Btn>
            </Link>
          </div>

          <div className="space-y-4    ">
            {allMessage.length === 0 ? (
              <div className="p-4 leading-8 ">
                <h2 className="text-slate-400 ">You have no Messages Yet </h2>
                <small className="text-slate-400 text-center ">
                  Share Your Link to know what People have to say about you{" "}
                </small>
              </div>
            ) : (
              <motion.div
                variants={staggerAni}
                initial="initial"
                animate="animate"
                className="space-y-4 overflow-y-auto max-h-72 pr-2 custom-scrollbar"
              >
                {allMessage.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
                    <p className="md:text-lg text-wrap text-sm text-white leading-relaxed ">
                      {c.message}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* send a message */}
      {sendMess && (
        <div className="w-full fixed flex justify-center items-center z-50 top-0 left-0 h-screen  p-5 ">
          <div
            className="bg-slate-950/90 h-screen w-full absolute"
            onClick={() => setSendMess(false)}
          ></div>
          <Card
            title="Send A Secret Message"
            Icon={<MessageSquare />}
            className="md:max-w-2xl relative max-w-lg px-4 py-5 bg-slate-900/80 shadow"
          >
            <div className="absolute top-8 right-10"></div>
            <form
              onSubmit={(e) => handleSendMessage(e)}
              className=" flex flex-col gap-5"
            >
              <div className="group flex flex-col">
                <label className="group-hover:scale-95 text-left left-0 transition-transform group-focus-within:-translate-y-2.5 text-sm md:text-base group-focus-within:opacity-100 opacity-0">
                  Reciever&apos;s Link
                </label>
                <input
                  value={receiverUrl}
                  onChange={(e) => setReceiverUrl(e.target.value)}
                  type="text"
                  placeholder="Link:  https://your-next-app.com/secret/username "
                  className="text-sm md:text-base text-balance"
                  required
                />
              </div>
              <div className="group flex flex-col">
                <label className="group-hover:scale-95 text-left left-0 transition-transform group-focus-within:-translate-y-2.5 text-sm md:text-base   group-focus-within:opacity-100 opacity-0">
                  Message
                </label>
                <textarea
                  className="text-sm md:text-base text-wrap"
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
                <Btn
                  variant="secondary"
                  className="w-full flex-3/6"
                  onClick={() => setSendMess(false)}
                >
                  Cancel
                </Btn>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
