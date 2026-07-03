import type { RefObject } from "react"

type inputBarProps = {
    inputRef: RefObject<HTMLInputElement | null>
    sendMessage: () => void
    pressEnter: React.KeyboardEventHandler<HTMLInputElement>
}

const RoomInputBar = ({inputRef, sendMessage, pressEnter}: inputBarProps) => {
  return (
    <div>
        <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  onKeyDown={pressEnter}
                  className="
                    flex-1
                    bg-transparent
                    border
                    border-[#3A3A3A]
                    rounded-2xl
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-[#C2D8C4]
                    transition
                  "
                />

                <button
                  onClick={sendMessage}
                  className="
                    px-6
                    py-3
                    rounded-2xl
                    bg-[#C2D8C4]
                    text-black
                    font-semibold
                    hover:opacity-90
                    transition
                  "
                >
                  Send
                </button>
              </div>
    </div>

  )
}

export default RoomInputBar