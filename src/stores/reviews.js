import { defineStore } from 'pinia'
import i18n from '../i18n'
import { getSeedReviews } from '../data/seedReviews'

const REVIEWS_KEY = 'chemlab_reviews'

function loadExtra() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveExtra(list) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(list))
}

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    extraReviews: loadExtra(),
  }),
  getters: {
    all: (state) => {
      const locale = i18n.global.locale.value
      return [...state.extraReviews, ...getSeedReviews(locale)]
    },
    average: (state) => {
      const list = [...state.extraReviews, ...getSeedReviews(i18n.global.locale.value)]
      if (!list.length) return 0
      return Math.round((list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10) / 10
    },
  },
  actions: {
    addReview({ name, role, rating, text }) {
      const review = {
        id: 'r_' + Date.now(),
        name: name || 'Anonymous',
        role: role || '',
        rating: Math.min(5, Math.max(1, rating)),
        text,
      }
      this.extraReviews.unshift(review)
      saveExtra(this.extraReviews)
    },
  },
})
