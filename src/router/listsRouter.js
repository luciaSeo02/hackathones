import express from 'express';

import {
    listTopicsController,
    listTechnologiesController,
} from '../controllers/lists/index.js';


const router = express.Router();

router.get('/lists/topics', listTopicsController);

router.get('/lists/technologies', listTechnologiesController);



export default router;
