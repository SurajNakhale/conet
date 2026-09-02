import { deleteRoom } from "@/api/http";
import { useWsStore } from "@/store/wsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
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
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const connect = useWsStore((state) => state.connect);

  const deleteMutation = useMutation({
    mutationFn: deleteRoom,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Rooms"]
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    }
  })


  function handleJoin() {
    connect(room.id);
    navigate(`/room/${room.id}`);
  }

  return (
    <button
      type="button"
      className="
        group flex  h-32 max-w-full flex-col justify-between
        rounded-2xl border border-white/10 bg-background
        p-4 text-left text-foreground
        transition-all duration-200
        hover:-translate-y-1 hover:border-accent/20 hover:bg-primary/10
        sm:w-68.5 lg:w-89
      "
    >
      {/* Top */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div>
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h3 className="truncate text-base font-medium text-white sm:text-lg">
              {room.name}
            </h3>
          </div>
          <button
          onClick={() => deleteMutation.mutate({roomId: room.id})}>
            <Trash2Icon className="text-red-300 hover:text-red-600 hover:scale-110 transition-all duration-300" size={12} />
          </button>
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

        <div className="flex items-center gap-2">
         

          <button
            onClick={handleJoin}
            className="
              inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10
              bg-white/5 px-3 py-2 text-xs font-medium text-white/80
              transition-all duration-200
              hover:scale-103
              group-hover:border-primary/30 group-hover:bg-primary/30
            "
          >
            <span>Join</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-base leading-none text-current transition-colors duration-200">
              →
            </span>
          </button>
        </div>
      </div>
    </button>
  );
};

export default RoomCard;