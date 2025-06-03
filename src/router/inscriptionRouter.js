import express from 'express';

import newInscription from '../controllers/inscriptions/inscripcionHackathonController.js';
import cancelInscription from '../controllers/inscriptions/cancelationInscriptionController.js';
import listInscriptionUser from '../controllers/inscriptions/listUserInscriptionController.js';
import publishRanking from '../controllers/inscriptions/pushClassification.js';
import rateHackathon from '../controllers/inscriptions/rateHackathon.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';

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
    isAdminMiddleware,
    publishRanking
);

router.post('/hackathons/:hackathonId/rating', authMiddleware, rateHackathon);



export default router;
