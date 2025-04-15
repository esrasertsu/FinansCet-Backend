import { Request, Response } from "express";
import { generateAdvice } from "../services/openai.js";

export const analyzeFinance = async (req: Request, res: Response) => {
  try {
    const { income, expenses } = req.body;

    const formattedExpenses = expenses
      .map((e: any) => `- ${e.category}: ${e.amount} TL`)
      .join("\n");

    const prompt = `
Kullanıcının aylık geliri: ${income} TL
Harcamaları:
${formattedExpenses}

Sen bir finansal danışmansın. Kullanıcının bütçesini daha iyi planlaması için önerilerde bulun.  
Cevabını samimi, sade ve moral verici bir Türkçe ile yaz.  
İngilizce veya çeviri havasında cümleler kurma. "Ben FinansÇet olarak" gibi konuşabilirsin.
`;

    const response = await generateAdvice(prompt);

    res.json({ success: true, message: response });

  } catch (error: any) {
    console.error("❌ OpenAI HATASI:", error?.message || error);
    res.status(500).json({ success: false, error: error?.message || "Bir hata oluştu." });
  }
};
