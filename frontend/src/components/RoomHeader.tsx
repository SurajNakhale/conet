
export function RoomHeader(){
    return (
        <div className="h-30 border-2 rounded-t-4xl border-[#C2D8C4] px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-2xl text-[#C2D8C4]">←</button>
            <div>
              <p className="text-sm text-[#C2D8C4]">room name</p>
              <h2 className="text-xl font-bold text-[#C2D8C4]">
                abc123
              </h2>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#222222] border border-[#C2D8C4] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C2D8C4]"/>
            <span>12</span>
          </div>
        </div>

    )
}