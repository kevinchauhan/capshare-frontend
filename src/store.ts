import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface User {
    _id: string
    name: string
    email: string
    role: string
    emailVerified: boolean
}

interface AuthState {
    user: null | User
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        setUser: (user) => set({ user: user }),
        logout: () => set({ user: null })
    }))
)