import express from 'express';
import {
  getAllDishes,
  getDishById,
  postDish,
  deleteDish,
  putDish,
} from '../controllers/dishes-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/errorHandler.js';
import {body} from 'express-validator';
import {upload, createThumbnail} from '../../middlewares/upload.js';

const dishesRouter = express.Router();

dishesRouter
  .route('/')
  .get(getAllDishes)
  .post(
    authenticateToken,
    upload.single('picture'),
    createThumbnail,
    body('dish_name_en')
      .isLength({min: 5, max: 100})
      .withMessage('Dish name (en) must be min 5 and max 100 characters long'),
    body('dish_name_fi')
      .isLength({min: 5, max: 100})
      .withMessage('Dish name (fi) must be min 5 and max 100 characters long'),
    body('type')
      .isAlpha()
      .withMessage('Type must be alphabetic value')
      .isLength({min: 3, max: 50})
      .withMessage('Type must be min 3 and max 50 characters long'),
    body('weekday')
      .isAlpha()
      .withMessage('Weekday must be alphabetic value')
      .isLength({min: 3, max: 20})
      .withMessage('Weekday must be min 3 and max 20 characters long'),
    body('price').isFloat().withMessage('Price must be a float number'),
    body('calories')
      .optional()
      .isNumeric()
      .withMessage('Calories must be a numeric value'),
    body('carbs')
      .optional()
      .isNumeric()
      .withMessage('Carbs must be a numeric value'),
    body('fat')
      .optional()
      .isNumeric()
      .withMessage('Fat must be a numeric value'),
    body('saturated_fat')
      .optional()
      .isNumeric()
      .withMessage('Saturated fat must be a numeric value'),
    body('protein')
      .optional()
      .isNumeric()
      .withMessage('Protein must be a numeric value'),
    body('fiber')
      .optional()
      .isNumeric()
      .withMessage('Fiber must be a numeric value'),
    body('allergens_en')
      .optional()
      .isString()
      .withMessage('Allergens (en) must be string')
      .isLength({max: 100})
      .withMessage('Allergens (en) must be max 100 characters long'),
    body('allergens_fi')
      .optional()
      .isString()
      .withMessage('Allergens (fi) must be string')
      .isLength({max: 100})
      .withMessage('Allergens (fi) must be max 100 characters long'),
    body('description_en')
      .optional()
      .isString()
      .withMessage('Description (en) must be string')
      .isLength({max: 200})
      .withMessage('Description (en) must be max 100 characters long'),
    body('description_fi')
      .optional()
      .isString()
      .withMessage('Description (fi) must be string')
      .isLength({max: 200})
      .withMessage('Description (fi) must be max 100 characters long'),
    body('filename'),
    body('available')
      .optional()
      .isBoolean()
      .withMessage('Available must be a boolean value'),
    validationErrors,
    postDish
  );
dishesRouter
  .route('/:id')
  .get(getDishById)
  .delete(authenticateToken, deleteDish)
  .put(
    authenticateToken,
    body('dish_name_en')
      .isLength({min: 5, max: 100})
      .withMessage('Dish name (en) must be min 5 and max 100 characters long'),
    body('dish_name_fi')
      .isLength({min: 5, max: 100})
      .withMessage('Dish name (fi) must be min 5 and max 100 characters long'),
    body('type')
      .isAlpha()
      .withMessage('Type must be alphabetic value')
      .isLength({min: 3, max: 50})
      .withMessage('Type must be min 3 and max 50 characters long'),
    body('weekday')
      .isAlpha()
      .withMessage('Weekday must be alphabetic value')
      .isLength({min: 3, max: 20})
      .withMessage('Weekday must be min 3 and max 20 characters long'),
    body('price').isFloat().withMessage('Price must be a float number'),
    body('calories')
      .optional()
      .isNumeric()
      .withMessage('Calories must be a numeric value'),
    body('carbs')
      .optional()
      .isNumeric()
      .withMessage('Carbs must be a numeric value'),
    body('fat')
      .optional()
      .isNumeric()
      .withMessage('Fat must be a numeric value'),
    body('saturated_fat')
      .optional()
      .isNumeric()
      .withMessage('Saturated fat must be a numeric value'),
    body('protein')
      .optional()
      .isNumeric()
      .withMessage('Protein must be a numeric value'),
    body('fiber')
      .optional()
      .isNumeric()
      .withMessage('Fiber must be a numeric value'),
    body('allergens_en')
      .optional()
      .isString()
      .withMessage('Allergens (en) must be string')
      .isLength({max: 100})
      .withMessage('Allergens (en) must be max 100 characters long'),
    body('allergens_fi')
      .optional()
      .isString()
      .withMessage('Allergens (fi) must be string')
      .isLength({max: 100})
      .withMessage('Allergens (fi) must be max 100 characters long'),
    body('description_en')
      .optional()
      .isString()
      .withMessage('Description (en) must be string')
      .isLength({max: 200})
      .withMessage('Description (en) must be max 100 characters long'),
    body('description_fi')
      .optional()
      .isString()
      .withMessage('Description (fi) must be string')
      .isLength({max: 200})
      .withMessage('Description (fi) must be max 100 characters long'),
    body('filename'),
    body('available')
      .optional()
      .isBoolean()
      .withMessage('Available must be a boolean value'),
    validationErrors,
    putDish
  );

export default dishesRouter;
