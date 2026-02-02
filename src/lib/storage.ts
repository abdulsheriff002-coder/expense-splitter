import type { User } from "./Ts types"

const USERS_KEY = "expense_users"

export function getAllUsers(): Record<string, User> {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}")
}

export function getUser(username: string): User | null {
  return getAllUsers()[username] ?? null
}

export function saveUser(user: User) {
  const users = getAllUsers()
  users[user.username] = user
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function deleteUser(username: string) {
  const users = getAllUsers()
  delete users[username]
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
