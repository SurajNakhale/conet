import { useWsStore } from "@/store/wsStore";

const MessageList = ({currentUser}: {currentUser: string}) => {
  const message = useWsStore((state) => state.messages);

  
  return (
    <div className="flex flex-col gap-3 p-4">
      {message.map((m) => {
        const isMine =
          m.username.trim().toLowerCase() === currentUser
        return (
          <div
            key={m.id}
            className={`flex w-full mt-6 ${
              isMine ? "justify-end" : "justify-start"
            }`}
          > 
            <div className="max-w-[72%]">
              <div
                    className={`text-[10px] font-medium tracking-normal ${
                      isMine ? "text-acent text-end pr-3 pb-1.5" : "text-white/60 pl-3 pb-1.5 text-start"
                    }`}
                  >
                    {m.username}
              </div>

              <div
                className={`rounded-4xl px-4 py-3 ${
                  isMine
                    ? " bg-primary/60 text-[#F5FBFF]"
                    : " bg-primary/20 text-white"
                }`}
              >
                <p className="whitespace-pre-wrap break-words text-[15px] leading-6 text-current">
                  {m.text}
                </p>
              </div>
              <div
                className={`text-[9px] ${
                  isMine ? `text-end pr-3 pt-1` : `text-start pl-3 pt-1`
                }` }
                >
                  {m.createdAt}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;