import { object, AnySchema} from "yup";
import { Request, Response, NextFunction } from "express";
import { APIResponse } from "@src/types/api-response";

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => { 
    try {
        await schema.validate(
            req.body
        );
        next();
    } catch (error:any) {
        return res.status(400).json({_msg:"Validation Failed",error:error} as APIResponse);
    }
};

export default validate;