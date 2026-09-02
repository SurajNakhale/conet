import type { NextFunction, Request, Response } from "express";
import { appError, JWT_SECRET } from "../lib/utils";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "@conet/database";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization;
    try{
        if(!headers) throw new appError("token required", 403);

        const token = headers.split(" ")[1]!;

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        const checkUser = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })

        if(!checkUser) throw new Error("user does not exists");

        req.userId = decoded.userId;

        next();
    }
    catch(err){
        next(err);
    }
}