import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

const handleValidationErrors: RequestHandler = (req, res, next): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateMyUserRequest: RequestHandler[] = [
  body("name").isString().notEmpty().withMessage("Name is required and must be a string"),
  body("address").isString().notEmpty().withMessage("Address is required and must be a string"),
  body("phoneNumber").isString().notEmpty().withMessage("Phone number is required and must be a string"),
  handleValidationErrors,
];

export const validateMenuItemRequest: RequestHandler[] = [
  body("name").isString().notEmpty().withMessage("Name is required and must be a string"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),
  body("category").isString().notEmpty().withMessage("Category is required and must be a string"),
  handleValidationErrors,
];
