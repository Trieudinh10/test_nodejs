const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    // Auth header có dạng: authorization: Basic xxxxx
    const token = req.cookies.authorization;

    const payload = jwt.verify(token, "secret");

    const [foundUser] = await User.findByEmail(payload.email);
    if (!foundUser) {
      res.redirect("/login");
      return;
    }

    res.locals.currentUser = foundUser;

    next();
  } catch (error) {
    console.error(error, error.stack);
    return res.status(401).redirect("/login");
  }
};