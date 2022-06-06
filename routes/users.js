import express from 'express';

import { requestWrapper } from '../utils/requestWrapper.js';
import { modal } from '../services/crawling.js';

const router = express.Router()

router.post(
  '/', 
  requestWrapper(async (req, res) => {
    const data = await modal(req.body);
    
    res.status(200).json({
      success: true,
      data,
    });
  })
);

export default router;