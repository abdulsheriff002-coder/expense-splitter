import { useState } from "react"
import { RoomManager } from "./component/room-manager"
import { MembersManagement } from "./component/members-management"
import { ExpenseForm } from "./component/expense-form"
import { ExpenseSplitter } from "./component/expense-splitter"
import { Profile } from "./component/profile"
import { Login } from "./component/login"
import type { Expense } from "./component/expense-form"

interface User {
  name: string
}

type View = "dashboard" | "profile"

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [roomCreated, setRoomCreated] = useState(false)
  const [roomName, setRoomName] = useState("")
  const [members, setMembers] = useState<string[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [view, setView] = useState<View>("dashboard")

  const logout = () => {
    setUser(null)
    setRoomCreated(false)
    setRoomName("")
    setMembers([])
    setExpenses([])
    setView("dashboard")
  }

  const deleteAccount = () => {
    if (confirm("Delete your account permanently?")) {
      localStorage.removeItem("expense-user")
      logout()
    }
  }

  const createRoom = (name: string) => {
    if (!name.trim()) {
      alert("Please enter a room name")
      return
    }
    setRoomName(name.trim())
    setRoomCreated(true)
  }

  if (!user) {
    return <Login onLogin={(name) => setUser({ name })} />
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {roomCreated && (
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
            <h1 className="text-xl font-bold text-slate-800">
              Expense Splitter
            </h1>

            <div className="flex gap-3">
              <button
                onClick={() => setView("dashboard")}
                className="px-4 py-2 rounded-lg text-slate-700
                  hover:bg-slate-100 transition"
              >
                Dashboard
              </button>

              <button
                onClick={() => setView("profile")}
                className="px-4 py-2 rounded-lg text-slate-700
                  hover:bg-slate-100 transition"
              >
                Profile
              </button>
            </div>
          </div>
        )}

        {view === "profile" && user && (
          <Profile
            user={user}
            onLogout={logout}
            onDeleteAccount={deleteAccount}
          />
        )}

        {view === "dashboard" && (
          <>
            {!roomCreated ? (
              <RoomManager onCreate={createRoom} />
            ) : (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-slate-700">
                  Room: <span className="text-slate-900">{roomName}</span>
                </h2>

                <MembersManagement
                  members={members}
                  onAddMembers={setMembers}
                />

                {members.length > 0 && (
                  <>
                    <ExpenseForm
                      members={members}
                      onAddExpense={(expense) =>
                        setExpenses((prev) => [...prev, expense])
                      }
                    />

                    <ExpenseSplitter
                      members={members}
                      expenses={expenses}
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
