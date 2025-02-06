"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompareValidation = void 0;
const express_validator_1 = require("express-validator");
exports.deleteCompareValidation = [
    (0, express_validator_1.body)("productId")
        .exists()
        .withMessage("ProductId field is required.")
        .notEmpty()
        .withMessage("Product field is not empty")
        .isInt()
        .withMessage("ProductId must be Int")
        .toInt(),
];
