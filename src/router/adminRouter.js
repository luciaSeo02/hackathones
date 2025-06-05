import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdminMiddleware from '../middlewares/authAdminMiddleware.js';

import createHackathonController from '../controllers/hackathons/createHackathonController.js';
import deleteHackathonController from '../controllers/admin/deleteHackathonController.js';
import editHackathonController from '../controllers/admin/editHackathonController.js';
import attachmentAdminHackathonController from '../controllers/admin/attachmentAdminHackathonController.js';

const router = express.Router();

router.post(
    '/hackathons/create',
    authMiddleware,
    isAdminMiddleware,
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
    editHackathonController
);
router.post(
    '/hackathons/:id/attachments',
    authMiddleware,
    isAdminMiddleware,
    attachmentAdminHackathonController
);

export default router;
