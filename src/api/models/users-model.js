import promisePool from '../../utils/db.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password, role, bonuscard_uses} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role, bonuscard_uses)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    name,
    username,
    email,
    password,
    role ?? 'user',
    bonuscard_uses ?? 0,
  ];
  const [result] = await promisePool.execute(sql, params);
  console.log('insert query result', result);
  if (result.affectedRows === 0) {
    return false;
  }
  return {user_id: result.insertId};
};

const modifyUser = async (id, user, loggedUser) => {
  let userData;
  let userId;
  if (loggedUser.role === 'admin') {
    userData = user;
    userId = id;
  } else if (loggedUser.role === 'user') {
    userData = loggedUser;
    userId = loggedUser.user_id;
  } else {
    return false;
  }
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    userData,
    userId,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return true;
};

const removeUser = async (id, loggedUser) => {
  let userId;
  if (loggedUser.role === 'admin') {
    userId = id;
  } else if (loggedUser.role === 'user') {
    userId = loggedUser.user_id;
  } else {
    return false;
  }
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_users WHERE user_id = ?',
    [userId]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return true;
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  modifyUser,
  removeUser,
};
