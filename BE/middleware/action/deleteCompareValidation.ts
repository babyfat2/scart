import { body } from "express-validator";
import { isEmpty } from "validator";


export const deleteCompareValidation = [
  body("productId")
  .exists()
  .withMessage("ProductId field is required.")
  .notEmpty()
  .withMessage("Product field is not empty")
  .isInt()
  .withMessage("ProductId must be Int")
  .toInt(),
  ];
  