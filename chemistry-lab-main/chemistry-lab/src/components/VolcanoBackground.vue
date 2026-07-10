<template>
  <div class="volcano-bg" aria-hidden="true">
    <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" class="w-full h-full">
      <defs>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f5f3ff" stop-opacity="0" />
          <stop offset="100%" stop-color="#ede9fe" stop-opacity="0.6" />
        </linearGradient>
        <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a78bfa" />
          <stop offset="100%" stop-color="#7c3aed" />
        </linearGradient>
        <radialGradient id="lavaGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#fde047" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#f97316" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="1200" height="400" fill="url(#skyFade)" />

      <path d="M0 320 L220 140 L420 320 Z" fill="#c4b5fd" opacity="0.5" />
      <path d="M780 320 L980 170 L1200 320 Z" fill="#a5f3fc" opacity="0.45" />

      <path d="M330 320 L560 70 L790 320 Z" fill="url(#mountainGrad)" opacity="0.9" />
      <path d="M480 140 L560 70 L640 140 L600 170 L520 170 Z" fill="#5b21b6" />

      <ellipse class="lava-glow" cx="560" cy="110" rx="140" ry="90" fill="url(#lavaGlow)" />

      <g class="ember e1"><circle cx="560" cy="95" r="4" fill="#fde047" /></g>
      <g class="ember e2"><circle cx="545" cy="95" r="3" fill="#fb923c" /></g>
      <g class="ember e3"><circle cx="578" cy="95" r="3.5" fill="#f97316" /></g>
      <g class="ember e4"><circle cx="560" cy="95" r="2.5" fill="#fef08a" /></g>
      <g class="ember e5"><circle cx="570" cy="95" r="2.5" fill="#fb923c" /></g>

      <g class="molecule mol1" opacity="0.55">
        <circle cx="150" cy="90" r="6" fill="#8b5cf6" />
        <circle cx="175" cy="75" r="4" fill="#22d3ee" />
        <circle cx="170" cy="105" r="4" fill="#22d3ee" />
        <line x1="150" y1="90" x2="175" y2="75" stroke="#c4b5fd" stroke-width="2" />
        <line x1="150" y1="90" x2="170" y2="105" stroke="#c4b5fd" stroke-width="2" />
      </g>
      <g class="molecule mol2" opacity="0.5">
        <circle cx="1020" cy="80" r="5" fill="#06b6d4" />
        <circle cx="1045" cy="65" r="3.5" fill="#a78bfa" />
        <circle cx="1045" cy="95" r="3.5" fill="#a78bfa" />
        <line x1="1020" y1="80" x2="1045" y2="65" stroke="#a5f3fc" stroke-width="2" />
        <line x1="1020" y1="80" x2="1045" y2="95" stroke="#a5f3fc" stroke-width="2" />
      </g>
      <g class="molecule mol3" opacity="0.45">
        <circle cx="950" cy="220" r="5" fill="#f472b6" />
        <circle cx="975" cy="210" r="3.5" fill="#c4b5fd" />
        <line x1="950" y1="220" x2="975" y2="210" stroke="#fbcfe8" stroke-width="2" />
      </g>

      <rect x="0" y="318" width="1200" height="82" fill="#faf5ff" />
    </svg>
  </div>
</template>

<style scoped>
.volcano-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.lava-glow {
  animation: lavaPulse 2.6s ease-in-out infinite;
  transform-origin: 560px 110px;
}
@keyframes lavaPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.12); }
}

.ember {
  animation: emberRise 2.4s infinite ease-out;
  transform-origin: center;
}
.e1 { animation-delay: 0s; }
.e2 { animation-delay: 0.4s; }
.e3 { animation-delay: 0.8s; }
.e4 { animation-delay: 1.2s; }
.e5 { animation-delay: 1.6s; }
@keyframes emberRise {
  0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
  15% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx, 6px), -70px) scale(1.3); }
}
.e1 { --dx: -18px; }
.e2 { --dx: -34px; }
.e3 { --dx: 22px; }
.e4 { --dx: 4px; }
.e5 { --dx: 30px; }

.molecule {
  animation: moleculeFloat 8s ease-in-out infinite;
}
.mol1 { animation-duration: 9s; }
.mol2 { animation-duration: 11s; animation-delay: 1s; }
.mol3 { animation-duration: 7.5s; animation-delay: 2s; }
@keyframes moleculeFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(6deg); }
}
</style>
