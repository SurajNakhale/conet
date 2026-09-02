import MessageList from "@/components/MessageList";
import RoomInputBar from "../components/RoomInputBar";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getRoomById, getRoomMessages, getUserbyId, getUserInfo } from "@/api/http";
import { useEffect } from "react";
import { useWsStore } from "@/store/wsStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft, UsersRound } from "lucide-react";

const ChatRoom = () => {
  const { roomId } = useParams();

  if (!roomId) throw new Error("roomId required");

    const connect = useWsStore((state) => state.connect);
    const disconnect = useWsStore((state) => state.disconnect);
    const roomData = useWsStore((state) => state.roomSizes[roomId]);
    const count = roomData?.count ?? 0;
    const members = roomData?.member ?? [];

    const memberQueries = useQueries({
        queries: members.map((userId) => ({
        queryKey: ["user-profile", userId],
        queryFn: async () => {
                // Replace with your actual HTTP client/endpoint to get a username by ID
            const response = await getUserbyId({id: userId})
            console.log(response)
            return response
        },
        staleTime: 5 * 60 * 1000, // Cache usernames for 5 minutes so you don't over-fetch
        })),
    });

        // Extract the resolved usernames safely, filtering out anything still loading
    const usernames = memberQueries
        .map((query) => query.data)
        .filter((username): username is string => !!username);

    const roomName = useQuery({
        queryKey: ["room_name"],
        queryFn: () => getRoomById({id: roomId}),
        retry: false
    });

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const messageQuery = useQuery({
    queryKey: ["message", roomId],
    queryFn: () => getRoomMessages({ roomId }),
    retry: false,
  });

  useEffect(() => {
    connect(roomId);

    return () => {
      disconnect();
    };
  }, [roomId, connect, disconnect]);

  useEffect(() => {
    if (messageQuery.isSuccess && messageQuery.data?.roomMsg) {
      const msg = messageQuery.data.roomMsg.map((msg: any) => ({
        id: msg.id,
        text: msg.text,
        createdAt: new Date(msg.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        username: msg.user.username,
      }));

      useWsStore.setState({ messages: msg });
    }
  }, [messageQuery.isSuccess, messageQuery.data]);

  if (userQuery.isLoading || messageQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-white">
        Loading messages...
      </div>
    );
  }

  if (userQuery.isError || !userQuery.data?.user.username) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4 text-red-500">
        Error loading user info.
      </div>
    );
  }

  const user = userQuery.data.user.username;

  const navigate = useNavigate();
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background p-3 text-[#F3F4F6] sm:p-4 lg:p-6">

      {/* Chat container */}
      <div
        className="
          mx-auto flex h-full w-full flex-col
          overflow-hidden

          lg:mr-[px]
          lg:w-[calc(100%-650px)]
        "
      >

        {/* Header */}
        <header
          className="
            flex h-16 shrink-0 items-center justify-between lg:justify-start
            border-b border-white/10
            px-4 sm:px-6 
          "
        >   
          <div className="hidden lg:block">
            <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                  className="p-2 text-white/60 transition duration-200  "
                >
                  <ArrowBigLeft size={28} strokeWidth={2} className="hover:text-primary/30 hover:scale-110 transition-all duration-200 text-white/50 brightness-130" />
                </button>
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold sm:text-base">
                {roomName.data}
            </h1>

            <div className="mt-1 lg:flex items-center gap-1.5 text-xs text-white/40 hidden">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {count ?? 0} online
            </div>
          </div>

          {/* Mobile member count */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60 lg:hidden">
            <UsersRound size={13} />
            {count ?? 0}
          </div>
        </header>


        {/* Messages */}
        <section className="message-scroll min-h-0 flex-1 overflow-y-auto">
          <MessageList currentUser={user} />
        </section>


        {/* Input */}
        <footer className="p-3 sm:p-4">
          <div className="rounded-4xl border hover:translate-y-1 transition-all duration-300 border-primary/20 px-2 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:px-4 sm:py-2">
            <RoomInputBar />
          </div>
        </footer>

      </div>


      {/* Online members */}
      <aside
        className="
          absolute right-12 top-1/2 hidden
          w-60 -translate-y-1/2
          rounded-3xl
          border border-white/10
          bg-neutral-950
          p-5
          lg:block
        "
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold">
            Online members
          </h2>

          <span className="flex items-center gap-1 text-xs text-white/40">
            <UsersRound size={13} />
            {count ?? 0}
          </span>
        </div>

        {/* Members will go here */}
        <div className="space-y-3">
          <div className="text-sm text-neutral-300">
            {usernames.map((username, index) => (
                <div key={index}>
                    {username}
                </div>
                ))}
          </div>
        </div>
      </aside>

    </main>
  );
};

export default ChatRoom;