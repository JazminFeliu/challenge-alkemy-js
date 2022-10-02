const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

//ROUTES//

//all transactions and name
router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT u.user_name, t.id, t.description, t.amount, t.date, t.type FROM users AS u LEFT JOIN transactions AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

//create a transaction with autorize user
router.post("/transactions", authorize, async (req, res, next) => {
  try {
    const { description, amount, date, type, category } = req.body;

    const result = await pool.query(
      "INSERT INTO transactions (user_id, description, amount, date, type, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.user.id, description, amount, date, type, category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

//update a transaction with autorize user
router.put("/transactions/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, amount, date, type, category } = req.body;

    const result = await pool.query(
      "UPDATE transactions SET description = $1, amount = $2, date = $3, type = $4, category = $5 WHERE id = $6 AND user_id = $7 RETURNING *",
      [description, amount, date, type, category, id, req.user.id]
    );

    if (result.rows.length === 0)
      res.status(404).json({ message: "This transaction is not yours" });

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

//delete a transaction with autorize user
router.delete("/transactions/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 AND user_id =$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "This transaction is not yours" });

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
