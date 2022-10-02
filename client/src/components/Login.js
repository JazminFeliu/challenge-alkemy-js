import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ setAuth }) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setAuth(true);
        toast.success("login successfully!");
      } else {
        setAuth(false);
        setLoading(false);
        toast.error(data);
      }
    } catch (err) {
      console.log(err);
    }
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
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#ffffff", padding: "1rem" }}
        >
          <Typography variant="5" textAlign="center" color=" #a6a6a6">
            Login
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="E-mail"
                type="email"
                sx={{
                  display: "block",
                  margin: "3rem 0",
                  m: 1,
                  width: "30",
                }}
                name="email"
                value={values.email}
                onChange={handleChange}
                inputProps={{ style: { color: "black", width: 240 } }}
              />

              <FormControl
                sx={{ display: "block", m: 1, width: "30" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  inputProps={{ style: { color: "black" } }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ display: "block", m: 1, width: "30" }}
                disabled={!values.email || !values.password}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
            <Link to="/register">Are you new? Sign Up </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
