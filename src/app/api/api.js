'use client'
import OpenAI from "openai"
 
  
  export const fetchApiAnswer = async (question) => {
    const openai = new OpenAI({
        apiKey: process.env.API_KEY
      })
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [ { role: "user", content: question }],
        model: "gpt-3.5-turbo",
        temperature: 0.7
    });
  
    console.log(chatCompletion.choices[0].message.content);
        return chatCompletion.choices[0].message.content
   
  }catch (error) {
      console.error("Error fetching AI answer:", error);
      return "Error fetching answer";
    }
  };
  