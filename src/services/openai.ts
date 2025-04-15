import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAdvice(prompt: string): Promise<string> {
  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
  });

  return chat.choices[0].message.content || "Cevap alınamadı.";
}
