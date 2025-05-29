import express from 'express';

import userRouter from './usersRouter.js';
import entriesRouter from './entriesRouter.js';

const router = express.Router();

router.use(userRouter);
router.use(entriesRouter);

export default router;

