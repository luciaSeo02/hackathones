import express from 'express';

import {
    createHackathonController,
    listHackathonsController,
    getHackathonByIdController,
} from '../controllers/hackathons/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import deleteHackathonController from '../controllers/hackathons/deleteHackathonController.js';
import editHackathonController from '../controllers/hackathons/editHackathonController.js';

const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);
router.delete('/:id', authAdminMiddleware, deleteHackathonController);
router.put('/:id', authAdminMiddleware, editHackathonController);

router.post(
    '/hackathons/create',
    createHackathonController,
    authMiddleware,
    authAdminMiddleware
);

export default router;
