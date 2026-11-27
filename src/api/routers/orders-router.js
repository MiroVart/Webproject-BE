import express from 'express';
import {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
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
    authenticateToken,
    body('order_date')
      .optional()
      .isDate()
      .withMessage('Order date must be in a format yyyy-mm-dd'),
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
      .optional()
      .isDate()
      .withMessage('Order date must be in a format yyyy-mm-dd'),
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
ordersRouter.route('/user/:id').get(authenticateToken, getOrderByUserId);

export default ordersRouter;
