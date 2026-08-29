import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CreateRoomButton } from "@/components/CreateRoomButton";
import ProfileButton from "@/components/ProfileButton";
import RoomCard from "@/components/RoomCard";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "@/api/http";
import { useQuery } from "@tanstack/react-query";


interface RoomI {
    id: string,
    name: string,
    createdAt: Date,
    ownerId: string,
    ownerName: string
}

const Rooms = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    let rooms: RoomI[] = [];
    
    const roomQuery = useQuery({
        queryKey: ["Rooms"],
        queryFn: getAllRooms
    });

    console.log(roomQuery.data)

    if(roomQuery.isLoading) return <div>rooms loading......</div>

    if(roomQuery.isSuccess){
         rooms = roomQuery.data.rooms.map((room: any) => {
            return {
                id: room.id,
                name: room.name,
                createdAt: new Date(room.createdAt),
                ownerId: room.ownerId,
                ownerName: room.user.username
            }
        }) || [];
        
        console.log(rooms)
    };

return (
    <main className="h-screen w-full text-accent">
      <section className="flex h-full w-full overflow-hidden bg-neutral-950">
        <aside className="hidden md:max-h-full w-10 px-8 flex-col items-center border-r border-white/10 md:flex">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className=" text-white transition mt-10  hover:text-accent"
          >
            <ArrowLeft className="text-white/50" size={30} strokeWidth={2} />
          </button>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="border-b border-white/10 pt-8 px-6 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <div className="flex gap-8 justify-center pr-8 items-center">
                <CreateRoomButton />
                <ProfileButton />
              </div>
            </div>
          </header>

          <div className="pt-1 sm:pt-4 md:px-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-white/60">conet spaces</p>
                <h1 className="text-3xl font-medium tracking-tight text-accent sm:text-3xl">
                  Available rooms
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap mt-10 items-start gap-4 ml-4">
                {rooms.length != 0 &&
                    rooms.map(room => (
                        <RoomCard key={room.id} room={room}></RoomCard>
                    ))
                }
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Rooms