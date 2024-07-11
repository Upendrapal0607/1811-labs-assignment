// pages/login.tsx
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/superbase/browser";
import { getCookie } from "../lib/utils";
// import { cookies } from 'next/headers';
interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
}

const LoginPage: React.FC = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-12 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full mt-[6%] sm:mt-[8%] space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-[40px] h-[40px] bg-[#ff2157] text-center pl-[9px] flex items-center content-center"
            style={{ borderRadius: "4px" }}
          >
            🤍
          </div>
          <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
            Pickup line generator
          </h2>
          <p className="mt-2 text-center text-sm text-[#d4d9df]">
            Generate pickup line for your crush now!
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={signInWithGoogle}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-[#3c3c3c] bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3c3c3c]"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-24">
              <img
                src="/Image/google-icon.png"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
            </span>
            Sign up with Google
          </button>
          <button
            onClick={()=>window.location.assign("/")}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-[#3c3c3c] bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3c3c3c]"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-24">
              <img
                src="/Image/google-icon.png"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
            </span>
           Back to Home
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-[#c4ccd4]">
        By signing up, you agree to the{" "}
        <a
          href="/#"
          style={{ borderBottom: "1px solid #d4d9df" }}
          className="font-medium text-[#d4d9df]"
        >
          Terms of Use
        </a>{" "}
        ,{" "}
        <a
          href="/#"
          className="font-medium text-[#d4d9df]"
          style={{ borderBottom: "1px solid #d4d9df" }}
        >
          Privacy Notice
        </a>
        .
      </div>
    </div>
  );
};

export default LoginPage;
