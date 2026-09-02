import { WebSocket } from "ws";
import { Rooms, SocketToRoomId, SocketToUserId } from "../state";
import { prisma } from "@conet/database";


export async function handleChat(text: string, socket: WebSocket){
    const userId = SocketToUserId.get(socket);
    const roomId = SocketToRoomId.get(socket);

    
    try{
        if (!userId || !roomId) throw new Error("error userId or roomId unable to send message");
        const membership = await prisma.userRoom.findUnique({
            where: {
                roomId_userId: {
                    userId,
                    roomId
                }
            }
        })

        if(!membership) throw new Error("cant send message to this room!!");

        const message = await prisma.message.create({   
            data: {
                text,
                userId,
                roomId
            },
            include: {
                user: {
                    select: {
                        username: true
                        }
                    }
            }
        });
                
        const allSockets = Rooms.get(roomId);

        allSockets?.forEach((ws) => {
            ws.send(JSON.stringify({
                type: "chat_success",
                payload: {
                    message: message
                }
            }))
        })

        
        console.log(message);
        

        
    }
    catch(err: any){
        console.error(err || err.message)

        if(socket.readyState == socket.OPEN){
            socket.send(JSON.stringify({
                type: "chat_error",
                payload: {
                    message: err.message
                }
            }))
        }
    }    
}