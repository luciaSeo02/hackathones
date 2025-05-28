import express from 'express';

import {
    createHackathonController,
    listHackathonsController,
    getHackathonByIdController
} from '../controllers/hackathons/index.js';

const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);

router.post('/hackathons/create', createHackathonController);


export default router;