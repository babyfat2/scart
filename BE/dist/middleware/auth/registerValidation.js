"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
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
    (0, express_validator_1.body)("firstName")
        .exists()
        .withMessage("Firstname field is required.")
        .notEmpty()
        .withMessage("Firstname field can not empty"),
    (0, express_validator_1.body)("lastName")
        .exists()
        .withMessage("Lastname field is required.")
        .notEmpty()
        .withMessage("Lastname field can not empty"),
];
