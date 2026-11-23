import {
  listAllOrders,
  findOrderById,
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

const postOrder = async (req, res, next) => {
  //const customerId = res.locals.user;
  //console.log(customerId);
  const result = await addOrder(req.body /*, customerId*/);
  console.log('result', result);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(201).json({message: 'New order added.', result});
  }
};

const deleteOrder = async (req, res, next) => {
  const result = await removeOrder(Number(req.params.id));
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(204).json({message: 'Order removed!'});
  }
};

const putOrder = async (req, res, next) => {
  const result = await modifyOrder(Number(req.params.id), req.body);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(200).json({message: 'Order modified!'});
  }
};

export {getAllOrders, getOrderById, postOrder, deleteOrder, putOrder};
