<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { FlaskConical, Droplets, Flame, RotateCcw, Lightbulb, Sparkles, Atom, Waves } from 'lucide-vue-next'
import { useLabStore } from '../stores/lab'
import { useLabReaction } from '../composables/useLabReaction'

const { t } = useI18n()
const lab = useLabStore()
const {
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
  resetSimulation,
  selectReagent,
  isCorrectPair,
} = useLabReaction()

const liquidColor = computed(() => {
  if (reactionPhase.value === 'success') return 'from-cyan-300 to-blue-200'
  if (reactionPhase.value === 'warning') return 'from-amber-100 to-amber-200'
  if (lab.hasIndicator) {
    if (lab.ph < 7) return 'from-red-300 to-rose-200'
    if (lab.ph > 7) return 'from-blue-300 to-cyan-200'
    return 'from-green-300 to-emerald-200'
  }
  return 'from-primary-100 to-primary-50'
})

const statusText = computed(() => {
  const base = t(`labPage.statuses.${lab.statusKey}`)
  if (lab.statusKey === 'heated') {
    return t('labPage.statuses.heated', { temperature: lab.temperature })
  }
  return base
})

const reagentButtons = computed(() => [
  { id: 'hcl', label: t('labPage.addHCl'), iconClass: 'text-red-500', type: 'acid' },
  { id: 'oh', label: t('labPage.reagentOH'), iconClass: 'text-blue-500', type: 'ion' },
])

