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
  CircularProgress,
} from "@mui/material";

import { useState } from "react";

export default function TransactionForm(setTransactionsChange) {
  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

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

      setLoading(false);
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
          style={{ backgroundColor: "#4C6793", padding: "1rem" }}
        >
          <Typography variant="h4" textAlign="center" color="white">
            Add Transaction
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Description"
                multiline
                rows={3}
                sx={{
                  margin: "2rem 0",
                }}
                name="description"
                onChange={handleChange}
                value={transaction.description}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Amount"
                sx={{
                  margin: "2rem 0",
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
                sx={{
                  margin: "2rem 0",
                  width: 220,
                }}
                onChange={handleChange}
                value={transaction.date}
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
                  sx={{
                    margin: "1rem 0",
                    width: 220,
                  }}
                  value={transaction.type}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                >
                  <MenuItem value={"deposit"}>Deposit</MenuItem>
                  <MenuItem value={"extract"}>Extract</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                variant="filled"
                label="Write your category"
                name="category"
                onChange={handleChange}
                value={transaction.category}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              /> */}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  margin: "1rem 0rem",
                }}
                disabled={
                  !transaction.description ||
                  !transaction.amount ||
                  !transaction.date ||
                  !transaction.type
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "ADD"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
