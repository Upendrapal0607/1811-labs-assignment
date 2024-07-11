"use client";

import { useEffect, useState } from "react";
import ChatForm from "../components/chat-form";
import LoginPage from "../components/login";
// import { getCookie } from "../lib/utils";
import { supabase } from "../lib/superbase/browser";
import { getCookie } from "../lib/utils";

// import { ChatForm } from "../components/chat-form";

const page = () => {
   
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = getCookie("sb-fmisstrelebvlzcuswzg-auth-token.0"); // Adjust the cookie name as per your setup
      if (token) {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error getting user:', userError.message);
          return;
        }   
if(!user){
  setIsLogin(false);
}
else{
  const {aud,email } = user
  if(aud){
    setIsLogin(true);
    setUser(email)
  }

}
      }
      else{
        setIsLogin(false);
      }

    };

    fetchUserDetails();
  }, []);
  return (
    <div>
      {!isLogin?<LoginPage/>:<ChatForm />}
    </div>
  );
};
export default page;
