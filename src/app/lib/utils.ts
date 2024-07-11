import OpenAI from "openai";

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
};

export const fetchApiAnswer = async (question: String) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENA_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    return error.message;
  }
};
