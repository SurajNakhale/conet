import { useEffect, useRef, useState } from "react";
import { RoomHeader } from "../components/RoomHeader";



export function ChatRoom(){
    const [message, setMessage] = useState<string[]>([]);
    const [ownText, setOwnText] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null);


    useEffect(() => {
        const ws = new WebSocket("http://localhost:8080");

        ws.onmessage = (e) => {
            setMessage(message => [...message, e.data])
        }

        wsRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: "red"
                }
            }))
        }


        return () => {
            wsRef.current?.close();
        }

    },[])

    function sendMessage(){
        const text = inputRef.current?.value;
        if(!text) return;
        setOwnText(text);
        wsRef.current?.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: text
                        }
        }))  
    }

return (
    <div className="h-screen bg-[#222222] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-[#222222] rounded-4xl flex flex-col overflow-hidden">

        <RoomHeader />

        <div className="h-full flex flex-col overflow-auto">
          <div className="bg-[#222222] border-x-2 border-[#C2D8C4] flex-1">
            {message.map(m => <div className="pl-5 pt-2 border max-w-30">
                <div>
                    {m}
                </div>
            </div>)}
                <div className="flex flex-col">
                    <div>
                        {ownText}
                    </div>
                </div>

          </div>
          <div className="border-2 border-[#C2D8C4] rounded-b-4xl p-4">
            <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 text-[#C2D8C4] bg-[#222222] border border-[#C2D8C4] rounded-xl px-4 py-3 outline-none"
                />
                
                <button
                  onClick={sendMessage}
                  className="
                    px-8
                    rounded-xl
                    bg-[#222222]
                    border
                    border-[#C2D8C4]
                    hover:bg-[#315a30]
                    transition
                    text-[#C2D8C4]
                    font-semibold"
                >
                  Send
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
)
}