"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCartValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addCartValidation = [
    (0, express_validator_1.body)("productId")
        .exists()
        .withMessage("ProductId field is required.")
        .notEmpty()
        .withMessage("ProductId field can not empty")
        .isInt()
        .withMessage("ProductId must be Int")
        .toInt(),
    (0, express_validator_1.body)("amount")
        .exists()
        .withMessage("Amount field is required.")
        .notEmpty()
        .withMessage("Amount field can not empty"),
];
