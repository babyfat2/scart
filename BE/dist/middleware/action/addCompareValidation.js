"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompareValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addCompareValidation = [
    (0, express_validator_1.body)("productId")
        .exists()
        .withMessage("ProductId field is required.")
        .notEmpty()
        .withMessage("productId field can not empty")
        .isInt()
        .withMessage("ProductId must be Int")
        .toInt(),
];
