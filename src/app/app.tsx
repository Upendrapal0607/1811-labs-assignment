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
    <div className="w-full min-h-screen bg-[url('/Image/background-image.png')] text-white bg-cover m-0 p-0">
      <div className="flex gap-8 flex-col w-[185px] h-[130px] pt-[7%] ml-[43%]  text-center font-pacifico text-3xl space-y-2">
        <h3>Pickup line</h3>
        <h3>Generator</h3>
      </div>
      <div className="mt-[25%] ml-[40%]">
        <button
          className="flex items-center justify-center px-8 py-4 bg-[#ff2157] text-white  rounded-full text-xl shadow-lg hover:bg-[#ff4071] transition duration-300"
          onClick={handleLogin}
        >
          <span>🤍</span> <p>Generat one for me</p> <span>🤍</span>
        </button>
      </div>
    </div>
  );
};
