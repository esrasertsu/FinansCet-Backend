import express from "express";
import dotenv from "dotenv";
import financeRoutes from "./routes/financeRoutes.js"; // ESM için .js unutma!
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/finance", financeRoutes); // ✅ Bu doğruysa /analyze gelir

app.get("/", (req, res) => {
  res.send("FinansÇet API çalışıyor! 💰");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor 🚀`);
});
