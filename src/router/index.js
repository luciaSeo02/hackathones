import express from 'express';

import userRouter from './userRouter.js';
import hackathonsRouter from './hackathonsRouter.js';

const router = express.Router();

router.use(userRouter);
router.use(hackathonsRouter);

export default router;
