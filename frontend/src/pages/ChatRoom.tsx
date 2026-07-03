import { useEffect, useRef, useState } from "react";
import RoomInputBar from "../components/RoomInputBar";
import MessageList from "../components/MessageList";
import { useLocation, useParams } from "react-router-dom";


export type chatMessage = {
  text: string,
  username: string,
  timestamp: number
}

export function ChatRoom(){
    const [message, setMessage] = useState<chatMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const { roomId } = useParams()
    const location = useLocation();

    
    const username = location.state.username;

    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        
        ws.onmessage = (e) => {
            const parsedMsg = JSON.parse(e.data);

            const type = parsedMsg.type;

            if(type == "room_update"){
              const totalUsers = parsedMsg.payload.totalUsers;
              console.log(totalUsers)
              setOnlineUsers(totalUsers);
              
            }
            if(type == "chat"){
              const text = parsedMsg.payload.text;
              const user = parsedMsg.payload.username;
              const timestamp = parsedMsg.payload.timestamp;

              setMessage(message => [...message , {
                text, 
                username: user, 
                timestamp
              }]);

            }
        }
        
        wsRef.current = ws;
        
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomId?.toString(),
                    username
                }
            }))
        }


        return () => {
            wsRef.current?.close();
        }

    },[])

    function sendMessage(){
        const text = inputRef.current?.value;
        const timestamp =  Date.now();

        if(!text) return;
        
        wsRef.current?.send(JSON.stringify({
                        type: "chat",
                        payload: {
                             text,
                             username,
                             timestamp
                        }
        })) 
        
        if(inputRef.current){
            inputRef.current.value = "";
        }

    }

    function pressEnter(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            sendMessage();
        }
    }

    

return (
  <div className="min-h-screen bg-[#222222] flex items-center justify-center px-4">
    <div className="w-full max-w-4xl">

      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-[#C2D8C4] tracking-tight">
          conet
        </h1>

        <p className="mt-3 text-zinc-400">
          room • {roomId}
        </p>
      </div>

      <div className="rounded-4xl border border-[#C2D8C4] bg-[#222222] overflow-hidden h-[80vh] flex flex-col">

        <div className="border-b border-[#3A3A3A] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#C2D8C4]">
              #{roomId}
            </h2>

            <p className="text-sm text-zinc-500">
              Real-time room chat
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#222222] border border-[#C2D8C4] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C2D8C4]"/>
                <span className="text-white">
                    {onlineUsers}
                </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <MessageList message={message} currentUser={username} />
        </div>

        <div className="border-t border-[#3A3A3A] p-4">
          <RoomInputBar
            inputRef={inputRef}
            sendMessage={sendMessage}
            pressEnter={pressEnter}
          />
        </div>

      </div>
    </div>
  </div>
);
}