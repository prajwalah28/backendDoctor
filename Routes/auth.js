const express = require("express");
const authController = require("../Controllers/authController.js");
const register = authController.register;
const login = authController.login;

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

module.exports = router;