const { request } = require("http");
const pool = require("../db");

//ROUTES//

//Get all Transactions
const getAllTransactions = async (req, res, next) => {
  try {
    const allTransactions = await pool.query("SELECT * FROM transactions");

    res.json(allTransactions.rows);
  } catch (err) {
    next(err);
  }
};

//Get a transaction
const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Transaction not found",
      });

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

//create a transaction
const createTransaction = async (req, res, next) => {
  try {
    const { description, amount, date, type } = req.body;

    const result = await pool.query(
      "INSERT INTO transactions (description, amount, date, type) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, amount, date, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

//update a transaction
const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, amount, date, type } = req.body;

    const result = await pool.query(
      "UPDATE transactions SET description = $1, amount = $2, date = $3, type = $4,  WHERE id = $6 RETURNING *",
      [description, amount, date, type, id]
    );

    console.log(id, description, amount, date, type);

    if (result.rows.length === 0)
      res.status(404).json({ message: "Transaction not found" });

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

//delete a transaction
const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM transactions WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Transaction not found",
      });

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
