"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const express_validator_1 = require("express-validator");
exports.commentValidation = [
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Name field is required.")
        .notEmpty()
        .withMessage("Name field can not empty"),
    (0, express_validator_1.body)("rate")
        .exists()
        .withMessage("Rate field is required.")
        .notEmpty()
        .withMessage("Rate field can not empty")
        .isInt()
        .withMessage("Rate must be Int")
        .toInt(),
    (0, express_validator_1.body)("content")
        .exists()
        .withMessage("Content field is required.")
        .notEmpty()
        .withMessage("Content field can not empty"),
    (0, express_validator_1.body)("product_id")
        .exists()
        .withMessage("Product_id field is required.")
        .notEmpty()
        .withMessage("product_id field can not empty"),
];
