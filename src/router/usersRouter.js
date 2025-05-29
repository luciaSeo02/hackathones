import express from 'express';

import authMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/users', authMiddleware);



export default router;
