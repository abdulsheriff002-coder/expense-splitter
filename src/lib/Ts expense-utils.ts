import type { User } from "../lib/Ts types"

export function saveUser(user: User) {
  localStorage.setItem(`user-${user.username}`, JSON.stringify(user))
}

export function getUser(username: string): User | null {
  const data = localStorage.getItem(`user-${username}`)
  return data ? JSON.parse(data) : null
}

export function deleteUser(username: string) {
  localStorage.removeItem(`user-${username}`)
}

export function deleteRoom(user: User): User {
  const updatedUser = { ...user, room: undefined }
  saveUser(updatedUser)
  return updatedUser
}
