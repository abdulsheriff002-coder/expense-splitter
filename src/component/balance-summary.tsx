import type { User } from "../lib/Ts types"

type Props = {
  user: User
}

export default function BalanceSummary({ user }: Props) {
  if (!user.room) return null

  const { members, expenses } = user.room

  // Step 1: calculate net balance for each member
  const netBalance: Record<string, number> = {}
  members.forEach((m) => (netBalance[m.id] = 0))

  expenses.forEach((exp) => {
    const share = exp.amount / exp.paidBy.length
    exp.paidBy.forEach((payerId) => {
      netBalance[payerId] += share
    })
    members.forEach((m) => {
      if (!exp.paidBy.includes(m.id)) {
        netBalance[m.id] -= share
      }
    })
  })

  // Step 2: generate debts (who owes whom)
  const debts: string[] = []

  const creditors = members.filter((m) => netBalance[m.id] > 0)
  const debtors = members.filter((m) => netBalance[m.id] < 0)

  const credBalances = creditors.map((c) => ({
    id: c.id,
    name: c.name,
    amount: netBalance[c.id],
  }))

  const debtBalances = debtors.map((d) => ({
    id: d.id,
    name: d.name,
    amount: -netBalance[d.id], // make positive
  }))

  debtBalances.forEach((debtor) => {
    let remaining = debtor.amount

    for (let i = 0; i < credBalances.length && remaining > 0; i++) {
      const creditor = credBalances[i]
      if (creditor.amount === 0) continue

      const payment = Math.min(remaining, creditor.amount)
      debts.push(`${debtor.name} owes ${creditor.name} $${payment.toFixed(2)}`)

      creditor.amount -= payment
      remaining -= payment
    }
  })

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-bold">Detailed Balances</h2>
      {debts.length === 0 ? (
        <p className="text-gray-600">All settled up!</p>
      ) : (
        <ul className="space-y-1 list-disc pl-5">
          {debts.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
