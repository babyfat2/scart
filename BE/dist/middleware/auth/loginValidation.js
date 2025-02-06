"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email field is required.")
        .notEmpty()
        .withMessage("Email field can not empty")
        .isEmail()
        .withMessage("Invalid email address."),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password field is required.")
        .notEmpty()
        .withMessage("Password field can not empty")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."),
];
