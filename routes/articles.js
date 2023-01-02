import express from "express";

import { getArticles } from "../services/getArticles.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getArticles();

  res.status(200).json({
    success: true,
    data,
  });
});

export default router;
