import express from 'express';

import {
    createHackathonController,
    listHackathonsController,
    getHackathonByIdController,
} from '../controllers/hackathons/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import deleteHackathonController from '../controllers/admin/deleteHackathonController.js';
import editHackathonController from '../controllers/admin/editHackathonController.js';
import attachmentAdminHackathonController from '../controllers/admin/attachmentAdminHackathonController.js';

const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);
router.delete('/:id',authMiddleware, isAdminMiddleware, deleteHackathonController);
router.put('/:id', authMiddleware, isAdminMiddleware,editHackathonController);
router.post('/hackathons/:id/attachments', authMiddleware, isAdminMiddleware, attachmentAdminHackathonController);

router.post(
    '/hackathons/create',
    createHackathonController,
    authMiddleware,
    isAdminMiddleware
);

export default router;
