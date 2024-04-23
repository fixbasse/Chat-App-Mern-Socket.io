import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller';
import protectRoute from '../middleware/middleware';

const router = express.Router();

// userId will use at controller, need to match
router.post('/send/:userId', protectRoute, sendMessage);
router.get('/:userId', protectRoute, getMessages);

export default router;