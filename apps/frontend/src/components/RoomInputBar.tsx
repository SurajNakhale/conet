import { useWsStore } from "@/store/wsStore";
import { useRef } from "react";

const RoomInputBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sendmsg = useWsStore((state) => state.sendMessage);


  const sendMessage = () => {
    if(inputRef.current){
      const text = inputRef.current.value;
      sendmsg(text);

      inputRef.current.value = ""
    }

  }

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter"){
      e.preventDefault();
      sendMessage();
    }
  }
  
  return (
    <div className="flex items-center gap-3 ">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        onKeyDown={pressEnter}
        className="flex-1 bg-transparent px-4 py-3 text-normal text-foreground placeholder:text-foreground outline-none transition"
      />

      <button
        type="button"
        onClick={sendMessage}
        className="rounded-3xl
        border-l border-r border-primary/25
        text-left text-foreground
        transition-all duration-200
        hover:bg-primary/30
        hover:border-primary/30
         px-5 py-3 text-sm font-medium"
      >
        Send
      </button>
    </div>
  );
};

export default RoomInputBar