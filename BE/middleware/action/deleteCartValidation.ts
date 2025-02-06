import { body } from "express-validator";


export const deleteCartValidation = [
  body("productId")
  .exists()
  .withMessage("ProductId field is required.")
  .notEmpty()
  .withMessage("ProductId field cannot empty")
  .isInt()
  .withMessage("ProductId must be Int")
  .toInt(),
  ];
  