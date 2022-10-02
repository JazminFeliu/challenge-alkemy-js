const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  //Get token from header
  const jwtToken = req.header("token");

  //Check if not token
  if (!jwtToken) {
    return res.status(403).json("Not Autorize");
  }

  //Verify token
  try {
    //it is going to give use the user id(user:{id:user.id})
    const verify = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
