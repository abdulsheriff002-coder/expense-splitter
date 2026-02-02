type Props = {
  onLogout: () => void
}

export default function Header({ onLogout }: Props) {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Splitter</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  )
}
