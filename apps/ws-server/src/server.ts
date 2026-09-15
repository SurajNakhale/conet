import { WebSocketServer } from "ws"
import { SocketToUserId } from "./state";
import { handleAuth } from "./handlers/auth";
import { countMembers } from "./lib/utils";
import { handleJoin } from "./handlers/join";
import { handleChat } from "./handlers/chat";
import { handleDisconnects } from "./handlers/disconnect";
import "dotenv/config";

const port = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port });

console.log(`ws-server running`);
wss.on("connection", (socket) => {

    socket.on("message", async (msg) => {

        try{
            const parsedMsg = JSON.parse(msg.toString());
            const type = parsedMsg.type;
        
            if(type == "auth"){
                const token = parsedMsg.payload.token;

                if(!token) return;
                const userId = await handleAuth(token);
                console.log("userId: ", userId);
                
                socket.send(JSON.stringify({
                    type: "auth_success",
                    payload: {
                        userId,
                    }
                }));


                SocketToUserId.set(socket , userId)
            }

            if(type == "join"){
                const roomId = parsedMsg.payload.roomId;
                
                try{
                    await handleJoin(roomId, socket);
                    countMembers(roomId);
                }
                catch(err){
                    console.error("Failed processing join event", err)
                }
            }   

            if(type == "chat"){
                const text = parsedMsg.payload.text as string;    
                await handleChat(text, socket);
            };

        }
        catch(err: any){
            console.error(err || err.message)
        }

    })

    socket.on("close", () => {
        handleDisconnects(socket)
    })

    socket.on("error", (err) => {
        handleDisconnects(socket)
        console.error(err.message)
    })
})