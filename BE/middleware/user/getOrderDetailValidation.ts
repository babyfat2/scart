import { query } from "express-validator";


export const getOrderDetailValidation = [
  query("checkoutId")
  .exists()
  .withMessage("Query checkout can't empty")
  .isInt()
  .withMessage("Query checkout must be Int")
  .toInt(),
];
  