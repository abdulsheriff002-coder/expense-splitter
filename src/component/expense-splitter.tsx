import UiCard from "./ui-card"
import type { Expense } from "./expense-form"

interface Props {
  members: string[]
  expenses: Expense[]
}

export function ExpenseSplitter({ members, expenses }: Props) {
  return (
    <UiCard title="Expense Summary">
      {expenses.length === 0 && (
        <p className="text-gray-500">No expenses yet</p>
      )}

      <div className="space-y-4">
        {expenses.map((e) => {
          const share = e.amount / members.length

          return (
            <div
              key={e.id}
              className="border p-4 rounded-lg space-y-1"
            >
              <div className="font-semibold">
                {e.description} — ₵{e.amount}
              </div>

              <div className="text-sm text-gray-500">
                Category: {e.category}
              </div>

              <div className="text-sm">
                Paid by: {e.paidBy.join(", ")}
              </div>

              <div className="text-sm font-medium">
                Each owes: ₵{share.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </UiCard>
  )
}
