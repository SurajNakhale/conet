import { Rooms } from "../state";

export function countMembers(roomId: string){
    const members = Rooms.get(roomId)?.size ?? 0;
        console.log(members);

        Rooms.get(roomId)?.forEach((ws) => {
            ws.send(JSON.stringify({
                type: "room_size",
                payload: {
                    totalUsers: members
                }
            }));

        })   
}
