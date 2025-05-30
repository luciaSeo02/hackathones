import express from 'express';
import newInscription from '../controllers/inscripcionHackathon.js';
import cancelInscription from '../controllers/cancelationInscription.js';
// import listInscriptionUser from '../services/getInscriptionUser.js';

const router = express.Router();

router.post('/inscription', newInscription);
router.delete('/inscription/:userId/:hackathonId', cancelInscription);
// router.get('/inscription/:userId', listInscriptionUser)

export default router;
