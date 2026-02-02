import { useState } from "react"

interface RoomManagerProps {
  onCreate: (name: string) => void
}

export function RoomManager({ onCreate }: RoomManagerProps) {
  const [roomName, setRoomName] = useState("")

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Create a Room
        </h2>

        <p className="text-slate-500 mb-6">
          Give your room a name to start splitting expenses
        </p>

        <input
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full mb-5 px-4 py-2.5 border border-slate-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => onCreate(roomName)}
          className="w-full py-3 rounded-lg font-medium text-white
            bg-blue-600 hover:bg-blue-700 transition"
        >
          Create Room
        </button>
      </div>
    </div>
  )
}

