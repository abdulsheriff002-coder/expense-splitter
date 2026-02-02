export interface Member {
  id: string
  name: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  paidBy: string[]
  participants: string[]
}

export interface Room {
  name: string            // ✅ NEW: room must have a name
  members: Member[]
  expenses: Expense[]
}

export interface User {
  username: string
  password: string
  room?: Room
}
