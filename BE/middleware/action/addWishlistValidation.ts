import { body } from "express-validator";


export const addWishlistValidation = [
  body("productId")
  .exists()
  .withMessage("ProductId field is required.")
  .notEmpty()
  .withMessage("ProductId field can not empty")
  .isInt()
  .withMessage("ProductId must be Int")
  .toInt(),
];
  