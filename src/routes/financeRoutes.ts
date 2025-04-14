import { Router } from "express";
import { analyzeFinance } from "../controllers/financeController.js"; // ESM için .js şart

const router = Router();

router.post("/analyze", analyzeFinance); // ✅ bu varsa POST /analyze çalışmalı

export default router;