const handleReagentClick = (reagent) => {
  selectReagent(reagent.type, reagent.id)
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">{{ t('labPage.title') }}</h1>
      <p class="mt-3 text-lg text-gray-500">{{ t('labPage.subtitle') }}</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div class="rounded-4xl border border-gray-100 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
        <div class="mb-8 flex justify-center">
          <div class="relative h-72 w-56 overflow-hidden rounded-4xl border-4 border-gray-300 bg-white shadow-inner">
            <div :class="['absolute inset-x-0 bottom-0 transition-all duration-700', liquidColor]" :style="{ height: `${Math.min(92, lab.liquidLevel)}%` }">
              <div class="h-full w-full opacity-80"></div>
            </div>

            <div v-if="showBubbles" class="pointer-events-none absolute inset-0">
              <div v-for="bubble in bubbleCount" :key="bubble" class="bubble" :style="{ left: `${8 + (bubble % 7) * 12}%` }"></div>
            </div>
            <div v-if="showEnergy" class="pointer-events-none absolute inset-0">
              <div class="energy energy-1"></div>
              <div class="energy energy-2"></div>
              <div class="energy energy-3"></div>
            </div>
            <div v-if="showSteam" class="pointer-events-none absolute inset-0">
              <div class="steam steam-1"></div>
              <div class="steam steam-2"></div>
            </div>
            <div v-if="reactionPhase === 'moving'" class="pointer-events-none absolute inset-0">
              <div class="particle particle-left"></div>
              <div class="particle particle-right"></div>
            </div>
            <div v-if="reactionPhase === 'colliding' || reactionPhase === 'reacting'" class="pointer-events-none absolute inset-0">
              <div class="impact"></div>
            </div>
            <div v-if="showProduct" class="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div class="product-pill">H₂O</div>
            </div>
            <div v-if="reactionPhase === 'warning'" class="pointer-events-none absolute inset-0 bg-rose-300/20 blur-3xl"></div>
            <FlaskConical class="absolute inset-0 m-auto h-12 w-12 text-gray-300" />
          </div>
        </div>

        <div class="mb-8 flex flex-wrap justify-center gap-3">
          <button
            v-for="reagent in reagentButtons"
            :key="reagent.id"
            type="button"
            class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-sm"
            :class="(reagent.type === 'acid' && selectedAcid === reagent.id) || (reagent.type === 'ion' && selectedIon === reagent.id) ? 'border-primary-400 bg-primary-50 text-primary-700' : ''"
            @click="handleReagentClick(reagent)"
          >
            <component :is="reagent.type === 'acid' ? Droplets : Atom" class="h-4 w-4" :class="reagent.iconClass" />
            {{ reagent.label }}
          </button>
          <button @click="lab.heat" class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-sm">
            <Flame class="h-4 w-4 text-orange-500" /> {{ t('labPage.heat') }}
          </button>
          <button @click="resetSimulation" class="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200">
            <RotateCcw class="h-4 w-4 text-gray-500" /> {{ t('labPage.reset') }}
          </button>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-gray-100 bg-slate-50 p-5 text-center">
            <p class="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{{ t('labPage.ph') }}</p>
            <p class="text-3xl font-extrabold text-primary-600">{{ lab.ph }}</p>
          </div>
          <div class="rounded-2xl border border-gray-100 bg-slate-50 p-5 text-center">
            <p class="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{{ t('labPage.temp') }}</p>
            <p class="text-3xl font-extrabold text-orange-500">{{ lab.temperature }}C</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-4xl border border-primary-100 bg-linear-to-br from-primary-50 to-white p-6 shadow-soft">
          <div class="mb-3 flex items-center gap-2">
            <Lightbulb class="h-5 w-5 text-primary-600" />
            <p class="text-sm font-semibold text-primary-700">{{ t('labPage.insightTitle') }}</p>
          </div>
          <p class="text-sm leading-7 text-gray-700">{{ statusText }}</p>
          <div class="mt-4 rounded-2xl border border-white/70 bg-white/80 p-3 text-sm font-semibold text-gray-700">
            {{ reactionMessage }}
          </div>
        </div>

        <div class="rounded-4xl border border-gray-100 bg-white p-6 shadow-soft">
          <div class="mb-3 flex items-center gap-2">
            <Sparkles class="h-5 w-5 text-accent-500" />
            <p class="text-sm font-semibold text-gray-900">{{ t('labPage.resultsTitle') }}</p>
          </div>
          <p class="text-sm leading-7 text-gray-600">{{ explanation }}</p>
          <div class="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-primary-700">
            <Waves class="h-4 w-4" />
            <span>{{ t('labPage.results.equation') }}: {{ equation }}</span>
          </div>
          <div class="mt-4 grid gap-3 rounded-2xl border border-dashed border-primary-200 bg-primary-50/70 p-3 text-sm text-primary-700">
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.products') }}</span><span class="font-semibold">{{ isCorrectPair ? `${t('labPage.results.water')}, ${t('labPage.results.chloride')}` : t('labPage.results.noProducts') }}</span></div>
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.precipitate') }}</span><span class="font-semibold">{{ t('common.no') }}</span></div>
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.gas') }}</span><span class="font-semibold">{{ t('common.no') }}</span></div>
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.colorChange') }}</span><span class="font-semibold">{{ isCorrectPair ? t('labPage.results.colorNeutral') : t('labPage.results.noColorChange') }}</span></div>
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.phBefore') }}</span><span class="font-semibold">7</span></div>
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.phAfter') }}</span><span class="font-semibold">7</span></div>
            <div class="flex items-center justify-between"><span>{{ t('labPage.results.energy') }}</span><span class="font-semibold">{{ isCorrectPair ? t('labPage.results.energyExothermic') : t('labPage.results.energyNone') }}</span></div>
          </div>
          <div class="mt-4 rounded-2xl border border-primary-100 bg-white/70 p-3 text-sm text-gray-700">
            <div class="mb-2 font-semibold text-primary-700">{{ t('labPage.results.explanation') }}</div>
            <p>{{ explanation }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bubble {
  position: absolute;
  bottom: 14px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  animation: rise 1.2s ease-out infinite;
}

.energy {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.7);
  animation: sparkle 1s linear infinite;
}

.energy-1 { top: 26%; left: 36%; }
.energy-2 { top: 34%; left: 58%; animation-delay: 0.2s; }
.energy-3 { top: 46%; left: 44%; animation-delay: 0.4s; }

.steam {
  position: absolute;
  left: 50%;
  width: 32px;
  height: 70px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.55);
  transform: translateX(-50%);
  animation: steam 1.2s ease-out infinite;
}

.steam-1 { top: 10%; }
.steam-2 { top: 4%; animation-delay: 0.2s; }

.particle {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fb7185, #38bdf8);
  animation: moveParticle 0.9s ease-in-out forwards;
}

.particle-left { left: 26%; top: 54%; }
.particle-right { right: 24%; top: 54%; animation-delay: 0.15s; }

.impact {
  position: absolute;
  inset: 38% 42% auto;
  width: 60px;
  height: 60px;
  border-radius: 999px;
  border: 4px solid rgba(255, 255, 255, 0.8);
  animation: pulse 0.75s ease-out infinite;
}

.product-pill {
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.85);
  color: #0f172a;
  font-weight: 700;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
  animation: pop 0.8s ease-out;
}

@keyframes rise {
  0% { transform: translateY(0) scale(0.9); opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
}

@keyframes sparkle {
  0%, 100% { transform: scale(0.7); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
}

@keyframes steam {
  0% { transform: translateX(-50%) translateY(0) scale(0.9); opacity: 0.2; }
  100% { transform: translateX(-50%) translateY(-70px) scale(1.15); opacity: 0; }
}

@keyframes moveParticle {
  0% { transform: translate(0, 0); opacity: 0.9; }
  100% { transform: translate(0, -96px); opacity: 0; }
}

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes pop {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
