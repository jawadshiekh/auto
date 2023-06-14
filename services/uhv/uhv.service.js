const pool = require("../../config/db.config");

const getAllUhvs = async () => {
  const [results] = await pool.query(
    "SELECT * FROM uhv"
  );

  return results;
};

const getSingleUhv = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM uhv WHERE id = ?",
    [id]
  );

  return result[0];
};

const createUhv = async (body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `INSERT INTO uhv (name) VALUES (?)`,
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

const updateUhv = async (id, body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `UPDATE uhv SET name = ? WHERE id = ?`,
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

const deleteUhv = async (id) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await pool.query(
        `DELETE FROM uhv WHERE id = ?`,
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
  getAllUhvs,
  getSingleUhv,
  createUhv,
  updateUhv,
  deleteUhv,
};
