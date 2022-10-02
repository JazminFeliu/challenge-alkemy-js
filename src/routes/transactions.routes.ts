const { Router } = require("express");
const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.controller");

const router = Router();

router.get("/transactions", getAllTransactions);

router.get("/transaction/:id", getTransaction);

router.post("/transactions", createTransaction);

router.put("/transaction/:id", updateTransaction);

router.delete("/transaction/:id", deleteTransaction);

module.exports = router;
