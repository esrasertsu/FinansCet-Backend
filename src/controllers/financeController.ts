import { Request, Response } from "express";
import { groqChat } from "../services/groq.js";

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

Bu verilere göre kullanıcının bütçesini daha iyi planlaması için önerilerde bulun. Moral verici, samimi ve destekleyici bir dille konuş.
`;

const response = await groqChat([
  {
    role: "user",
    content: prompt
  }
]);

    res.json({ success: true, message: response });

  } catch (error: any) {
    console.error("❌ Groq HATASI:", error?.message || error);
    res.status(500).json({ success: false, error: error?.message || "Bir hata oluştu." });
  }
};
