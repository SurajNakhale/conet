import { createRoomSchema } from "@conet/types"
import type { NextFunction, Request, Response } from "express"
import { appError } from "../lib/utils";
import { prisma } from "@conet/database";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const parsedMsg = createRoomSchema.safeParse(req.body);
    if(!parsedMsg.success) throw new appError("validation errr", 400);

    try{
        if(!userId) throw new appError("user not logged in", 403);

        const { name } = parsedMsg.data
        const alreadyExists = await prisma.room.findFirst({
            where: {
                name
            }
        });
        
        if(alreadyExists) throw new appError("room already exists", 401);

        const room = await prisma.room.create({
            data: {
                name,
                ownerId: userId
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        res.status(201).json({
            message: "room created",
            details: room
        })
    }
    catch(err){
        next(err);
    }
}

export const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId

    try{
        if(!userId) throw new appError("login required", 400);

        const rooms = await prisma.room.findMany();

        res.status(200).json({
            rooms: rooms
        });
    }catch(err){
        next(err);
    }
}

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const roomId = req.params.roomId as string;

    try{
        const response = await prisma.room.delete({
            where: {
                id: roomId,
                ownerId: userId
            }
        });

        if(!response) throw new appError("failed to delete room", 400);

        res.status(200).json({
            message: `room ${response.name} deleted successfully`
        });

    }catch(err){
        next(err)
    }
}

export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const roomId = req.params.roomId as string;

    try{
        const messages = await prisma.message.findMany({
            where: {
                roomId: roomId
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if(!messages) throw new appError("some thing went wrong", 404);

        res.status(200).json({
            roomMsg: messages 
        })
    }catch(err){
        next(err);
    }
}


