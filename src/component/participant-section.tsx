import type { Member } from "../lib/Ts types"

type Props = {
  members: Member[]
  onRemove: (id: string) => void
}

export default function ParticipantSection({ members, onRemove }: Props) {
  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <span>{member.name}</span>
          <button
            onClick={() => onRemove(member.id)}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
