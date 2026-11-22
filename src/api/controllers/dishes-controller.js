import {
  listAllDishes,
  findDishById,
  addDish,
  modifyDish,
  removeDish,
} from '../models/dishes-model.js';

const getAllDishes = async (req, res, next) => {
  const dishes = await listAllDishes();
  if (dishes.error) {
    return next(new Error(dishes.error));
  } else {
    res.status(200).json(dishes);
  }
};

const getDishById = async (req, res, next) => {
  const id = Number(req.params.id);
  const dish = await findDishById(id);
  if (dish.error) {
    return next(new Error(dish.error));
  } else {
    res.status(200).json(dish);
  }
};

const postDish = async (req, res, next) => {
  const result = await addDish(req.body);
  console.log('result', result);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(201).json({message: 'New dish added.', result});
  }
};

const deleteDish = async (req, res, next) => {
  const result = await removeDish(Number(req.params.id));
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(204).json({message: 'Dish removed!'});
  }
};

const putDish = async (req, res, next) => {
  const result = await modifyDish(Number(req.params.id), req.body);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(200).json({message: 'Dish modified!'});
  }
};

export {getAllDishes, getDishById, postDish, deleteDish, putDish};
