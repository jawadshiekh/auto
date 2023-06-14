const pool = require("../../config/db.config");

const getAllCars = async () => {
  const [results] = await pool.query(
    "SELECT * FROM car"
  );

  return results;
};

const getSingleCar = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM car WHERE id = ?",
    [id]
  );

  return result[0];
};

const createCar = async (body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `INSERT INTO car (name) VALUES (?)`,
        [name]
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const updateCar = async (id, body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `UPDATE car SET name = ? WHERE id = ?`,
        [name, id]
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const deleteCar = async (id) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await pool.query(
        `DELETE FROM car WHERE id = ?`,
        [id]
    );

    await conn.commit();

    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllCars,
  getSingleCar,
  createCar,
  updateCar,
  deleteCar,
};
