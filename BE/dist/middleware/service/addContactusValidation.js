"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContactusValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addContactusValidation = [
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Name field is required")
        .isString()
        .withMessage("Name must be string"),
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Invalid email address."),
    (0, express_validator_1.body)("phone")
        .exists()
        .withMessage("Phone field is required")
        .isString()
        .withMessage("Phone must be string"),
    (0, express_validator_1.body)("subject")
        .exists()
        .withMessage("Subject field is required")
        .isString()
        .withMessage("Subject must be string"),
    (0, express_validator_1.body)("content")
        .exists()
        .withMessage("Content field is required")
        .isString()
        .withMessage("Content must be string"),
];
