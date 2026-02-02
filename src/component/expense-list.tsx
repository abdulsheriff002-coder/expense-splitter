import type { Expense, Member } from "../lib/Ts types"

type Props = {
  expenses: Expense[]
  members: Member[]
}

export default function ExpenseList({ expenses, members }: Props) {
  
  const nameOf = (id: string) => members.find((m) => m.id === id)?.name ?? "Unknown"

  return (
    <ul className="space-y-3">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="bg-white p-4 rounded shadow flex flex-col space-y-1"
        >
          <div className="flex justify-between">
            <span className="font-semibold">{expense.description}</span>
            <span className="font-medium">${expense.amount.toFixed(2)}</span>
          </div>
          <div className="text-sm text-gray-600">Category: {expense.category}</div>
          <div className="text-sm text-gray-700">
            Paid by: {expense.paidBy.map((id) => nameOf(id)).join(", ")}
          </div>
        </li>
      ))}
    </ul>
  )
}
