import { query } from "express-validator";


export const getSingleProductValidation = [
  query("id")
  .exists()
  .withMessage("Query category can't empty")
  .isInt()
  .withMessage("Query category must be Int")
  .toInt(),
];
  