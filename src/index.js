const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const transactionRoute = require("./routes/transactions.routes.ts");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //req.body

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//transaction route
app.use(transactionRoute);

//Middleware err
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("Server is running on port 4000");
