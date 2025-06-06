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

import validateBody from '../middlewares/validateBody.js';
import registerUserSchema from '../validators/registerUserSchema.js';
import loginUserSchema from '../validators/loginUserSchema.js';
import editUserSchema from '../validators/editUserSchema.js';
import changePasswordSchema from '../validators/changePasswordSchema.js';
import recoverPassSchema from '../validators/recoverPassSchema.js';
import editPasswordSchema from '../validators/editPasswordSchema.js';

const router = express.Router();

router.post(
    '/users/register',
    validateBody(registerUserSchema),
    registerUserController
);
router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', validateBody(loginUserSchema), loginUserController);

router.get('/users', authMiddleware, infoUserController);

router.put(
    '/users/edit',
    validateBody(editUserSchema),
    authMiddleware,
    editUserController
);

router.put(
    '/users/password/change',
    validateBody(changePasswordSchema),
    authMiddleware,
    changePasswordController
);

router.put('/users/avatar', authMiddleware, editAvatarController);

router.post(
    '/users/password/recover',
    validateBody(recoverPassSchema),
    RecoverPassController
);

router.put(
    '/users/password/edit',
    validateBody(editPasswordSchema),
    authMiddleware,
    editPasswordController
);

export default router;
