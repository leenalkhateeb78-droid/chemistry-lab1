<script setup>
import { AlertTriangle, Flame, Waves } from 'lucide-vue-next'
defineProps({
  reaction: { type: String, default: 'none' },
})

const config = {
  explosion: { icon: AlertTriangle, text: 'Explosion! The reaction went off.', bg: 'bg-red-600' },
  fire: { icon: Flame, text: 'Warning - overheating detected!', bg: 'bg-orange-600' },
  flood: { icon: Waves, text: 'Overflow! The flask is flooding.', bg: 'bg-blue-600' },
  bubbling: { icon: Flame, text: 'Reaction in progress...', bg: 'bg-primary-600' },
}
</script>

<template>
  <Transition name="toast">
    <div
      v-if="reaction !== 'none' && config[reaction]"
      :class="['fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 text-white px-5 py-3 rounded-xl shadow-lg font-semibold text-sm', config[reaction].bg]"
    >
      <component :is="config[reaction].icon" class="w-5 h-5" />
      {{ config[reaction].text }}
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active { animation: dropIn 0.35s ease-out; }
.toast-leave-active { animation: dropIn 0.35s ease-in reverse; }
@keyframes dropIn {
  0% { opacity: 0; transform: translate(-50%, -20px); }
  100% { opacity: 1; transform: translate(-50%, 0); }
}
</style>
