import { useState } from "react"
import type { User } from "../lib/Ts types"

export default function CreateRoom({
  user,
  saveUser,
}: {
  user: User
  saveUser: (u: User) => void
}) {
  const [roomName, setRoomName] = useState("")

  const createRoom = () => {
    if (!roomName.trim()) return

    saveUser({
      ...user,
      room: {
        name: roomName,
        members: [],
        expenses: [],
      },
    })
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a Room</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Room name (e.g. Flatmates)"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
      />

      <button
        className="bg-green-600 text-white w-full py-2"
        onClick={createRoom}
      >
        Create Room
      </button>
    </div>
  )
}
