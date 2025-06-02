import express from 'express';

import {
    listTopicsController
} from '../controllers/lists/index.js';

const router = express.Router();

router.get('/lists/topics', listTopicsController);

export default router;