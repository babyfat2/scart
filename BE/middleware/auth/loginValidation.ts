import { body } from "express-validator";


export const loginValidation = [
  body("email")
    .exists()
    .withMessage("Email field is required.")
    .notEmpty()
    .withMessage("Email field can not empty")
    .isEmail()
    .withMessage("Invalid email address."),
  body("password")
    .exists()
    .withMessage("Password field is required.")
    .notEmpty()
    .withMessage("Password field can not empty")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."
    ),
];
