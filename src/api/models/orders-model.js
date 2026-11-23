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
  return rows[0];
};

const addOrder = async (order /*, customer_id*/) => {
  const {
    //Väliaikainen ratkaisu id:n sijoitukselle
    customer_id,
    order_date,
    dish_1,
    dish_1_amount,
    dish_2,
    dish_2_amount,
    dish_3,
    dish_3_amount,
    dish_4,
    dish_4_amount,
    dish_5,
    dish_5_amount,
    dish_6,
    dish_6_amount,
    dish_7,
    dish_7_amount,
    dish_8,
    dish_8_amount,
    dish_9,
    dish_9_amount,
    dish_10,
    dish_10_amount,
    price,
    finished,
    pickedup,
  } = order;
  const sql = `INSERT INTO wsk_orders (customer_id, order_date,
    dish_1,
    dish_1_amount,
    dish_2,
    dish_2_amount,
    dish_3,
    dish_3_amount,
    dish_4,
    dish_4_amount,
    dish_5,
    dish_5_amount,
    dish_6,
    dish_6_amount,
    dish_7,
    dish_7_amount,
    dish_8,
    dish_8_amount,
    dish_9,
    dish_9_amount,
    dish_10,
    dish_10_amount,
    price,
    finished,
    pickedup)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    customer_id,
    order_date ?? new Date(),
    dish_1,
    dish_1_amount ?? 1,
    dish_2 ?? null,
    dish_2_amount ?? 0,
    dish_3 ?? null,
    dish_3_amount ?? 0,
    dish_4 ?? null,
    dish_4_amount ?? 0,
    dish_5 ?? null,
    dish_5_amount ?? 0,
    dish_6 ?? null,
    dish_6_amount ?? 0,
    dish_7 ?? null,
    dish_7_amount ?? 0,
    dish_8 ?? null,
    dish_8_amount ?? 0,
    dish_9 ?? null,
    dish_9_amount ?? 0,
    dish_10 ?? null,
    dish_10_amount ?? 0,
    price ?? 0,
    finished ?? 0,
    pickedup ?? 0,
  ];
  const [result] = await promisePool.execute(sql, params);
  console.log('insert query result', result);
  if (result.affectedRows === 0) {
    return false;
  }
  return {order_id: result.insertId /*customer_id: customer*/};
};

const modifyOrder = async (id, order) => {
  const sql = promisePool.format(`UPDATE wsk_orders SET ? WHERE order_id = ?`, [
    order,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return true;
};

const removeOrder = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_orders WHERE order_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return true;
};

export {listAllOrders, findOrderById, addOrder, modifyOrder, removeOrder};
