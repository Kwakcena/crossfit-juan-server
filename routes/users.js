const express = require("express");
const modal = require("../services/crawling.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { articleNumber } = req.body;
  console.log('articleNumber: ', articleNumber);

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

module.exports = router;