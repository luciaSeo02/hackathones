import express from 'express';

import {
    listHackathonsController,
    getHackathonByIdController,
} from '../controllers/hackathons/index.js';




const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);

export default router;
