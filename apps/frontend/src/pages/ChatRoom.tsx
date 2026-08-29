import MessageList from "@/components/MessageList";
import RoomInputBar from "../components/RoomInputBar";
import { useQuery } from "@tanstack/react-query";
import { getRoomMessages, getUserInfo } from "@/api/http";
import { useEffect } from "react";
import { useWsStore } from "@/store/wsStore";
import { useParams } from "react-router-dom";


const ChatRoom = () => {
    const { roomId } = useParams();

    if(!roomId) throw new Error("roomId required");
    

    const connect = useWsStore((state) => state.connect);
    const disconnect = useWsStore((state) => state.disconnect);

    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: getUserInfo
    })
    
    useEffect(() => {
        connect(roomId);

        return () => {
            disconnect();
        };
    }, [roomId, connect, disconnect]);

    const messageQuery = useQuery({
        queryKey: ["message"],
        queryFn: () => getRoomMessages({ roomId }),
        retry: false
    });

    useEffect(() => {
        if(messageQuery.isSuccess && messageQuery.data?.roomMsg){
            console.log(messageQuery.data)
            
            const msg = messageQuery.data.roomMsg.map((msg: any) => ({
                id: msg.id,
                text: msg.text,
                createdAt: new Date(msg.createdAt).toLocaleDateString('en-IN', {
                    day: "2-digit",
                    month: "short",
                    hour:  "2-digit",
                    minute: "2-digit"
                }),
                username: msg.user.username
            }));
            
            useWsStore.setState({ messages: msg})
        }
        
    }, [messageQuery.isSuccess, roomId, messageQuery.data])
    
    if (userQuery.isLoading || messageQuery.isLoading) {
        return <div className="text-white p-4">Loading messages...</div>;
    }
  
    if (userQuery.isError || !userQuery.data?.user.username) {
        return <div className="text-red-500 p-4">Error loading user info.</div>;
    }
    
    const user = userQuery.data.user.username;
  
    return (
      <main className="min-h-screen bg-background px-4 py-8 text-[#F3F4F6]">
      <div className="mx-auto w-full max-w-250">
        <div className="space-y-6 pb-24">
          <MessageList currentUser={user} />
        </div>

        <div className="fixed bottom-6 left-1/2 w-[min(90vw,720px)] -translate-x-1/2 hover:scale-99 transition duration-300">
          <div className="rounded-[30px] border border-primary/20 bg-black px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <RoomInputBar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatRoom