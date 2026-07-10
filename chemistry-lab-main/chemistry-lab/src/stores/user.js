import { defineStore } from 'pinia'
import i18n from '../i18n'

export const useUserStore = defineStore('user', {
  state: () => ({
    level: 3,
    xp: 1240,
    xpNeeded: 1500,
    coins: 320,
    completed: 6,
    remaining: 6,
    streak: 5,
    leaderboard: [
      { rank: 1, key: 'layla', xp: 4820 },
      { rank: 2, key: 'omar', xp: 4610 },
      { rank: 3, key: 'sara', xp: 4390 },
      { rank: 4, key: 'yousef', xp: 3980 },
      { rank: 5, key: 'nour', xp: 3720 },
      { rank: 6, key: 'ali', xp: 3510 },
      { rank: 7, key: 'you', xp: 1240, isYou: true },
    ],
    achievements: [
      { key: 'a1', unlocked: true },
      { key: 'a2', unlocked: true },
      { key: 'a3', unlocked: true },
      { key: 'a4', unlocked: false },
      { key: 'a5', unlocked: false },
      { key: 'a6', unlocked: false },
    ],
  }),
  getters: {
    xpPercent: (state) => Math.round((state.xp / state.xpNeeded) * 100),
    localizedLeaderboard: (state) => {
      const locale = i18n.global.locale.value
      return state.leaderboard.map((entry) => ({
        ...entry,
        name: locale === 'ar'
          ? i18n.global.t(`leaderboard.names.${entry.key}.ar`)
          : i18n.global.t(`leaderboard.names.${entry.key}.en`),
      }))
    },
  },
})
