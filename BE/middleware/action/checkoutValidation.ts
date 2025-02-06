import { body } from "express-validator";


export const checkoutValidation = [
    body('inforBuyer.firstName')
    .isString()
    .notEmpty()
    .withMessage('First name is required and must be a string'),
  body('inforBuyer.lastName')
    .isString()
    .notEmpty()
    .withMessage('Last name is required and must be a string'),
  body('inforBuyer.email')
    .isEmail()
    .withMessage('A valid email is required'),
  body('inforBuyer.address1')
    .isString()
    .notEmpty()
    .withMessage('Address1 is required'),
  body('inforBuyer.country')
    .isString()
    .notEmpty()
    .withMessage('Country is required'),
  body('shipping')
    .isString()
    .notEmpty()
    .withMessage('Shipping method is required'),
  body('payment')
    .isString()
    .notEmpty()
    .withMessage('Payment method is required'),
  body('cart')
    .isArray({ min: 1 })
    .withMessage('Cart must be an array with at least one item'), 
  body('cart.*.product_id')
    .isInt({ gt: 0 })
    .withMessage('Each cart item must have a valid product_id'),
  body('cart.*.amount')
    .isInt({ gt: 0 })
    .withMessage('Each cart item must have a valid amount'),
  body('coupon_id')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Coupon ID must be a valid integer'),
];