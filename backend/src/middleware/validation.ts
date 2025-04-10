import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateMyUserRequest = [
    body("name").notEmpty().isString().withMessage("Name must be a string"),
    body("address").notEmpty().isString().withMessage("Address must be a string"),
    body("phoneNumber").notEmpty().isString().withMessage("Phone number must be a string"),
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
            return;
        }
        next();
    }
]