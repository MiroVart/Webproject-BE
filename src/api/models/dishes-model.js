import promisePool from '../../utils/db.js';

const listAllDishes = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_dishes');
  console.log('rows', rows);
  return rows;
};

const findDishById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_dishes WHERE dish_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addDish = async (dish, loggedUser) => {
  if (loggedUser.role === 'admin') {
    const {
      dish_name_en,
      dish_name_fi,
      type,
      weekday,
      price,
      calories,
      carbs,
      fat,
      saturated_fat,
      protein,
      fiber,
      allergens_en,
      allergens_fi,
      description_en,
      description_fi,
      filename,
      available,
    } = dish;
    const sql = `INSERT INTO wsk_dishes (dish_name_en, dish_name_fi, type, weekday, price, calories, carbs, fat, saturated_fat, protein, fiber, allergens_en, allergens_fi, description_en, description_fi, filename, available)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      dish_name_en,
      dish_name_fi,
      type,
      weekday,
      price,
      calories ?? 0,
      carbs ?? 0,
      fat ?? 0,
      saturated_fat ?? 0,
      protein ?? 0,
      fiber ?? 0,
      allergens_en ?? '-',
      allergens_fi ?? '-',
      description_en ?? '-',
      description_fi ?? '-',
      filename ?? 'img-placeholder',
      available ?? true,
    ];
    const [result] = await promisePool.execute(sql, params);
    console.log('insert query result', result);
    if (result.affectedRows === 0) {
      return false;
    }
    return {dish_id: result.insertId};
  } else {
    return false;
  }
};

const modifyDish = async (id, dish, loggedUser) => {
  if (loggedUser.role === 'admin') {
    const sql = promisePool.format(
      `UPDATE wsk_dishes SET ? WHERE dish_id = ?`,
      [dish, id]
    );
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};

const removeDish = async (id, loggedUser) => {
  if (loggedUser.role === 'admin') {
    const [rows] = await promisePool.execute(
      'DELETE FROM wsk_dishes WHERE dish_id = ?',
      [id]
    );
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};

export {listAllDishes, findDishById, addDish, modifyDish, removeDish};
