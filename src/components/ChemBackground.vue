<template>
  <div class="chem-bg" aria-hidden="true">
    <span class="orb orb-purple"></span>
    <span class="orb orb-blue"></span>
    <span class="orb orb-pink"></span>

    <svg class="molecule m1" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="10" r="5" fill="currentColor" />
      <circle cx="12" cy="40" r="5" fill="currentColor" />
      <circle cx="48" cy="40" r="5" fill="currentColor" />
      <line x1="30" y1="10" x2="12" y2="40" stroke="currentColor" stroke-width="2" />
      <line x1="30" y1="10" x2="48" y2="40" stroke="currentColor" stroke-width="2" />
    </svg>

    <svg class="molecule m2" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="4" fill="currentColor" />
      <circle cx="45" cy="15" r="4" fill="currentColor" />
      <circle cx="30" cy="40" r="4" fill="currentColor" />
      <line x1="15" y1="15" x2="30" y2="40" stroke="currentColor" stroke-width="2" />
      <line x1="45" y1="15" x2="30" y2="40" stroke="currentColor" stroke-width="2" />
    </svg>

    <svg class="molecule m3" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="6" fill="currentColor" />
      <circle cx="10" cy="15" r="3.5" fill="currentColor" />
      <circle cx="50" cy="15" r="3.5" fill="currentColor" />
      <circle cx="10" cy="45" r="3.5" fill="currentColor" />
      <circle cx="50" cy="45" r="3.5" fill="currentColor" />
      <line x1="30" y1="30" x2="10" y2="15" stroke="currentColor" stroke-width="1.5" />
      <line x1="30" y1="30" x2="50" y2="15" stroke="currentColor" stroke-width="1.5" />
      <line x1="30" y1="30" x2="10" y2="45" stroke="currentColor" stroke-width="1.5" />
      <line x1="30" y1="30" x2="50" y2="45" stroke="currentColor" stroke-width="1.5" />
    </svg>

    <span class="ion ion-plus i1">+</span>
    <span class="ion ion-minus i2">-</span>
    <span class="ion ion-plus i3">+</span>

    <span class="bubble-float bf1"></span>
    <span class="bubble-float bf2"></span>
    <span class="bubble-float bf3"></span>
    <span class="bubble-float bf4"></span>
    <span class="bubble-float bf5"></span>
  </div>
</template>

<style scoped>
.chem-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.25;
  animation: float 12s ease-in-out infinite;
}
.orb-purple { width: 320px; height: 320px; background: #a78bfa; top: 5%; left: 8%; }
.orb-blue { width: 260px; height: 260px; background: #60a5fa; top: 45%; right: 6%; animation-delay: 2s; }
.orb-pink { width: 240px; height: 240px; background: #f0abfc; bottom: 10%; left: 35%; animation-delay: 4s; }

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-25px) translateX(18px); }
}

.molecule {
  position: absolute;
  width: 56px;
  height: 56px;
  color: #8b5cf6;
  opacity: 0.18;
  animation: drift 16s linear infinite;
}
.m1 { top: 12%; left: 5%; }
.m2 { top: 55%; right: 8%; animation-delay: 3s; animation-direction: reverse; }
.m3 { bottom: 8%; left: 45%; animation-delay: 6s; width: 64px; height: 64px; }

@keyframes drift {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-35px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.ion {
  position: absolute;
  font-weight: 800;
  font-size: 22px;
  color: #7c3aed;
  opacity: 0.2;
  animation: drift 13s ease-in-out infinite;
}
.i1 { top: 25%; right: 20%; animation-delay: 1s; }
.i2 { top: 65%; left: 12%; animation-delay: 3s; }
.i3 { bottom: 20%; right: 35%; animation-delay: 5s; }

.bubble-float {
  position: absolute;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.12);
  animation: bubbleUp 10s ease-in infinite;
}
.bf1 { width: 14px; height: 14px; left: 15%; bottom: -20px; animation-delay: 0s; }
.bf2 { width: 10px; height: 10px; left: 45%; bottom: -20px; animation-delay: 2s; }
.bf3 { width: 18px; height: 18px; left: 70%; bottom: -20px; animation-delay: 4s; }
.bf4 { width: 8px; height: 8px; left: 30%; bottom: -20px; animation-delay: 6s; }
.bf5 { width: 12px; height: 12px; left: 85%; bottom: -20px; animation-delay: 8s; }

@keyframes bubbleUp {
  0% { transform: translateY(0) scale(1); opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(1.3); opacity: 0; }
}
</style>
