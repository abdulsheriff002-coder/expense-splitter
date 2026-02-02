import { useState } from "react"

interface MembersManagementProps {
  members: string[]
  onAddMembers: (members: string[]) => void
}

export function MembersManagement({
  members,
  onAddMembers,
}: MembersManagementProps) {
  const [name, setName] = useState("")

  const addMember = () => {
    if (!name.trim()) return
    onAddMembers([...members, name.trim()])
    setName("")
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        👥 Members
      </h3>

      <div className="flex gap-3 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Member name"
          className="flex-1 px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addMember}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg
            hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {members.length > 0 && (
        <ul className="space-y-2">
          {members.map((m, i) => (
            <li
              key={i}
              className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700"
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
