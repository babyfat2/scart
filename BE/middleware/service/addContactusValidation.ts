import { body } from "express-validator";


export const addContactusValidation = [
  body("name")
  .exists()
  .withMessage("Name field is required")
  .isString()
  .withMessage("Name must be string"),
  body("email")
  .exists()
  .withMessage("Email field is required")
  .isEmail()
  .withMessage("Invalid email address."),
  body("phone")
  .exists()
  .withMessage("Phone field is required")
  .isString()
  .withMessage("Phone must be string"),
  body("subject")
  .exists()
  .withMessage("Subject field is required")
  .isString()
  .withMessage("Subject must be string"),
  body("content")
  .exists()
  .withMessage("Content field is required")
  .isString()
  .withMessage("Content must be string"),
];
  