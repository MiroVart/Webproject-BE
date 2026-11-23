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

ordersRouter.route('/').get(getAllOrders).post(
  /*authenticateToken,*/
  body('order_date')
    .isDate()
    .withMessage('Order date must be in a format yyyy-mm-dd'),
  body('dish_1').isInt().withMessage('Dish 1 must be a numeric value'),
  body('dish_1_amount')
    .isInt()
    .withMessage('Dish 1 amount must be a numeric value'),
  body('dish_2'),
  body('dish_2_amount'),
  body('dish_3'),
  body('dish_3_amount'),
  body('dish_4'),
  body('dish_4_amount'),
  body('dish_5'),
  body('dish_5_amount'),
  body('dish_6'),
  body('dish_6_amount'),
  body('dish_7'),
  body('dish_7_amount'),
  body('dish_8'),
  body('dish_8_amount'),
  body('dish_9'),
  body('dish_9_amount'),
  body('dish_10'),
  body('dish_10_amount'),
  body('price').isFloat().withMessage('Price must be a float value'),
  body('finished').isInt().withMessage('Finished must be an integer value'),
  body('pickedup').isInt().withMessage('Pickedup must be an integer value'),
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
    body('dish_1').isInt().withMessage('Dish 1 must be a numeric value'),
    body('dish_1_amount')
      .isInt()
      .withMessage('Dish 1 amount must be a numeric value'),
    body('dish_2'),
    body('dish_2_amount'),
    body('dish_3'),
    body('dish_3_amount'),
    body('dish_4'),
    body('dish_4_amount'),
    body('dish_5'),
    body('dish_5_amount'),
    body('dish_6'),
    body('dish_6_amount'),
    body('dish_7'),
    body('dish_7_amount'),
    body('dish_8'),
    body('dish_8_amount'),
    body('dish_9'),
    body('dish_9_amount'),
    body('dish_10'),
    body('dish_10_amount'),
    body('price').isFloat().withMessage('Price must be a float value'),
    body('finished').isInt().withMessage('Finished must be an integer value'),
    body('pickedup').isInt().withMessage('Pickedup must be an integer value'),
    validationErrors,
    putOrder
  );

export default ordersRouter;
