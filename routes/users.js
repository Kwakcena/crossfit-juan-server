import express from 'express';

import { modal } from '../services/crawling.js';

const router = express.Router()

const wrapper = asyncFn => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
}

router.post(
  '/', 
  wrapper(async (req, res) => {
    console.log('req.body: ', req.body);
    const data = await modal(req.body);
    res.status(200).json({
      success: true,
      data,
    });
  })
);

export default router;