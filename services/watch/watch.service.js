const pool = require("../../config/db.config");

const getAllWatches = async () => {
  const [results] = await pool.query(
    "SELECT * FROM watch"
  );

  return results;
};

const getSingleWatch = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM watch WHERE id = ?",
    [id]
  );

  return result[0];
};

const createWatch = async (body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `INSERT INTO watch (name) VALUES (?)`,
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

const updateWatch = async (id, body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `UPDATE watch SET name = ? WHERE id = ?`,
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

const deleteWatch = async (id) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await pool.query(
        `DELETE FROM watch WHERE id = ?`,
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
  getAllWatches,
  getSingleWatch,
  createWatch,
  updateWatch,
  deleteWatch,
};
