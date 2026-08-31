import { useWsStore } from "@/store/wsStore";

const MessageList = ({ currentUser }: { currentUser: string }) => {
  const messages = useWsStore((state) => state.messages);

  return (
    <div className="flex w-full flex-col gap-3 p-3 sm:gap-4 sm:p-4">
      {messages.map((m) => {
        const isMine =
          m.username.trim().toLowerCase() === currentUser.trim().toLowerCase();

        return (
          <div
            key={m.id}
            className={`mt-3 flex w-full sm:mt-5 ${
              isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div className="min-w-0 max-w-[85%] sm:max-w-[72%]">
              
              <div
                className={`pb-1.5 text-[10px] font-medium tracking-normal ${
                  isMine
                    ? "pr-2 text-end text-accent"
                    : "pl-2 text-start text-white/60"
                }`}
              >
                {m.username}
              </div>

        
              <div
                className={`rounded-3xl px-3 py-2.5 sm:px-4 sm:py-3 ${
                  isMine
                    ? "bg-primary/60 text-[#F5FBFF]"
                    : "bg-primary/20 text-white"
                }`}
              >
                <p className="whitespace-pre-wrap break-words text-sm leading-5 sm:text-[15px] sm:leading-6">
                  {m.text}
                </p>
              </div>

              <div
                className={`pt-1 text-[9px] ${
                  isMine
                    ? "pr-2 text-end"
                    : "pl-2 text-start"
                }`}
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