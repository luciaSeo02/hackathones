import express from 'express';

import {
    registerUserController,
    loginUserController,
    validateUserController,
    infoUserController,
    editUserController,
    editAvatarController,
    RecoverPassController,
    editPasswordController,
    changePasswordController,
} from '../controllers/users/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/users/register', registerUserController);
router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.get('/users', authMiddleware, infoUserController);

router.put('/users/edit', authMiddleware, editUserController);

router.put('/users/password/change', authMiddleware, changePasswordController);

router.put('/users/avatar', authMiddleware, editAvatarController);

router.post('/users/password/recover', RecoverPassController);

router.put('/users/password/edit', authMiddleware, editPasswordController);

export default router;
