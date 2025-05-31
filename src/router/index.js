import express from 'express';

import userRouter from './usersRouter.js';
import hackathonsRouter from './hackathonsRouter.js';
import inscriptionRouter from './inscriptionRouter.js';

const router = express.Router();

router.use(userRouter);

router.use(hackathonsRouter);

router.use(inscriptionRouter);

export default router;
