const pool = require("../../config/db.config");

const getAllBooks = async () => {
  const [results] = await pool.query(
    "SELECT * FROM books"
  );

  return results;
};

const getSingleBooks = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM books WHERE id = ?",
    [id]
  );

  return result[0];
};

const createBooks = async (body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `INSERT INTO books (name) VALUES (?)`,
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

const updateBooks = async (id, body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `UPDATE books SET name = ? WHERE id = ?`,
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

const deleteBooks = async (id) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await pool.query(
        `DELETE FROM books WHERE id = ?`,
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
  getAllBooks,
  getSingleBooks,
  createBooks,
  updateBooks,
  deleteBooks,
};
