import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLabStore } from '../stores/lab'

export function useLabReaction() {
  const { t, locale } = useI18n()
  const lab = useLabStore()

  const selectedAcid = ref(null)
  const selectedIon = ref(null)
  const reactionPhase = ref('idle')
  const reactionState = ref('idle')
  const showProduct = ref(false)
  const showEnergy = ref(false)
  const showSteam = ref(false)
  const showBubbles = ref(false)
  const bubbleCount = ref(0)

  const timers = []

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer))
    timers.length = 0
  }

  const resetSimulation = () => {
    clearTimers()
    reactionPhase.value = 'idle'
    reactionState.value = 'idle'
    showProduct.value = false
    showEnergy.value = false
    showSteam.value = false
    showBubbles.value = false
    bubbleCount.value = 0
    selectedAcid.value = null
    selectedIon.value = null
    lab.reset()
  }

  const queueStep = (callback, delay) => {
    const timer = window.setTimeout(callback, delay)
    timers.push(timer)
  }

  const selectReagent = (type, value) => {
    if (type === 'acid') {
      selectedAcid.value = value
      if (selectedIon.value) {
        runReaction(selectedAcid.value, selectedIon.value)
      }
      return
    }

    selectedIon.value = value
    if (selectedAcid.value) {
      runReaction(selectedAcid.value, selectedIon.value)
    }
  }

  const reactionMessage = computed(() => {
    if (reactionState.value === 'success') return t('labPage.results.successMessage')
    if (reactionState.value === 'warning') return t('labPage.results.errorMessage')
    if (reactionState.value === 'moving') return t('labPage.statuses.neutralizationProgress')
    return t('labPage.results.idleMessage')
  })

  const explanation = computed(() => {
    if (reactionState.value === 'success') return t('labPage.results.successExplanation')
    if (reactionState.value === 'warning') return t('labPage.results.errorExplanation')
    if (reactionState.value === 'moving') return t('labPage.results.idleExplanation')
    return t('labPage.results.idleExplanation')
  })

  const equation = computed(() => {
    if (reactionState.value === 'success') return t('labPage.results.idleEquation')
    if (reactionState.value === 'warning') return t('labPage.results.noProducts')
    return t('labPage.results.idleEquation')
  })

  const runReaction = (acidId, ionId) => {
    resetSimulation()
    selectedAcid.value = acidId
    selectedIon.value = ionId

    if (acidId === 'hcl' && ionId === 'oh') {
      lab.addHCl()
      lab.addNaOH()
      reactionState.value = 'moving'
      reactionPhase.value = 'moving'
      queueStep(() => {
        reactionPhase.value = 'colliding'
      }, 650)
      queueStep(() => {
        reactionPhase.value = 'reacting'
        showBubbles.value = true
        showEnergy.value = true
        showSteam.value = true
        bubbleCount.value = 16
        reactionState.value = 'moving'
      }, 1400)
      queueStep(() => {
        reactionPhase.value = 'success'
        showProduct.value = true
        showEnergy.value = true
        reactionState.value = 'success'
      }, 2600)
      return
    }

    reactionPhase.value = 'warning'
    reactionState.value = 'warning'
    lab.reaction = 'none'
  }

  const handleDrop = (type, value) => {
    selectReagent(type, value)
  }

  const isCorrectPair = computed(() => selectedAcid.value === 'hcl' && selectedIon.value === 'oh')

  watch(locale, () => {
    if (reactionState.value === 'idle' || reactionState.value === 'warning') return
    reactionState.value = reactionState.value
  })

  onBeforeUnmount(() => {
    clearTimers()
  })

  return {
    selectedAcid,
    selectedIon,
    reactionPhase,
    reactionMessage,
    explanation,
    equation,
    showProduct,
    showEnergy,
    showSteam,
    showBubbles,
    bubbleCount,
    isCorrectPair,
    resetSimulation,
    selectReagent,
    handleDrop,
  }
}
