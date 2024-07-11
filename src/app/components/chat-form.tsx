"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/superbase/browser";
import { fetchApiAnswer, getCookie } from "../lib/utils";
import { FiCopy } from "react-icons/fi";
// import {fetchApiAnswer} from "../api/api"

// import { supabase } from '../lib/supabaseClient';

interface DataType {
  question: string;
  answer: string;
}

const ChatForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [aboutCrush, setAboutCrush] = useState<any>("");
  const [crushStyle, setCrushStyle] = useState<any>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [checkPickup, setCheckPickup] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

  const [pickupLines, setPickupLines] = useState(["", ""]);

  const HandleGenerateAnswer = async () => {
    if (!aboutCrush || !crushStyle) {
      alert("Please fill both option");
      return;
    }
    setIsLoading(false);
    const data = await fetchApiAnswer(aboutCrush);
    setPickupLines((prev) => {
      const newLines = [...prev];
      newLines[0] = data;

      return newLines;
    });

    if (data) {
      const data2 = await fetchApiAnswer(crushStyle);
      setPickupLines((prev) => {
        const newLines = [...prev];
        newLines[1] = data2;
        return newLines;
      });
    }
    setIsLoading(true);
    setCheckPickup(true);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = getCookie("sb-fmisstrelebvlzcuswzg-auth-token.0"); // Adjust the cookie name as per your setup

      if (token) {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          console.error("Error getting user:", userError.message);
          return;
        }

        if (!user) {
          location.href = location.origin + "/login";
        } else {
          const { aud, email } = user;
          if (aud) {
            setIsLogin(true);
            setUser(email);
          }
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    Cookies.remove("sb-fmisstrelebvlzcuswzg-auth-token.0");
    location.href = location.origin + "/login";
  };

  const copyToClipboard = (text:string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="w-full min-h-screen text-white m-0 p-0">
      <div className="overlay bg-blur">
        <div className="flex justify-between items-center mt-8 mr-8">
          <div>
          <button
       onClick={()=>window.location.assign("/")}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium text-sm rounded-full text-[#CD6B83] bg-[#6d6363] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3c3c3c]"
            >
              Back to Home
            </button>
          </div>
          <div className="text-[red] text-2xl">Pickup line generator</div>
          <div className="">
           
            <button
              onClick={handleLogout}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium text-sm rounded-full text-[#CD6B83] bg-[#6d6363] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3c3c3c]"
            >
              Signout
            </button>
            {showTooltip && (
              <div className="relative  bottom-full mb-2 w-max px-2 py-1 text-[#CD6B83] rounded-md shadow-lg font-medium text-lg">
                {user}
              </div>
            )}
          </div>
        </div>

        <div className="m-auto sm:w-[50%] lg:w-[30%] w-full mt-12">
          {!checkPickup ? (
            <div>
              <div>
                <div className="text-sm text-[#CD6B83]">
                  Tell us about your crush
                </div>
                <div className="text-sm text-[gray] mb-6">
                  <textarea
                    name="aboutCrush"
                    id="aboutCrush"
                    value={aboutCrush}
                    onChange={(e) => setAboutCrush(e.target.value)}
                    placeholder="Write something about your crush..."
                    className="w-full h-24 p-2 mt-2 rounded-md bg-[white] border border-[#ffffff33] focus:outline-none focus:ring-2 focus:ring-[#686767] focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <div className="text-sm text-[#CD6B83]">Style</div>
                  <div className="text-sm text-[gray] mb-6">
                    <input
                      type="text"
                      placeholder="Eg: Funny"
                      value={crushStyle}
                      onChange={(e) => setCrushStyle(e.target.value)}
                      className="w-full p-2 rounded-md mt-2 bg-[white] border border-[#ffffff33] focus:outline-none focus:ring-2 focus:ring-[#686767] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semi mb-4 text-[red]">
                Copy the below pick up lines
              </h1>
              {pickupLines.map((line, index) => (
                <div key={index} className="relative mb-4">
                  <div
                    className="border-2 border-[red] p-4 rounded-lg bg-white shadow-md cursor-pointer"
                    onClick={() => copyToClipboard(line)}
                  >
                    <h2 className="text-xl font-semibold mb-2 text-[#CD6B83]">
                      Pickup line {index + 1}
                    </h2>
                    <p className="text-[red]">{line}</p>
                    <FiCopy className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" />
                  </div>
                </div>
              ))}
            </>
          )}
          {checkPickup ? (
            <div>
              <button
                onClick={() => setCheckPickup(false)}
                className="flex items-center justify-center px-8 py-4 cursor-pointer w-full my-12 bg-[#ff2157] text-white rounded-full text-xl shadow-lg hover:bg-[#ff4071] transition duration-300"
              >
                <span>🤍</span> <p>Regenerate pickup line</p> <span>🤍</span>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={HandleGenerateAnswer}
                disabled={!IsLoading}
                className="flex items-center justify-center px-8 py-4 cursor-pointer w-full my-12 bg-[#ff2157] text-white rounded-full text-xl shadow-lg hover:bg-[#ff4071] transition duration-300"
              >
                <span>🤍</span>{" "}
                <p>
                  {IsLoading ? "Generate one for me" : "Generating answer..."}
                </p>{" "}
                <span>🤍</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
