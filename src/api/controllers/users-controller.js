import {
  listAllUsers,
  findUserById,
  addUser,
  removeUser,
  modifyUser,
} from '../models/users-model.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res, next) => {
  const users = await listAllUsers();
  if (users.error) {
    return next(new Error(users.error));
  } else {
    res.status(200).json(users);
  }
};

const getUserById = async (req, res, next) => {
  const id = Number(req.params.id);
  const user = await findUserById(id);
  if (user.error) {
    return next(new Error(user.error));
  } else {
    res.status(200).json(user);
  }
};

const postUser = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const result = await addUser(req.body);
  console.log('result', result);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(201).json({message: 'New user added.', result});
  }
};

const deleteUser = async (req, res, next) => {
  console.log(res.locals.user);
  const result = await removeUser(Number(req.params.id), res.locals.user);
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(204).json({message: 'User removed!'});
  }
};

const putUser = async (req, res, next) => {
  console.log(res.locals.user);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const result = await modifyUser(
    Number(req.params.id),
    req.body,
    res.locals.user
  );
  if (result.error) {
    return next(new Error(result.error));
  } else {
    res.status(200).json({message: 'User modified!'});
  }
};

export {getAllUsers, getUserById, postUser, deleteUser, putUser};
