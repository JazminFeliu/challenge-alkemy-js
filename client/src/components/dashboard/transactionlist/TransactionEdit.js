import React, { Fragment, useState } from "react";
import {
  Button,
  TextField,
  CardContent,
  Typography,
  Box,
  Modal,
} from "@mui/material";

const TransactionEdit = ({ transaction, setTransactionsChange }) => {
  const editTransaction = async (id) => {
    const myHeaders = new Headers();

    try {
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description, amount, date, type };
      await fetch(`http://localhost:4000/dashboard/transactions/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTransactionsChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);
  const [type, setType] = useState(transaction.type);
  //const [category, setCategory] = useState(transaction.category);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#37474f",
    color: "black",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Transaction Edit
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: "3rem 0",
                }}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Write your amount"
                sx={{
                  display: "block",
                  margin: "5rem 0",
                }}
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                variant="filled"
                label="Date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                disabled
                label="Type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              {/* <TextField
                variant="filled"
                label="Write your category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              /> */}
            </form>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => editTransaction(transaction.id)}
            >
              Save
            </Button>
          </CardContent>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
};
export default TransactionEdit;
