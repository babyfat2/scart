"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../controller/auth/register");
const login_1 = require("../controller/auth/login");
const loginGoogle_1 = require("../controller/auth/loginGoogle");
const loginValidation_1 = require("../../middleware/auth/loginValidation");
const handleErrors_1 = require("../../middleware/handleErrors");
const registerValidation_1 = require("../../middleware/auth/registerValidation");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Router auth is running");
});
router.post("/register", registerValidation_1.registerValidation, handleErrors_1.handleErrors, register_1.register);
router.post("/login", loginValidation_1.loginValidation, handleErrors_1.handleErrors, login_1.login);
router.post("/login-google", loginGoogle_1.loginGoogle);
exports.default = router;
