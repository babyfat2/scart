"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetailValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getOrderDetailValidation = [
    (0, express_validator_1.query)("checkoutId")
        .exists()
        .withMessage("Query checkout can't empty")
        .isInt()
        .withMessage("Query checkout must be Int")
        .toInt(),
];
