import express from 'express';

import {
    listHackathonsController,
    getHackathonByIdController,
    autoHackathonsController,
} from '../controllers/hackathons/index.js';


const router = express.Router();

router.get('/hackathons', listHackathonsController);
router.get('/hackathons/:id', getHackathonByIdController);
router.use('/autocomplete', autoHackathonsController); 

export default router;
