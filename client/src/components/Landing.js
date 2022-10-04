import { Grid, Card, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#ffffff", padding: "1rem" }}
        >
          <Typography variant="h1" textAlign="center" color=" #a6a6a6">
            Welcome to the Alkemy Wallet
          </Typography>
          <Typography variant="h3" textAlign="center" color=" #a6a634">
            ALKEMY - Challenge FullStack JS
          </Typography>
          <Typography variant="h6" textAlign="center" color=" grey">
            Sign In and start your wallet
          </Typography>
          <Button variant="standard">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Button>
          <Button variant="standard">
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Landing;
