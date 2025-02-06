"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutValidation = void 0;
const express_validator_1 = require("express-validator");
exports.checkoutValidation = [
    (0, express_validator_1.body)('inforBuyer.firstName')
        .isString()
        .notEmpty()
        .withMessage('First name is required and must be a string'),
    (0, express_validator_1.body)('inforBuyer.lastName')
        .isString()
        .notEmpty()
        .withMessage('Last name is required and must be a string'),
    (0, express_validator_1.body)('inforBuyer.email')
        .isEmail()
        .withMessage('A valid email is required'),
    (0, express_validator_1.body)('inforBuyer.address1')
        .isString()
        .notEmpty()
        .withMessage('Address1 is required'),
    (0, express_validator_1.body)('inforBuyer.country')
        .isString()
        .notEmpty()
        .withMessage('Country is required'),
    (0, express_validator_1.body)('shipping')
        .isString()
        .notEmpty()
        .withMessage('Shipping method is required'),
    (0, express_validator_1.body)('payment')
        .isString()
        .notEmpty()
        .withMessage('Payment method is required'),
    (0, express_validator_1.body)('cart')
        .isArray({ min: 1 })
        .withMessage('Cart must be an array with at least one item'),
    (0, express_validator_1.body)('cart.*.product_id')
        .isInt({ gt: 0 })
        .withMessage('Each cart item must have a valid product_id'),
    (0, express_validator_1.body)('cart.*.amount')
        .isInt({ gt: 0 })
        .withMessage('Each cart item must have a valid amount'),
    (0, express_validator_1.body)('coupon_id')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Coupon ID must be a valid integer'),
];
