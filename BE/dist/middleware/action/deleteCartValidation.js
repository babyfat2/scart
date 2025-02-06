"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartValidation = void 0;
const express_validator_1 = require("express-validator");
exports.deleteCartValidation = [
    (0, express_validator_1.body)("productId")
        .exists()
        .withMessage("ProductId field is required.")
        .notEmpty()
        .withMessage("ProductId field cannot empty")
        .isInt()
        .withMessage("ProductId must be Int")
        .toInt(),
];
