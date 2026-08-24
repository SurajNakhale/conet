import { prisma } from "@conet/database";
import "dotenv/config";
import jwt, { type JwtPayload } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "jwt_seret";


export async function handleAuth(token: string){
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if(!decoded) throw new Error("invalid token")
    
    const userId = decoded.userId;
    const exists = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!exists) throw new Error("user does not exists");

    return exists.id;
}