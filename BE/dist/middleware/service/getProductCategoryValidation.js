"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductCategoryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.getProductCategoryValidation = [
    (0, express_validator_1.query)("category")
        .exists()
        .withMessage("Query category can't empty")
        .isString()
        .withMessage("Query category must be string")
];
