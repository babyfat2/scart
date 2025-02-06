"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProductValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getSingleProductValidation = [
    (0, express_validator_1.query)("id")
        .exists()
        .withMessage("Query category can't empty")
        .isInt()
        .withMessage("Query category must be Int")
        .toInt(),
];
