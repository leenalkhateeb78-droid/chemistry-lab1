import { defineStore } from 'pinia'

export const useLabStore = defineStore('lab', {
  state: () => ({
    ph: 7,
    temperature: 22,
    liquidLevel: 60,
    hasIndicator: false,
    hasAcid: false,
    hasBase: false,
    statusKey: 'idle',
    reaction: 'none',
  }),
  actions: {
    addHCl() {
      this.ph = Math.max(1, this.ph - 2)
      this.hasAcid = true
      this.liquidLevel = Math.min(95, this.liquidLevel + 8)
      this.statusKey = 'addedHCl'
      this.checkReaction()
    },
    addNaOH() {
      this.ph = Math.min(14, this.ph + 2)
      this.hasBase = true
      this.liquidLevel = Math.min(95, this.liquidLevel + 8)
      this.statusKey = 'addedNaOH'
      this.checkReaction()
    },
    addIndicator() {
      this.hasIndicator = true
      this.statusKey = this.ph < 7
        ? 'acidic'
        : this.ph > 7
        ? 'basic'
        : 'neutral'
    },
    heat() {
      this.temperature = Math.min(100, this.temperature + 10)
      this.liquidLevel = Math.min(98, this.liquidLevel + 5)
      this.statusKey = 'heated'
      this.checkReaction()
    },
    checkReaction() {
      if (this.liquidLevel >= 95) {
        this.reaction = 'flood'
        this.statusKey = 'overflowed'
      } else if (this.hasAcid && this.hasBase && this.temperature >= 60) {
        this.reaction = 'explosion'
        this.statusKey = 'explosion'
      } else if (this.temperature >= 80) {
        this.reaction = 'fire'
        this.statusKey = 'overheating'
      } else if (this.hasAcid && this.hasBase) {
        this.reaction = 'bubbling'
        this.statusKey = 'neutralizationProgress'
      }
      if (this.reaction !== 'none') {
        setTimeout(() => { this.reaction = 'none' }, 2200)
      }
    },
    reset() {
      this.ph = 7
      this.temperature = 22
      this.liquidLevel = 60
      this.hasIndicator = false
      this.hasAcid = false
      this.hasBase = false
      this.reaction = 'none'
      this.statusKey = 'idle'
    },
  },
})
