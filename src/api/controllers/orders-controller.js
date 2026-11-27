import {
  listAllOrders,
  findOrderById,
  findOrderByUserId,
  addOrder,
  modifyOrder,
  removeOrder,
} from '../models/orders-model.js';

const getAllOrders = async (req, res, next) => {
  const orders = await listAllOrders();
  if (orders.error) {
    return next(new Error(orders.error));
  } else {
    res.status(200).json(orders);
  }
};

const getOrderById = async (req, res, next) => {
  const id = Number(req.params.id);
  const order = await findOrderById(id);
  if (order.error) {
    return next(new Error(order.error));
  } else {
    res.status(200).json(order);
  }
};

const getOrderByUserId = async (req, res, next) => {
  const order = await findOrderByUserId(res.locals.user.user_id);
  if (order.error) {
    return next(new Error(order.error));
  } else {
    res.status(200).json(order);
  }
};

const postOrder = async (req, res, next) => {
  console.log(res.locals.user);
  console.log(req.body);
  const result = await addOrder(req.body, res.locals.user);
  console.log('result', result);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(201).json({message: 'New order added.', result});
  }
};

const deleteOrder = async (req, res, next) => {
  console.log(res.locals.user);
  const result = await removeOrder(Number(req.params.id), res.locals.user);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(204).json({message: 'Order removed!'});
  }
};

const putOrder = async (req, res, next) => {
  console.log(res.locals.user);
  const result = await modifyOrder(
    Number(req.params.id),
    req.body,
    res.locals.user
  );
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(200).json({message: 'Order modified!'});
  }
};

export {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  postOrder,
  deleteOrder,
  putOrder,
};
