"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWishlistValidation = void 0;
const express_validator_1 = require("express-validator");
exports.addWishlistValidation = [
    (0, express_validator_1.body)("productId")
        .exists()
        .withMessage("ProductId field is required.")
        .notEmpty()
        .withMessage("ProductId field can not empty")
        .isInt()
        .withMessage("ProductId must be Int")
        .toInt(),
];
