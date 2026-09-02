import { Rooms, SocketToUserId } from "../state";

export function countMembers(roomId: string){
    const memberCount = Rooms.get(roomId)?.size ?? 0;
    const sockets = Rooms.get(roomId)
    const userIds = new Set();

     SocketToUserId.forEach((userId, socket) => {
        if(sockets!.has(socket)){
            userIds.add(userId); 
        }
    })

        Rooms.get(roomId)?.forEach((ws) => {
            ws.send(JSON.stringify({
                type: "room_size",
                payload: {
                    memberCount: memberCount,
                    members: [...new Set(userIds)],
                }
            }));
        })   
}
