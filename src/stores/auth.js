import { defineStore } from 'pinia'

const USERS_KEY = 'chemlab_users'
const SESSION_KEY = 'chemlab_session'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: loadUsers(),
    currentUser: loadSession(),
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    initials: (state) => (state.currentUser?.fourName || '?').trim().charAt(0).toUpperCase(),
  },
  actions: {
    register({ fourName, grade, email, password }) {
      const exists = this.users.some((u) => u.email.toLowerCase() === email.toLowerCase())
      if (exists) {
        return { ok: false, error: 'exists' }
      }
      const user = {
        id: 'u_' + Date.now(),
        fourName,
        grade,
        email,
        password,
        avatar: null,
        createdAt: new Date().toISOString(),
      }
      this.users.push(user)
      saveUsers(this.users)
      this.setSession(user)
      return { ok: true }
    },

    login({ email, password }) {
      const user = this.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      if (!user) {
        return { ok: false, error: 'invalid' }
      }
      this.setSession(user)
      return { ok: true }
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem(SESSION_KEY)
    },

    setSession(user) {
      const { password, ...safeUser } = user
      this.currentUser = { ...safeUser, password }
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.currentUser))
    },

    updateAvatar(dataUrl) {
      if (!this.currentUser) return
      this.currentUser.avatar = dataUrl
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.currentUser))
      const idx = this.users.findIndex((u) => u.id === this.currentUser.id)
      if (idx !== -1) {
        this.users[idx].avatar = dataUrl
        saveUsers(this.users)
      }
    },
  },
})
