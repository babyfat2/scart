import { body } from "express-validator";


export const changePasswordValidation = [
    body("newPassword")
        .exists()
        .withMessage("New password is required.")
        .notEmpty()
        .withMessage("New password field can not empty")
        .isStrongPassword()
        .withMessage(
            "New password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."
        ),
    body("oldPassword")
        .exists()
        .withMessage("Old password is required.")
        .notEmpty()
        .withMessage("Old password field can not empty")
        .isStrongPassword()
        .withMessage(
            "Old password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."
        ),
];
