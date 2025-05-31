import express from 'express';
import contactController from '../controllers/contact/contactController.js';

const router = express.Router();

router.post('/contact', contactController);

export default router;
