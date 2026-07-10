<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  compact: { type: Boolean, default: false },
})

const { locale } = useI18n()
</script>

<template>
  <div class="flex items-center gap-2.5 select-none">
    <div class="relative w-9 h-9 shrink-0">
      <svg viewBox="0 0 40 40" class="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#logoGrad)" />
        <path
          d="M17 10h6v6l5 9.5a2.6 2.6 0 0 1-2.3 3.8H14.3A2.6 2.6 0 0 1 12 25.5L17 16v-6z"
          fill="white" fill-opacity="0.92"
        />
        <path d="M14.6 22.5h10.8" stroke="#7c3aed" stroke-width="1.4" stroke-linecap="round" />
        <circle class="logo-bubble" cx="18.5" cy="25" r="1" fill="#a78bfa" />
        <circle class="logo-bubble logo-bubble-d1" cx="21.5" cy="26.5" r="0.8" fill="#22d3ee" />
      </svg>
    </div>
    <span v-if="!compact" class="font-display font-extrabold tracking-tight leading-none">
      <template v-if="locale === 'ar'">
        <span class="text-gradient-brand">مختبر</span> <span class="text-gray-800">الكيمياء</span>
      </template>
      <template v-else>
        <span class="text-gradient-brand">Chem</span><span class="text-gray-800">Lab</span>
      </template>
    </span>
  </div>
</template>

<style scoped>
.logo-bubble {
  animation: logoBubble 2.4s infinite ease-in;
  transform-origin: center;
}
.logo-bubble-d1 {
  animation-delay: 0.7s;
}
@keyframes logoBubble {
  0% { opacity: 0; transform: translateY(0) scale(0.6); }
  20% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-8px) scale(1.1); }
}
</style>
