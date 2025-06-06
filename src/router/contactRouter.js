import express from 'express';
import contactController from '../controllers/contact/contactController.js';
import validateBody from '../middlewares/validateBody.js';
import contactSchema from '../validators/contactSchema.js';

const router = express.Router();

router.post('/contact', validateBody(contactSchema), contactController);

export default router;
