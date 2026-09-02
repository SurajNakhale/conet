import { prisma } from "@conet/database";
import { signinSchema, signupSchema } from "@conet/types"
import type { NextFunction, Request, Response } from "express"
import { appError, JWT_SECRET } from "../lib/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const parsedMsg = signupSchema.safeParse(req.body);

    if(!parsedMsg.success) throw new appError("validation error", 400);

    try{
        const {username, password} = parsedMsg.data;

        const alreadyExists = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if(alreadyExists) throw new appError("user already exists", 409);

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashPassword
            }
        })

        console.log(user);

        res.status(201).json({
            message: "user created",
            newUser: user
        })
    }
    catch(err){
        next(err);
    }

}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const parsedMsg = signinSchema.safeParse(req.body);

    
    try{
        if(!parsedMsg.success) throw new appError("validation error", 400);
        const {username, password} = parsedMsg.data;

        const exists = await prisma.user.findFirst({
            where: {
                username
            }
        });

        if(!exists) throw new appError("please signup", 403);

        const isMatch = await bcrypt.compare(password, exists.password);

        if(!isMatch) throw new appError("invalid credentails", 400);

        const token = jwt.sign({
            userId: exists.id
        }, JWT_SECRET);

        res.status(200).json({
            message: "signin successfull",
            token: token,
            userId: exists.id,
        });

    }catch(err){
        next(err);
    }
}

export const getuser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    };
    
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                id: true,
                rooms: true
            }
        })

        if(!user) throw new appError("user doest not exists", 401);

        res.status(200).json({
            user
        })
    }
    catch(err){
        next(err);
    }
}

export const getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const id = req.params.id as string;

    if (!userId) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    };
    
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                username: true,
                id: true,
            }
        })

        if(!user) throw new appError("user doest not exists", 401);

        res.status(200).json({
            user
        })
    }
    catch(err){
        next(err);
    }
}
