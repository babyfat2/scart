"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = void 0;
const express_validator_1 = require("express-validator");
exports.changePasswordValidation = [
    (0, express_validator_1.body)("newPassword")
        .exists()
        .withMessage("New password is required.")
        .notEmpty()
        .withMessage("New password field can not empty")
        .isStrongPassword()
        .withMessage("New password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."),
    (0, express_validator_1.body)("oldPassword")
        .exists()
        .withMessage("Old password is required.")
        .notEmpty()
        .withMessage("Old password field can not empty")
        .isStrongPassword()
        .withMessage("Old password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."),
];
