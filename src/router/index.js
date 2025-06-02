import express from 'express';

import userRouter from './usersRouter.js';
import hackathonsRouter from './hackathonsRouter.js';
import inscriptionRouter from './inscriptionRouter.js';
import listsRouter from './listsRouter.js';
import contactRouter from './contactRouter.js';

const router = express.Router();

router.use(userRouter);

router.use(hackathonsRouter);

router.use(inscriptionRouter);

router.use(listsRouter);

router.use(contactRouter);

export default router;
