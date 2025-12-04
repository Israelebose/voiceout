import { getUserSession } from "@/lib/action/auth-action";
import { color, motion, useScroll } from "framer-motion";
import React, { JSX, useEffect, useState } from "react";
type btnProps = {
  children: React.ReactNode;
  onClick?: () => void |  Promise<void>;
  className?: string;
  Icon?: React.ReactNode;
  variant: "primary" | "secondary" | "github" | "icon";
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}
export default function Btn({
  children,
  onClick,
  className,
  Icon,
  variant,
  type,
  disabled = false
}: btnProps): JSX.Element {
  const colors = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-sm text-white shadow-indigo-500/50",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-slate-100 shadow-slate-900/50",
    github: "bg-gray-700 hover:bg-gray-600 text-white shadow-gray-900/50",
    icon: "bg-transparent hover:bg-slate-700 text-slate-300",
  };

      const disabledStyle = "opacity-50 cursor-not-allowed";
  return (
    <motion.button
      className={`${className} btn ${colors[variant]} ${className ?? ""} ${disabled ?  disabledStyle : " "} cursor-pointer text-sm md:text-base`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      type={type}
    >
      {Icon && <span className="w-5 h-5 ">{Icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}

type cardProp = {
  children: React.ReactNode
  title: string,
  Icon?: React.ReactNode
  className?: string
  id?: string
}

export const Card = ({ children, title, Icon, className, id }: cardProp) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        id={id}
        transition={{ duration: 0.5 }}
        className={`  py-6 px-3 sm:p-8 rounded-3xl shadow-2xl border border-slate-700 w-full  ${className}`}
    >
        {title && (
            <h2 className="md:text-3xl text-xl font-extrabold text-white mb-6 flex items-center space-x-3">
                {Icon && <span className="w-7 h-7 text-indigo-400">{Icon}</span>}
                <span>{title}</span>
            </h2>
        )}
        {children}
    </motion.div>
);

export function HandleUser(){
    const [user, setUser] = useState<Awaited<ReturnType<typeof getUserSession>> | null>(null);

  useEffect(() => {
    // Fetch the session and set the resolved value
    getUserSession()
      .then((session) => setUser(session))
      .catch((err) => {
        console.error("Failed to get session:", err);
        setUser(null);
      });
  }, []);

  return user;
}