import { useState } from "react";
import { ArrowBigLeft } from "lucide-react";
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
      };

      const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
      );

return (
    <main className="min-h-screen w-full bg-neutral-950 text-accent">
      <section className="flex min-h-screen w-full overflow-hidden bg-neutral-950">
        <aside className="hidden w-16 flex-col items-center border-r border-white/10 md:flex">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go back"
            className="mt-10 rounded-full p-2 text-white/60 transition duration-200  "
          >
            <ArrowBigLeft size={28} strokeWidth={2} className="hover:text-primary/30 hover:scale-110 transition-all duration-200 text-white/50 brightness-130" />
          </button>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-white/10 px-4 pb-4 pt-6 sm:px-6 md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-md">
                <SearchBar value={search} onChange={setSearch}/>
              </div>

              <div className="flex items-center justify-between transition-all duration-300 gap-4 sm:justify-center sm:gap-8 sm:pr-2">
                <CreateRoomButton />
                <ProfileButton />
              </div>
            </div>
          </header>

          <div className="px-4 pt-5 sm:px-6 md:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">conet</p>
                <h1 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  Available rooms
                </h1>
              </div>
            </div>

            <div className="mt-10 md:ml-4 flex flex-wrap gap-4 md:gap-5">
              {filteredRooms.length !== 0 
              && filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Rooms