import { body } from "express-validator";


export const addCompareValidation = [
  body("productId")
  .exists()
  .withMessage("ProductId field is required.")
  .notEmpty()
  .withMessage("productId field can not empty")
  .isInt()
  .withMessage("ProductId must be Int")
  .toInt(),
  ];
  