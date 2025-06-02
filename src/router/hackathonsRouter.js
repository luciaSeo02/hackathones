import express from 'express';

import {
    createHackathonController,
    listHackathonsController,
    getHackathonByIdController
} from '../controllers/hackathons/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';

import validateBody  from '../middlewares/validateBody.js';
import hackathonSchema from '../validators/hackathonSchema.js';

const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);

router.post('/hackathons/create', 
    createHackathonController,
    authMiddleware,
    isAdminMiddleware,
    validateBody(hackathonSchema)
);


export default router;