import { body } from "express-validator";
import { isEmpty } from "validator";


export const commentValidation = [
  body("name")
  .exists()
  .withMessage("Name field is required.")
  .notEmpty()
  .withMessage("Name field can not empty"),
  body("rate")
  .exists()
  .withMessage("Rate field is required.")
  .notEmpty()
  .withMessage("Rate field can not empty")
  .isInt()
  .withMessage("Rate must be Int")
  .toInt(),
  body("content")
  .exists()
  .withMessage("Content field is required.")
  .notEmpty()
  .withMessage("Content field can not empty"),
  body("product_id")
  .exists() 
  .withMessage("Product_id field is required.")
  .notEmpty()
  .withMessage("product_id field can not empty"),
];