import express from 'express';

import newInscription from '../controllers/inscriptions/inscripcionHackathon.js';
import cancelInscription from '../controllers/inscriptions/cancelationInscription.js';
import listInscriptionUser from '../controllers/inscriptions/listUserInscription.js';

import authMiddleware from '../middlewares/authMiddleware.js';

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

export default router;
