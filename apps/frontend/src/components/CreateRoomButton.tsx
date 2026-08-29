import { createRoom } from "@/api/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export const CreateRoomButton = () => {

  const [createModule, setCreateModule] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const roomCreateMutation = useMutation({
    mutationFn: createRoom,

    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["Rooms"]
        });


        setCreateModule(!createModule);
        
        if(inputRef.current){
            inputRef.current.value = ""
        }
    }
  })

  function handleCreateroom(){
    if(inputRef.current){
        const roomName = inputRef.current.value
        if(!roomName) throw new Error("to create please enter room name");

        roomCreateMutation.mutate({ name: roomName });
    }
  }

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter"){
      e.preventDefault();
      handleCreateroom();
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setCreateModule(true)}
        className=" group flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-white/90 transition-all duration-300 hover:text-black hover:bg-accent"
      >
        <span>Create room</span>
        <Plus size={15} className="group-hover:scale-110 transition-all duration-300" strokeWidth={2} />
      </button>

      {createModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl">

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Create a room
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                Create a room and start a conversation.
              </p>
            </div>

            {/* Room name */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Room name
              </label>

              <input
                type="text"
                ref={inputRef}
                onKeyDown={pressEnter}
                placeholder="enter room name"
                className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-accent"
              />
            </div>


            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCreateModule(!createModule)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateroom}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black transition duration-200 hover:scale-98"
              >
                Create room
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};