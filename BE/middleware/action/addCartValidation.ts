import { body } from "express-validator";


export const addCartValidation = [
  body("productId")
  .exists()
  .withMessage("ProductId field is required.")
  .notEmpty()
  .withMessage("ProductId field can not empty")
  .isInt()
  .withMessage("ProductId must be Int")
  .toInt(),
  body("amount")
  .exists()
  .withMessage("Amount field is required.")
  .notEmpty()
  .withMessage("Amount field can not empty"),
  ];
  