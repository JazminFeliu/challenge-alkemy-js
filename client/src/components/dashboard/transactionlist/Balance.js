import React, { Fragment, useState, useEffect } from "react";
import {} from "@mui/material";

const Balance = ({ allTransactions }) => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    setTransaction(allTransactions);
  }, [allTransactions]);

  let total = 0;

  const calcBalance = async (transaction) => {
    if (transaction.type === "deposit") {
      total = total + transaction.amount;
    } else {
      total = total - transaction.amount;
    }
  };

  return (
    <Fragment>
      <h1>Balance</h1>
      {transaction.length !== 0 &&
        transaction[0].id !== null &&
        transaction.map((transaction) => calcBalance(transaction))}
      <h1>El Balance total es $ {total}</h1>
    </Fragment>
  );
};
export default Balance;
