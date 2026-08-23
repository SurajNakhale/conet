import type { NextFunction, Request, Response } from "express";
import { appError } from "../lib/utils";


export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof appError){
        res.status(err.statusCode).json({
            message: err.message
        });

        return;
    }

    console.log(err);

    res.status(500).json({
        message: "internal server error"
    })
}