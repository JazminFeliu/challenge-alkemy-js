import React, { useEffect, useState } from "react";
import { Button, Typography, Card, Modal, Box } from "@mui/material";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//components

import TransactionList from "./transactionlist/TransactionList";
import TransactionForm from "./transactionlist/TransactionForm";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);

  const [transactionsChange, setTransactionsChange] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const balance = 0;

  async function getName() {
    try {
      const response = await fetch("http://localhost:4000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const data = await response.json();
      setAllTransactions(data);

      setName(data[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      toast.success("Logged successfully");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
    setTransactionsChange(false);
  }, [transactionsChange]);

  return (
    <Grid item xs={5} justifyContent={"center"}>
      <Card
        variant="outlined"
        sx={{ mt: 1 }}
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" textAlign="center" color=" #a6a678">
          {name} 's Transaction List
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Button onClick={handleOpen}> Add Transaction</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <TransactionForm
                    setTransactionsChange={setTransactionsChange}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              </Modal>
            </Item>
          </Grid>
        </Grid>

        <Button
          variant="outlined"
          onClick={(e) => logout(e)}
          sx={{ display: "right", m: 1, width: "10" }}
        >
          Logout
        </Button>

        <TransactionList
          allTransactions={allTransactions}
          setTransactionsChange={setTransactionsChange}
          balance={balance}
        />
      </Card>
    </Grid>
  );
};

export default Dashboard;
