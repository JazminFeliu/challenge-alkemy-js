import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Register = (setAuth) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadUser(params.id);
    }
  }, [params.id]);

  const loadUser = async (id) => {
    const res = await fetch(`http://localhost:4000/user/${id}`);
    const data = await res.json();
    setValues({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setAuth.setAuth(true);
        toast.success("Registered Successfully");
        setLoading(false);
      } else {
        setAuth.setAuth(false);
        toast.error(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            Register
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="E-mail"
                type="email"
                sx={{
                  display: "block",
                  m: 1,
                  width: "30ch",
                }}
                name="email"
                value={values.email}
                onChange={handleChange}
                inputProps={{ style: { color: "black", width: 240 } }}
              />

              <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
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

              <TextField
                variant="outlined"
                label="Name"
                sx={{
                  display: "block",
                  margin: "3rem 0",
                  m: 1,
                  width: "30",
                }}
                name="name"
                value={values.name}
                onChange={handleChange}
                inputProps={{ style: { color: "black", width: 240 } }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ display: "block", m: 1, width: "30" }}
                disabled={!values.email || !values.password || !values.name}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>

            <Link to="/login">Have you an account? Login </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
