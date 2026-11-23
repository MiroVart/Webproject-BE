import express from 'express';
import userRouter from './routers/users-router.js';
import authRouter from './routers/auth-router.js';
import dishesRouter from './routers/dishes-router.js';
import ordersRouter from './routers/orders-router.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/dishes', dishesRouter);
router.use('/orders', ordersRouter);

export default router;
