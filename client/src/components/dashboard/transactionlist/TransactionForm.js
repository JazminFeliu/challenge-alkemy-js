import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useState } from "react";

export default function TransactionForm(setTransactionsChange) {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const response = await fetch(
        "http://localhost:4000/dashboard/transactions",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(transaction),
        }
      );
      const data = await response.json();
      console.log(data);

      setTransactionsChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 6 }}
          style={{ backgroundColor: "#37474f", padding: "1rem" }}
        >
          <Typography variant="h4" textAlign="center" color="white">
            Add Transaction
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
                  margin: "5rem 0",
                }}
                name="description"
                onChange={handleChange}
                value={transaction.description}
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
                onChange={handleChange}
                value={transaction.amount}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Date"
                name="date"
                type="date"
                onChange={handleChange}
                value={transaction.date}
                sx={{ width: 220 }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  variant="filled"
                  label="Type"
                  name="type"
                  onChange={handleChange}
                  value={transaction.type}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                >
                  <MenuItem value={"deposit"}>Deposit</MenuItem>
                  <MenuItem value={"extract"}>Extract</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="filled"
                label="Write your category"
                name="category"
                onChange={handleChange}
                value={transaction.category}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !transaction.description ||
                  !transaction.amount ||
                  !transaction.date ||
                  !transaction.type ||
                  !transaction.category
                }
              >
                ADD
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
