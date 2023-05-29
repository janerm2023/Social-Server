const router = require("express").Router();
const { register, login, logout } = require("../controllers/auth");

// REGISTER
router.post("/signUp", register);

// LOGIN
router.post("/signIn", login);

// LOGOUT
router.post("/logout", logout);

module.exports = router;
