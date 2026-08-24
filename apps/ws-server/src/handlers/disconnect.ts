import { countMembers } from "../lib/utils";
import { Rooms, SocketToRoomId, SocketToUserId } from "../state";
import { WebSocket } from "ws";


export function handleDisconnects(socket: WebSocket){
    const roomId = SocketToRoomId.get(socket);
    const userId = SocketToUserId.get(socket);

    if(!roomId || !userId) return;

    if(Rooms.has(roomId)){
        Rooms.get(roomId)?.delete(socket);
    }

    if(Rooms.get(roomId)?.size === 0){
        Rooms.delete(roomId);
    }else{
        countMembers(roomId)
    }
    
    SocketToRoomId.delete(socket);
    SocketToUserId.delete(socket);
}