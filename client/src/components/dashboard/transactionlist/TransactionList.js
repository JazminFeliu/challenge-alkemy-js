import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import TransactionEdit from "./TransactionEdit";

export default function TransactionList({
  allTransactions,
  setTransactionsChange,
  balance,
}) {
  const [transaction, setTransaction] = useState([]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/dashboard/transactions/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      setTransaction(
        transaction.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setTransaction(allTransactions);
  }, [allTransactions]);

  function calcBalance(allTransactions) {
    let total = 0;

    allTransactions.forEach((transaction) =>
      transaction.type === "deposit"
        ? (total = total + Number.parseFloat(transaction.amount))
        : (total = total - Number.parseFloat(transaction.amount))
    );

    return total;
  }

  return (
    <>
      <Typography variant="h4" textAlign="center" color=" #a6a6a6">
        Total Balance = $ {calcBalance(allTransactions)}
      </Typography>
      <h1>Transaction List</h1>
      {transaction.length !== 0 &&
        transaction[0].id !== null &&
        transaction.map((transaction) => (
          <Card
            style={{
              marginBottom: ".5rem",
              backgroundColor: "#1e272e",
              padding: "5px",
            }}
            key={transaction.id}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "white" }}>
                <Typography>{transaction.description}</Typography>
                <Typography>{transaction.amount}</Typography>
                <Typography>{transaction.date}</Typography>
                <Typography>{transaction.type}</Typography>
                <Typography>{transaction.category}</Typography>
              </div>
              <div>
                <td>
                  <TransactionEdit
                    transaction={transaction}
                    setTransactionsChange={setTransactionsChange}
                    balance={calcBalance}
                  />

                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(transaction.id)}
                    style={{ marginLeft: ".5rem" }}
                  >
                    Delete
                  </Button>
                </td>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
