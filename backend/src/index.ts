import { WebSocket, WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080});

//use set prevent adding duplicates sockets, easy and cleaner syntax
// key -> value pair
export let rooms = new Map<string, Set<WebSocket>>();
export let socketToroom = new Map<WebSocket, string>();
export let socketToUser = new Map<WebSocket, string>();
/*
rooms
roomId -> Set<WebSocket>

socketToRoom
socket -> roomId

socketToUser
socket -> username
*/

type messageInfoType = {
    text: string,
    username: string,
    timestamp: number,

}

export function countMembers(roomId: string){
    const members = rooms.get(roomId)?.size ?? 0;

            const sockets = rooms.get(roomId);
            sockets?.forEach((s) => {
                s.send(JSON.stringify({
                    type: "room_update",
                    payload: {
                        totalUsers: members
                    }
                }));
            })   
}

export function JoinRoom(roomId: string, socket: WebSocket, username: string){

            if(!rooms.has(roomId)){
                rooms.set(roomId, new Set());   
            }

            rooms.get(roomId)?.add(socket);
            socketToroom.set(socket, roomId);
            socketToUser.set(socket, username)
}

function SendMessage(message: messageInfoType, socket: WebSocket){
    const roomId = socketToroom.get(socket);

            if(!roomId) return;

            const sockets = rooms.get(roomId);
            sockets?.forEach(s => {
                if(s != socket){
                    s.send(JSON.stringify({
                        type: "chat",
                        payload: message
                    }));
                }
            }) 
}


wss.on("connection", (socket) => {

    socket.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg.toString());
        const type = parsedMsg.type;
        
        if(type == "join"){        
            const username = parsedMsg.payload.username;
            const roomId = parsedMsg.payload.roomId;

            JoinRoom(roomId, socket, username);
            countMembers(roomId);
        }
        
        if(type == "chat"){
            const text = parsedMsg.payload.message;
            const username = socketToUser.get(socket);

            if(!username) return;

            const message: messageInfoType  = {
                text,
                username,
                timestamp: Date.now()
            }
            SendMessage(message, socket);
        }


    })

    socket.on("close", () => {
        const roomId = socketToroom.get(socket);

        if(!roomId) return;

        rooms.get(roomId)?.delete(socket);

        if(rooms.get(roomId)?.size === 0){
            rooms.delete(roomId);
        } 

        socketToroom.delete(socket);
        socketToUser.delete(socket)

        countMembers(roomId);
    })
})