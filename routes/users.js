import express from "express";

import { modal } from "../services/crawling.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { articleNumber } = req.body;

  const data = await modal({
    articleNumber,
    naverId: process.env.NAVER_ID,
    naverPw: process.env.NAVER_PW,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

export default router;
