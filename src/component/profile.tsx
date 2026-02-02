interface ProfileProps {
  user: { name: string }
  onLogout: () => void
  onDeleteAccount: () => void
}

export function Profile({
  user,
  onLogout,
  onDeleteAccount,
}: ProfileProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border p-8">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">👤</div>
        <h2 className="text-xl font-bold text-slate-800">
          {user.name}
        </h2>
      </div>

      <div className="space-y-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2
            py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition"
        >
          🚪 Logout
        </button>

        <button
          onClick={onDeleteAccount}
          className="w-full flex items-center justify-center gap-2
            py-2 rounded-lg bg-red-100 text-red-700
            hover:bg-red-200 transition"
        >
          🗑️ Delete Account
        </button>
      </div>
    </div>
  )
}
