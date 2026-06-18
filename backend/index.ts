import { WebSocket, WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080});

//use set prevent adding duplicates sockets, easy and cleaner syntax
let rooms = new Map<string, Set<WebSocket>>();
let socketToroom = new Map<WebSocket, string>();

/*
allsocket.set("room1" => set {socket1, socket2, socket3, socket4});

*/

wss.on("connection", (socket) => {

    socket.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg.toString());
        const roomId = parsedMsg.payload.roomId;
        const type = parsedMsg.type;
        const message = parsedMsg.payload.message;

        if(type == "join"){
            //if room does not exists
            if(!rooms.has(roomId)){
                rooms.set(roomId, new Set([socket]));   
            }

            //if room exists directly push to the set
            rooms.get(roomId)?.add(socket);
            socketToroom.set(socket, roomId);
        }

        if(type == "chat"){
            const roomId = socketToroom.get(socket);

            if(!roomId) return;

            const sockets = rooms.get(roomId);
            sockets?.forEach(s => {
                if(s != socket){
                    s.send(message);
                }
            }) 
        }

        socket.on("disconnect", () => {
            const roomId = socketToroom.get(socket);
            if(!roomId) return;

            rooms.get(roomId)?.delete(socket)
            socketToroom.delete(socket);
        })
    })
})