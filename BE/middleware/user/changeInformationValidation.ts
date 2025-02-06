import { body } from "express-validator";


export const changeInformationValidation = [
  body("email")
    .exists()
    .withMessage("Email field is required.")
    .notEmpty()
    .withMessage("Email field can not empty")
    .isEmail()
    .withMessage("Invalid email address."),
  body("firstname")
    .exists()
    .withMessage("Firstname field is required.")
    .notEmpty()
    .withMessage("Firstname field can not empty"),
  body("lastname")
    .exists()
    .withMessage("Lastname field is required.")
    .notEmpty()
    .withMessage("Lastname field can not empty"),
  body("phone")
    .exists()
    .withMessage("Phone field is required.")
    .notEmpty()
    .withMessage("Phone field can not empty"),
  body("country")
    .exists()
    .withMessage("Firstname field is required.")
    .notEmpty()
    .withMessage("Country field can not empty"),
];