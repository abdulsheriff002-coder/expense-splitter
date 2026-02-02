import { useState } from "react"
import type { User } from "../lib/Ts types"

export default function SetupMembers({
  user,
  saveUser,
}: {
  user: User
  saveUser: (u: User) => void
}) {
  const [name, setName] = useState("")

  const addMember = () => {
    if (!name.trim()) return

    saveUser({
      ...user,
      room: {
        ...user.room!,
        members: [
          ...user.room!.members,
          { id: crypto.randomUUID(), name },
        ],
      },
    })

    setName("")
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-2">Add Members</h3>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Member name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white w-full py-2"
        onClick={addMember}
      >
        Add Member
      </button>

      {user.room!.members.length > 0 && (
        <p className="text-sm mt-2 text-gray-600">
          Members added: {user.room!.members.length}
        </p>
      )}
    </div>
  )
}
