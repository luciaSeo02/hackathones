import express from 'express';

import {
    createHackathonController,
    listHackathonsController,
    getHackathonByIdController,
} from '../controllers/hackathons/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import deleteHackathonController from '../controllers/hackathons/deleteHackathonController.js';
import editHackathonController from '../controllers/hackathons/editHackathonController.js';

const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);
router.delete('/:id', isAdminMiddleware, deleteHackathonController);
router.put('/:id', isAdminMiddleware, editHackathonController);

router.post(
    '/hackathons/create',
    createHackathonController,
    authMiddleware,
    isAdminMiddleware
);

export default router;
