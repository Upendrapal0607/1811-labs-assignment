import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "./lib/utils";

export const App = () => {
  const navigate = useRouter();
  const token = getCookie("sb-vxysqlojrtxmdzgxcqda-auth-token.0"); 
 
  const handleLogin = () => {
    navigate.replace(token ? "/chat" : "/login");
  };

  return (
    <div className="w-full min-h-screen  bg-[url('/Image/background-image.png')] bg-cover bg-center text-white m-0 p-0 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center w-full md:w-auto text-center font-pacifico text-3xl space-y-6 mt-[150px] md:mt-[40px] sm:mt-[120px]">
        <h3>Pickup line</h3>
        <h3>Generator</h3>
      </div>
      <div className="mt-8 md:mt-16">
        <button
          className="flex items-center justify-center mb-[350px] lg:mb-[250px] px-8 py-4 bg-[#ff2157] text-white rounded-full text-xl shadow-lg hover:bg-[#ff4071] transition duration-300"
          onClick={handleLogin}
        >
          <span>🤍</span> <p>Generate one for me</p> <span>🤍</span>
        </button>
      </div>
    </div>
  );
};
