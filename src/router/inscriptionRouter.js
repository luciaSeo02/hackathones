import express from 'express';

import newInscription from '../controllers/inscriptions/inscripcionHackathonController.js';
import cancelInscription from '../controllers/inscriptions/cancelationInscriptionController.js';
import listInscriptionUser from '../controllers/inscriptions/listUserInscriptionController.js';

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
