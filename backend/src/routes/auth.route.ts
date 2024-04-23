import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import protectRoute from "../middleware/middleware";

const router = express.Router();

router.post('/sign-up', signup);
router.post('/login', login);
router.post('/log-out', logout);

export default router;