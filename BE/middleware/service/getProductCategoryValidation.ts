import { query } from "express-validator";


export const getProductCategoryValidation = [
  query("category")
  .exists()
  .withMessage("Query category can't empty")
  .isString()
  .withMessage("Query category must be string")
];
  