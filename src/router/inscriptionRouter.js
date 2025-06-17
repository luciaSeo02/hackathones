import express from 'express';

import newInscription from '../controllers/inscriptions/inscripcionHackathonController.js';
import cancelInscription from '../controllers/inscriptions/cancelationInscriptionController.js';
import listInscriptionUser from '../controllers/inscriptions/listUserInscriptionController.js';
import publishRanking from '../controllers/inscriptions/pushClassification.js';
import rateHackathon from '../controllers/inscriptions/rateHackathon.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';

import validateBody from '../middlewares/validateBody.js';
import publishRankingSchema from '../validators/publishRankingSchema.js';
import rateHackathonSchema from '../validators/rateHackathonSchema.js';
import getClassification from '../services/inscriptions/getClassification.js'

const router = express.Router();

router.post(
    '/hackathons/:hackathonId/inscriptions',
    authMiddleware,
    newInscription
);

router.delete(
    '/hackathons/:hackathonId/inscriptions',
    authMiddleware,
    cancelInscription
);

router.get('/inscriptions', authMiddleware, listInscriptionUser);

router.post(
    '/hackathons/:hackathonId/classification',
    authMiddleware,
    isAdminMiddleware,
    validateBody(publishRankingSchema),
    publishRanking
);

router.post(
    '/hackathons/:hackathonId/rating',
    authMiddleware,
    validateBody(rateHackathonSchema),
    rateHackathon
);

router.get('/hackathons/:hackathonId/classification/view', getClassification);

export default router;


