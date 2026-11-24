import express from 'express';
import {
  getAllOrders,
  getOrderById,
  postOrder,
  deleteOrder,
  putOrder,
} from '../controllers/orders-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/errorHandler.js';
import {body} from 'express-validator';

const ordersRouter = express.Router();

ordersRouter
  .route('/')
  .get(getAllOrders)
  .post(
    body('order_date')
      .isDate()
      .withMessage('Order date must be in a format yyyy-mm-dd'),
    body('dish_1').isInt().withMessage('Dish 1 must be an integer value'),
    body('dish_1_amount')
      .optional()
      .isInt()
      .withMessage('Dish 1 amount must be an integer value'),
    body('dish_2')
      .optional()
      .isInt()
      .withMessage('Dish 2 must be an integer value'),
    body('dish_2_amount')
      .optional()
      .isInt()
      .withMessage('Dish 2 amount must be an integer value'),
    body('dish_3')
      .optional()
      .isInt()
      .withMessage('Dish 3 must be an integer value'),
    body('dish_3_amount')
      .optional()
      .isInt()
      .withMessage('Dish 3 amount must be an integer value'),
    body('dish_4')
      .optional()
      .isInt()
      .withMessage('Dish 4 must be an integer value'),
    body('dish_4_amount')
      .optional()
      .isInt()
      .withMessage('Dish 4 amount must be an integer value'),
    body('dish_5')
      .optional()
      .isInt()
      .withMessage('Dish 5 must be an integer value'),
    body('dish_5_amount')
      .optional()
      .isInt()
      .withMessage('Dish 5 amount must be an integer value'),
    body('dish_6')
      .optional()
      .isInt()
      .withMessage('Dish 6 must be an integer value'),
    body('dish_6_amount')
      .optional()
      .isInt()
      .withMessage('Dish 6 amount must be an integer value'),
    body('dish_7')
      .optional()
      .isInt()
      .withMessage('Dish 7 must be an integer value'),
    body('dish_7_amount')
      .optional()
      .isInt()
      .withMessage('Dish 7 amount must be an integer value'),
    body('dish_8')
      .optional()
      .isInt()
      .withMessage('Dish 8 must be an integer value'),
    body('dish_8_amount')
      .optional()
      .isInt()
      .withMessage('Dish 8 amount must be an integer value'),
    body('dish_9')
      .optional()
      .isInt()
      .withMessage('Dish 9 must be an integer value'),
    body('dish_9_amount')
      .optional()
      .isInt()
      .withMessage('Dish 9 amount must be an integer value'),
    body('dish_10')
      .optional()
      .isInt()
      .withMessage('Dish 10 must be an integer value'),
    body('dish_10_amount')
      .optional()
      .isInt()
      .withMessage('Dish 10 amount must be an integer value'),
    body('price').isFloat().withMessage('Price must be a float value'),
    body('finished')
      .optional()
      .isInt()
      .withMessage('Finished must be an integer value'),
    body('pickedup')
      .optional()
      .isInt()
      .withMessage('Pickedup must be an integer value'),
    validationErrors,
    postOrder
  );
ordersRouter
  .route('/:id')
  .get(getOrderById)
  .delete(authenticateToken, deleteOrder)
  .put(
    authenticateToken,
    body('order_date')
      .isDate()
      .withMessage('Order date must be in a format yyyy-mm-dd'),
    body('dish_1').isInt().withMessage('Dish 1 must be an integer value'),
    body('dish_1_amount')
      .optional()
      .isInt()
      .withMessage('Dish 1 amount must be an integer value'),
    body('dish_2')
      .optional()
      .isInt()
      .withMessage('Dish 2 must be an integer value'),
    body('dish_2_amount')
      .optional()
      .isInt()
      .withMessage('Dish 2 amount must be an integer value'),
    body('dish_3')
      .optional()
      .isInt()
      .withMessage('Dish 3 must be an integer value'),
    body('dish_3_amount')
      .optional()
      .isInt()
      .withMessage('Dish 3 amount must be an integer value'),
    body('dish_4')
      .optional()
      .isInt()
      .withMessage('Dish 4 must be an integer value'),
    body('dish_4_amount')
      .optional()
      .isInt()
      .withMessage('Dish 4 amount must be an integer value'),
    body('dish_5')
      .optional()
      .isInt()
      .withMessage('Dish 5 must be an integer value'),
    body('dish_5_amount')
      .optional()
      .isInt()
      .withMessage('Dish 5 amount must be an integer value'),
    body('dish_6')
      .optional()
      .isInt()
      .withMessage('Dish 6 must be an integer value'),
    body('dish_6_amount')
      .optional()
      .isInt()
      .withMessage('Dish 6 amount must be an integer value'),
    body('dish_7')
      .optional()
      .isInt()
      .withMessage('Dish 7 must be an integer value'),
    body('dish_7_amount')
      .optional()
      .isInt()
      .withMessage('Dish 7 amount must be an integer value'),
    body('dish_8')
      .optional()
      .isInt()
      .withMessage('Dish 8 must be an integer value'),
    body('dish_8_amount')
      .optional()
      .isInt()
      .withMessage('Dish 8 amount must be an integer value'),
    body('dish_9')
      .optional()
      .isInt()
      .withMessage('Dish 9 must be an integer value'),
    body('dish_9_amount')
      .optional()
      .isInt()
      .withMessage('Dish 9 amount must be an integer value'),
    body('dish_10')
      .optional()
      .isInt()
      .withMessage('Dish 10 must be an integer value'),
    body('dish_10_amount')
      .optional()
      .isInt()
      .withMessage('Dish 10 amount must be an integer value'),
    body('price').isFloat().withMessage('Price must be a float value'),
    body('finished')
      .optional()
      .isInt()
      .withMessage('Finished must be an integer value'),
    body('pickedup')
      .optional()
      .isInt()
      .withMessage('Pickedup must be an integer value'),
    validationErrors,
    putOrder
  );

export default ordersRouter;
