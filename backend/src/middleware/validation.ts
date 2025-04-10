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