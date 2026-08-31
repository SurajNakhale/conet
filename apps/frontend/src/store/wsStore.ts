import { create } from 'zustand';

export type Message = {
    id: string,
    username: string,
    createdAt: string,
    text: string
}

type WebSocketType = {
    socket: WebSocket | null
    isConnected: boolean,
    userId: string
    isAuthenticated: boolean
    currentRoom: string
    roomSizes: Record<string, {
        member: string[],
        count: number
    }>
    messages: Message[], 

    connect: (roomId: string) => void
    authenticate: () => void
    joinRoom: (roomId: string) => void
    sendMessage: (text: string) => void
    disconnect: () => void
}

export const useWsStore = create<WebSocketType>((set, get) => ({
    socket: null,
    userId: "",
    currentRoom: "",
    roomSizes: {},
    messages: [],         
    isConnected: false,
    isAuthenticated: false,


    connect: (roomId: string) => {
        const existingWs = get().socket;
        
        //check if already exists
        if(existingWs && 
            (existingWs.readyState == WebSocket.OPEN 
            || existingWs.readyState === WebSocket.CONNECTING)) return;

        const ws = new WebSocket("ws://localhost:8080");
        set({socket: ws});

        ws.onopen = () => {
            console.log("websocket connected");
            set({ isConnected: true });

            get().authenticate();
        }

        ws.onmessage = (event) => {
            const parsedMsg = JSON.parse(event.data);

            if(parsedMsg.type == "auth_success"){
                console.log("auth success")
                set({
                    isAuthenticated: true,
                    userId: parsedMsg.payload.userId
                })

                get().joinRoom(roomId);
            }

            if(parsedMsg.type == "join_success"){
                console.log(`joined room success ${parsedMsg.payload.roomId}`)
                set({
                    currentRoom: parsedMsg.payload.roomId
                })
            }
   
            if(parsedMsg.type == "room_size"){
                console.log(`members: ${parsedMsg.payload.totalUsers}`)
                const targetRoomId = get().currentRoom; 
                console.log(parsedMsg.payload)
                set((state) => ({
                    roomSizes: {
                        ...state.roomSizes,
                        [targetRoomId]: {
                            member: parsedMsg.payload.members,
                            count: parsedMsg.payload.memberCount
                        }
                    }
                }))

            }

            if(parsedMsg.type == "chat_success"){
                console.log(parsedMsg);
                const msg = parsedMsg.payload.message;
                const newMsg = {
                    id: msg.id,
                    text: msg.text,
                    createdAt: new Date(msg.createdAt).toLocaleDateString('en-IN', {
                        day: "2-digit",
                        month: "short",
                        hour:  "2-digit",
                        minute: "2-digit"
                    }),
                    username: msg.user.username
                }

                console.log(newMsg);

                set((state) => ({
                    messages: [...state.messages, newMsg]
                }))
            }
            
        }

        ws.onerror = (err) => {
            console.log(`error ${err}`)
        }

        ws.onclose = () => {

            if(get().socket == ws){
                set({
                    socket: null,
                    isAuthenticated: false,
                    isConnected: false,
                    currentRoom: ""
                });
            }
        }
    },

    authenticate: () => {
        const ws = get().socket;
        if(!ws) return;

        const token = localStorage.getItem('Authorization')?.split(" ")[1];

        ws.send(JSON.stringify({
            type: "auth",
            payload: {
                token: token
            }
        }));
    },

    joinRoom: (roomId: string) => {
        const ws = get().socket;

        if(!ws || !get().isAuthenticated) return;

        ws.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: roomId
            }
        }))
    },

    sendMessage: (text: string) => {
        const ws = get().socket;

        console.log("inside sendmsg action",ws)
        if( !ws 
            || !get().isAuthenticated 
            || get().currentRoom.length == 0 ) return;
        
        ws.send(JSON.stringify({
            type: "chat",
            payload: {
                text: text
            }
        }));
        console.log("message", text);

    },

    disconnect: () => {
        const ws = get().socket;
        if(ws){
            ws.close();
        }

        set({
            socket: null,
            isAuthenticated: false,
            isConnected: false,
            currentRoom: "",
            userId: "",
            roomSizes: {},
            messages: []
        })
    }
}))