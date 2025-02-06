import { body } from "express-validator";


export const deleteWishlistValidation = [
  body("productId")
  .exists()
  .withMessage("ProductId field is required.")
  .notEmpty()
  .withMessage("Product field is not empty")
  .isInt()
  .withMessage("ProductId must be Int")
  .toInt(),
  ];
  