import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
const usernameRef = useRef<HTMLInputElement | null>(null);
const roomRef = useRef<HTMLInputElement | null>(null);
const navigate = useNavigate();

function HandleJoin(){
      const username = usernameRef.current?.value;
      const roomId = roomRef.current?.value;
      console.log(roomId)
      if(!username || !roomId) return;

      navigate(`room/${roomId}`, {
        state: {
          username
        }
      });
  
}


  return (
    <div className="min-h-screen bg-[#222222] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#C2D8C4] tracking-tight">
            conet
          </h1>

          <p className="mt-3 text-zinc-400">
            Real-time conversations, powered by WebSockets.
          </p>
        </div>

        <div className="rounded-4xl border border-[#C2D8C4] bg-[#222222] p-8">
          
          <h2 className="text-center text-xl font-semibold text-[#C2D8C4] mb-6">
            Join a Room
          </h2>

          <div className="space-y-4">
            <input

              placeholder="Enter your name"
              className="
                w-full
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
              type="text"
              ref={usernameRef}
            />

            <input
              placeholder="Enter room name"
              className="
                w-full
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
              ref={roomRef}
            />

            <button
              className="
                w-full
                py-3
                rounded-2xl
                bg-[#C2D8C4]
                text-black
                font-semibold
                hover:opacity-90
                transition
              "
              onClick={HandleJoin}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;