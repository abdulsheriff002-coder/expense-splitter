import { useState } from "react"
import type { FormEvent } from "react"
import UiCard from "./ui-card"

export interface Expense {
  id: string
  description: string
  category: string
  amount: number
  paidBy: string[]
  paidByType: "single" | "multiple" | "all"
}

interface ExpenseFormProps {
  members: string[]
  onAddExpense: (expense: Expense) => void
}

export function ExpenseForm({ members, onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Rent")
  const [amount, setAmount] = useState("")
  const [paidByType, setPaidByType] =
    useState<"single" | "multiple" | "all">("single")
  const [paidBy, setPaidBy] = useState<string[]>([])

  const categories = ["Rent", "Groceries", "Utilities", "Other"]

  const toggleMember = (member: string) => {
    if (paidByType === "single") {
      setPaidBy([member])
    } else {
      setPaidBy((prev) =>
        prev.includes(member)
          ? prev.filter((m) => m !== member)
          : [...prev, member]
      )
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const finalPaidBy =
      paidByType === "all" ? members : paidBy

    if (!description || !amount || finalPaidBy.length === 0) return

    onAddExpense({
      id: crypto.randomUUID(),
      description,
      category,
      amount: Number(amount),
      paidBy: finalPaidBy,
      paidByType,
    })

    setDescription("")
    setAmount("")
    setPaidBy([])
    setPaidByType("single")
  }

  return (
    <UiCard title="Add Expense">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          className="input"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Paid By Type */}
        <div className="space-y-2">
          <p className="font-semibold">Paid By</p>

          <label>
            <input
              type="radio"
              checked={paidByType === "single"}
              onChange={() => setPaidByType("single")}
            />{" "}
            Single person
          </label>

          <label>
            <input
              type="radio"
              checked={paidByType === "multiple"}
              onChange={() => setPaidByType("multiple")}
            />{" "}
            Multiple people
          </label>

          <label>
            <input
              type="radio"
              checked={paidByType === "all"}
              onChange={() => setPaidByType("all")}
            />{" "}
            Everyone
          </label>
        </div>

        {paidByType !== "all" && (
          <div className="flex flex-wrap gap-2">
            {members.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => toggleMember(m)}
                className={`px-3 py-1 rounded-full border ${
                  paidBy.includes(m)
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        <button className="btn-primary w-full">
          Add Expense
        </button>
      </form>
    </UiCard>
  )
}
