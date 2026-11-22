import express from 'express';
import userRouter from './routers/users-router.js';
import authRouter from './routers/auth-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
