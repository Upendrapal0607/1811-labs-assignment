import React from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "./lib/utils";

export const App = () => {
  const navigate = useRouter();
  const token = getCookie("sb-vxysqlojrtxmdzgxcqda-auth-token.0"); 
 
  const handleLogin = () => {
    navigate.replace(token ? "/chat" : "/login");
  };

  return (
    <div className="w-full min-h-screen bg-[url('/Image/background-image.png')] bg-center sm:bg-cover md:bg-contain text-white flex flex-col items-center justify-between p-4">
      <div className="flex flex-col items-center w-full text-center font-pacifico text-3xl space-y-4 mt-32 md:mt-16 sm:mt-24">
        <h3>Pickup line</h3>
        <h3>Generator</h3>
      </div>
      <div className="flex-grow"></div>
      <div className="mt-8 md:mt-16">
        <button
          className="flex items-center justify-center mb-20 md:mb-28 lg:mb-36 px-6 py-3 bg-[#ff2157] text-white rounded-full text-lg md:text-xl shadow-lg hover:bg-[#ff4071] transition duration-300"
          onClick={handleLogin}
        >
          <span>🤍</span> <p className="mx-2">Generate one for me</p> <span>🤍</span>
        </button>
      </div>
    </div>
  );
};
