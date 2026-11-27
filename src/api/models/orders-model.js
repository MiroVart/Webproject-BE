import promisePool from '../../utils/db.js';

const listAllOrders = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_orders');
  console.log('rows', rows);
  return rows;
};

const findOrderById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_orders WHERE order_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findOrderByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_orders WHERE customer_id = ?',
    [userId]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const addOrder = async (orders, customer) => {
  const [maxRows] = await promisePool.execute(
    'SELECT COALESCE(MAX(order_id), 0) + 1 AS nextOrderId FROM wsk_orders FOR UPDATE'
  );
  console.log(customer.user_id);
  //console.log(maxRows);
  const nextOrderId = maxRows[0].nextOrderId;
  //console.log(nextOrderId);
  const order_date = orders.order_date ?? new Date();
  //console.log(order_date);
  const finished = orders.finished ?? 0;
  //console.log(finished);
  const pickedup = orders.pickedup ?? 0;
  //console.log(pickedup);
  const items = Array.isArray(orders.items) ? orders.items : [orders];
  console.log(items);
  const sql = `INSERT INTO wsk_orders (order_id, customer_id, order_date,
    dishes_id,
    dish_amount,
    finished,
    pickedup)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  for (let item of items) {
    const params = [
      nextOrderId,
      customer.user_id,
      order_date ?? new Date(),
      item.dishes_id,
      item.dish_amount ?? 1,
      finished ?? 0,
      pickedup ?? 0,
    ];
    const [result] = await promisePool.execute(sql, params);
    console.log('insert query result', result);
    if (result.affectedRows === 0) {
      return false;
    }
  }
  return {order_id: nextOrderId, customer_id: customer.user_id};
};

const modifyOrder = async (id, order, loggedUser) => {
  let mainSql = 'UPDATE wsk_orders SET ? WHERE ';
  let params;
  if (loggedUser.role === 'admin') {
    mainSql += `id = ?`;
    params = [order, id];
  } else if (loggedUser.role === 'user') {
    mainSql += `id = ? AND customer_id = ?`;
    params = [order, id, loggedUser.user_id];
  } else {
    return false;
  }
  const sql = promisePool.format(mainSql, params);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return true;
};

const removeOrder = async (id, loggedUser) => {
  let mainSql = 'DELETE FROM wsk_orders WHERE ';
  let params;
  if (loggedUser.role === 'admin') {
    mainSql += `id = ?`;
    params = [id];
  } else if (loggedUser.role === 'user') {
    mainSql += `id = ? AND customer_id = ?`;
    params = [id, loggedUser.user_id];
  } else {
    return false;
  }
  const [rows] = await promisePool.execute(mainSql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return true;
};

export {
  listAllOrders,
  findOrderById,
  findOrderByUserId,
  addOrder,
  modifyOrder,
  removeOrder,
};
