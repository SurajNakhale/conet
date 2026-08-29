import { useWsStore } from "@/store/wsStore";
import { useNavigate } from "react-router-dom";

export type Room = {
  id: string;
  name: string;
  createdAt: Date;
  ownerId: string;
  ownerName: string;
};

type RoomCardProps = {
  room: Room;
};


const RoomCard = ({ room }: RoomCardProps) => {
    const navigate = useNavigate();

    const connect = useWsStore((state) => state.connect);
 
    function handleJoin(){
      connect(room.id);
      navigate(`/room/${room.id}`);
    }

    return (
    <button
      type="button"
      onClick={handleJoin}
      className="
        group flex h-32 w-full flex-col justify-between
        rounded-2xl
        border border-white/10
        bg-background
        p-5
        text-left text-foreground
        transition-all duration-200
        hover:-translate-y-1
        hover:border-accent/10
        hover:bg-primary/10
        sm:w-90
      "
    >
      {/* Top */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-start gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
            <h3 className="truncate text-lg font-medium text-white">
            {room.name}
            </h3>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-white/50">
            by <span className="text-white/70">{room.ownerName}</span>
          </p>

          <p className="mt-1 text-xs text-white/30">
            {new Date(room.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
          </p>
        </div>

        <span
          className="
            shrink-0 rounded-xl
            border border-accent/30
            px-3 py-1.5
            text-xs font-medium text-accent
            transition
            group-hover:bg-accent
            group-hover:text-background
          "
        >
          Join →
        </span>
      </div>
    </button>
  );
};

export default RoomCard;