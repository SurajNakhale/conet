import type { chatMessage } from "../pages/ChatRoom";

type MessageListProp = {
  message: chatMessage[];
  currentUser: string;
};

const MessageList = ({ message, currentUser }: MessageListProp) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {message.map((m, index) => {
        const isMine =
          m.username.trim().toLowerCase() ===
          currentUser.trim().toLowerCase();

        return (
          <div
            key={index}
            className={`flex w-full ${
              isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-md ${
                isMine
                  ? "bg-[#C2D8C4] text-black"
                  : "bg-zinc-700 text-white"
              }`}
            >
        
              <div className="flex items-center justify-between gap-6">
                <span
                  className={`font-semibold text-sm ${
                    isMine ? "text-[#2B463C]" : "text-white"
                  }`}
                >
                  {m.username}
                </span>

                <span
                  className={`text-[11px] ${
                    isMine ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              
              <p className="mt-2 break-words whitespace-pre-wrap">
                {m.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;