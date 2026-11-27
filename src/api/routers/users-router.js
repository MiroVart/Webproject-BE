import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
  deleteUser,
  putUser,
} from '../controllers/users-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/errorHandler.js';
import {body} from 'express-validator';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getAllUsers)
  .post(
    body('name')
      .isAlphanumeric()
      .withMessage('Name must be alphanumeric value')
      .isLength({min: 3, max: 50})
      .withMessage('Name must be min 3 and max 50 characters long'),
    body('username')
      .isAlphanumeric()
      .withMessage('Username must be alphanumeric value')
      .isLength({min: 3, max: 30})
      .withMessage('Username must be min 3 and max 30 characters long'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be in a format (name@something.som)'),
    body('password')
      .isLength({min: 8, max: 20})
      .withMessage('Password must be min 8 and max 20 characters long'),
    body('role')
      .optional()
      .isAlpha()
      .withMessage('Role must be in alphabet format'),
    body('bonuscard_uses')
      .optional()
      .isNumeric()
      .withMessage('Bonus card uses must be a numeric value'),
    validationErrors,
    postUser
  );
userRouter
  .route('/:id')
  .get(getUserById)
  .delete(authenticateToken, deleteUser)
  .put(
    authenticateToken,
    body('name')
      .isAlphanumeric()
      .withMessage('Name must be alphanumeric value')
      .isLength({min: 3, max: 50})
      .withMessage('Name must be min 3 and max 50 characters long'),
    body('username')
      .isAlphanumeric()
      .withMessage('Username must be alphanumeric value')
      .isLength({min: 3, max: 30})
      .withMessage('Username must be min 3 and max 30 characters long'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be in a format (name@something.som)'),
    body('password')
      .isLength({min: 8, max: 20})
      .withMessage('Password must be min 8 and max 20 characters long'),
    body('role')
      .optional()
      .isAlpha()
      .withMessage('Role must be in alphabet format'),
    body('bonuscard_uses')
      .optional()
      .isNumeric()
      .withMessage('Bonus card uses must be a numeric value'),
    validationErrors,
    putUser
  );

export default userRouter;
