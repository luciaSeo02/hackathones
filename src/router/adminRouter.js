import express from 'express';
import fileUpload from 'express-fileupload';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';

import validateBody from '../middlewares/validateBody.js';
import hackathonSchema from '../validators/hackathonSchema.js';
import editHackathonSchema from '../validators/editHackathonSchema.js';

import createHackathonController from '../controllers/hackathons/createHackathonController.js';
import deleteHackathonController from '../controllers/admin/deleteHackathonController.js';
import editHackathonController from '../controllers/admin/editHackathonController.js';
import attachmentAdminHackathonController from '../controllers/admin/attachmentAdminHackathonController.js';
import attachmentSchema from '../validators/attachmentHackathonSchema.js';

const router = express.Router();

router.post(
    '/hackathons/create',
    authMiddleware,
    isAdminMiddleware,
    validateBody(hackathonSchema),
    createHackathonController
);
router.delete(
    '/hackathons/:id',
    authMiddleware,
    isAdminMiddleware,
    deleteHackathonController
);
router.put(
    '/hackathons/:id',
    authMiddleware,
    isAdminMiddleware,
    validateBody(editHackathonSchema),
    editHackathonController
);
router.post(
    '/hackathons/:id/attachments',
    authMiddleware,
    isAdminMiddleware,
    validateBody(attachmentSchema),
    attachmentAdminHackathonController
);

export default router;
