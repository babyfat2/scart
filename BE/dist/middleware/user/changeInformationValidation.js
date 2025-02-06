"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeInformationValidation = void 0;
const express_validator_1 = require("express-validator");
exports.changeInformationValidation = [
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email field is required.")
        .notEmpty()
        .withMessage("Email field can not empty")
        .isEmail()
        .withMessage("Invalid email address."),
    (0, express_validator_1.body)("firstname")
        .exists()
        .withMessage("Firstname field is required.")
        .notEmpty()
        .withMessage("Firstname field can not empty"),
    (0, express_validator_1.body)("lastname")
        .exists()
        .withMessage("Lastname field is required.")
        .notEmpty()
        .withMessage("Lastname field can not empty"),
    (0, express_validator_1.body)("phone")
        .exists()
        .withMessage("Phone field is required.")
        .notEmpty()
        .withMessage("Phone field can not empty"),
    (0, express_validator_1.body)("country")
        .exists()
        .withMessage("Firstname field is required.")
        .notEmpty()
        .withMessage("Country field can not empty"),
];
