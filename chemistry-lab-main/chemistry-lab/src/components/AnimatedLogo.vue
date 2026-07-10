<script setup>
defineProps({
  size: { type: Number, default: 32 },
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
    <defs>
      <linearGradient id="flaskFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#a78bfa" />
        <stop offset="100%" stop-color="#7c3aed" />
      </linearGradient>
      <linearGradient id="flaskGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.9" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0.5" />
      </linearGradient>
    </defs>

    <path
      d="M19 5 L19 17 L9 37 Q7 41 11 41 L37 41 Q41 41 39 37 L29 17 L29 5"
      fill="none"
      stroke="url(#flaskGlass)"
      stroke-width="2.3"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 33.5 Q24 28.5 35.5 33.5 L38 38.5 Q39.3 41 36.3 41 L11.7 41 Q8.7 41 10 38.5 Z"
      fill="url(#flaskFill)"
    />
    <line x1="16" y1="5" x2="32" y2="5" stroke="url(#flaskGlass)" stroke-width="2.3" stroke-linecap="round" />

    <circle cx="21" cy="31" r="1.5" fill="white" opacity="0.85" class="bubble bb1" />
    <circle cx="27" cy="34" r="1.1" fill="white" opacity="0.85" class="bubble bb2" />
    <circle cx="24" cy="28" r="0.9" fill="white" opacity="0.85" class="bubble bb3" />

    <g class="orbit-group">
      <ellipse cx="24" cy="18" rx="13" ry="5" fill="none" stroke="#a78bfa" stroke-width="0.9" opacity="0.6" />
      <circle cx="37" cy="18" r="1.9" fill="#7c3aed" class="electron" />
    </g>
  </svg>
</template>

<style scoped>
.logo-svg { overflow: visible; }

.orbit-group {
  transform-origin: 24px 18px;
  animation: spin 3.5s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.bubble { animation: floatUp 2.4s ease-in infinite; opacity: 0; }
.bb1 { animation-delay: 0s; }
.bb2 { animation-delay: 0.7s; }
.bb3 { animation-delay: 1.4s; }
@keyframes floatUp {
  0% { opacity: 0; transform: translateY(0); }
  25% { opacity: 0.9; }
  100% { opacity: 0; transform: translateY(-12px); }
}
</style>
