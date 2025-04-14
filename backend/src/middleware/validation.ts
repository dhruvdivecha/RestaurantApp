import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

const handleValidationErrors: RequestHandler = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return;
    }
    next();
};

export const validateMyUserRequest = [
    body("name").notEmpty().isString(),
    body("address").notEmpty().isString(),
    body("phoneNumber").notEmpty().isString(),
    handleValidationErrors
] as RequestHandler[];

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().isString().withMessage("Restaurant name is required"),
    body("orderPrice").notEmpty().isNumeric().withMessage("Order price is required"),
    body("address").notEmpty().isString().withMessage("Address is required"),
    body("cuisine").notEmpty().isString().withMessage("Cuisine is required"),
    body("image").notEmpty().isString().withMessage("Image is required"),
    body("estimatedDeliveryTime").notEmpty().isNumeric().withMessage("Estimated delivery time is required"),
    body("menuItems").isArray() .withMessage("Menu Items must be an Arrray"),
    body("menuItems.*.price").notEmpty().isNumeric({no_symbols: true}).withMessage("Price must be a number"),
    body("menuItems.*.name").notEmpty().isString().withMessage("Name is required"),
    body("menuItems.*.description").notEmpty().isString().withMessage("Description is required"),
    body("menuItems.*.image").notEmpty().isString().withMessage("Image is required"),
    handleValidationErrors
] as RequestHandler[];