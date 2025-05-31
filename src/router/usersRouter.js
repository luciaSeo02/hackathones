import express from 'express';

import {
    registerUserController,
    loginUserController,
    validateUserController,
    infoUserController,
    editUserController
} from '../controllers/users/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/users/register', registerUserController);
router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.get('/users', authMiddleware, infoUserController);

router.put('/users/edit', authMiddleware, editUserController);



export default router;
