import { UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/http";
import RoomCard from "@/components/RoomCard";

const Profile = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  let rooms = [];

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-white">
        Loading profile...
      </main>
    );
  }

  if (isError || !data?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-red-400">
        Failed to load profile.
      </main>
    );
  }

  
  if(isSuccess){
    console.log(data)
    rooms = data.user.rooms.map((room: any) => {
            return {
                id: room.id,
                name: room.name,
                createdAt: new Date(room.createdAt),
                ownerId: room.ownerId,
                ownerName: data.user.username
            }
        }) || [];  
        console.log(rooms)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto w-full h-full max-w-4xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Profile
          </h1>

          <p className="mt-1 text-sm text-foreground/50">
            Manage your account information.
          </p>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-black p-6">

          {/* Avatar */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <UserRound size={28} strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                {/* {user.username} */}
              </h2>

              <p className="text-sm text-foreground/50">
                Your account
              </p>
            </div>
          </div>

          {/* User information */}
          <div className="space-y-5">

            <div>
              <p className="mb-1 text-xs text-foreground/40">
                Username
              </p>

              <p className="text-sm">
                {data.user.username}
              </p>
            </div>

          </div>

        </div>

        <div className="text-2xl font-semibold tracking-tight mt-10"> 
            <div className="mb-4">Rooms</div>
            <div className=" flex flex-wrap gap-12">
                {rooms.length !== 0 
                && rooms.map((room: any) => (
                    
                        <RoomCard
                        key={room.id}
                        room={room}
                        />
                
                ))}
                
            </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;