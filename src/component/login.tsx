import { useState } from "react"

interface LoginProps {
  onLogin: (name: string) => void
}

interface StoredUser {
  name: string
  password: string
}

export function Login({ onLogin }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const getStoredUser = (): StoredUser | null => {
    const data = localStorage.getItem("expense-user")
    return data ? JSON.parse(data) : null
  }

  const handleSubmit = () => {
    setError("")

    if (!name.trim() || !password.trim()) {
      setError("All fields are required")
      return
    }

    const storedUser = getStoredUser()

    if (isSignup) {
      if (storedUser) {
        setError("Account already exists. Please login.")
        return
      }

      localStorage.setItem(
        "expense-user",
        JSON.stringify({ name: name.trim(), password })
      )

      onLogin(name.trim())
      return
    }

    if (!storedUser) {
      setError("No account found. Please sign up.")
      return
    }

    if (
      storedUser.name !== name.trim() ||
      storedUser.password !== password
    ) {
      setError("Incorrect username or password")
      return
    }

    onLogin(storedUser.name)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-7 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
              hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>

        <p className="text-sm text-center mt-6 text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => {
              setIsSignup(!isSignup)
              setError("")
            }}
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  )
}
