"use client";

import { motion } from "framer-motion";
import Btn from "@/component/component"; // your button component
import { Github } from "lucide-react";
import { useState } from "react";
import {signIn, signInSocial, signUp } from "@/lib/action/auth-action";
import { useToast } from "@/context/ToastContext";

export default function AuthClient() {
  const [newUser, setNewUser] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {  toast } = useToast();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser) {
      const res = await signUp(name, email, password);
      if (res?.user) {
        toast("Signup successful!", "success");
        window.location.href = "/dashboard";
      }else{
        toast("Signup failed. Please try check your details.", "error");
        return false;
      }
    }else{
       const res = await signIn(email, password);
      if (res?.user) {
        toast("SignIn successful!", "success");
        window.location.href = "/dashboard";
      }else{
        toast("SignIn failed. Please try check your details.", "error");
        return false;
      }
    }
  };

   const SignInSocial = async (provider : "github" ) => {
   
    try {
    await signInSocial(provider);
    } catch (error) {
      console.log(error);
      toast("SignIn failed. Please try again.", "error");
    }
  };

  return (
    <div className="  parentDiv pb-10  grid grid-cols-1 ">
   <div className="flex justify-center w-full">
       <motion.div
        className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-10 py-5 max-w-md w-full shadow-2xl border border-slate-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
          Welcome Back
        </h1>
        <p className="text-slate-300 text-sm text-center mb-5">
          Log in or Signup quickly using your GitHub account
        </p>

        <Btn
          variant="github"
          Icon={<Github size={20} />}
          className="w-full justify-center py-3 mb-5"
          onClick={()=> SignInSocial("github")}
        >
          Login with GitHub
        </Btn>

        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="mx-3 text-sm text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        <motion.form
          onSubmit={submit}
          method="POST"
          className=" space-y-4"
        >
          {newUser && (
            <div className="group flex flex-col">
              <label className="group-hover:scale-95 text-left left-0 transition-transform group-focus-within:-translate-y-2.5  group-focus-within:opacity-100 opacity-0 text-sm">
                Full Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                name="fullname"
                placeholder="Full Name"
              />
            </div>
          )}
          <div className="group flex flex-col">
            <label className=" text-left left-0 transition-transform group-focus-within:-translate-y-2.5  group-focus-within:opacity-100 opacity-0 text-sm">
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="group flex flex-col">
            <label className=" text-left left-0 transition-transform group-focus-within:-translate-y-2.5  group-focus-within:opacity-100 opacity-0 text-sm">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="flex justify-center mt-5">
            <Btn variant="primary" type="submit" className="w-full">
              {newUser ? " Sign Up" : "Login"}
            </Btn>
          </div>
        </motion.form>

        <div className="text-center mt-6 text-sm text-slate-400">
          By logging in, you agree to our{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
        <div className="flex w-full justify-center mt-5">
          <Btn
            variant="secondary"
            onClick={() => setNewUser(!newUser)}
            className="w-fit"
          >
            {newUser ? "Login" : "Sign Up"}
          </Btn>
        </div>
      </motion.div>
   </div>
    </div>
  );
}
