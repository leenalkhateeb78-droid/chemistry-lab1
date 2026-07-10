<script setup>
const particles = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  top: `${8 + (index % 6) * 12}%`,
  left: `${8 + (index * 7) % 78}%`,
  size: `${8 + (index % 4) * 4}px`,
  duration: `${8 + (index % 4) * 2}s`,
  delay: `${index * 0.3}s`,
}))
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.16),_transparent_30%)]"></div>
    <div v-for="particle in particles" :key="particle.id" class="particle" :style="{
      top: particle.top,
      left: particle.left,
      width: particle.size,
      height: particle.size,
      animationDuration: particle.duration,
      animationDelay: particle.delay,
    }"></div>
    <div class="molecule molecule-1"></div>
    <div class="molecule molecule-2"></div>
    <div class="molecule molecule-3"></div>
  </div>
</template>

<style scoped>
.particle {
  position: absolute;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.28);
  animation: drift 10s ease-in-out infinite;
}

.molecule {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.65);
  border-radius: 999px;
  animation: float 6s ease-in-out infinite;
}

.molecule-1 {
  width: 72px;
  height: 72px;
  top: 18%;
  right: 10%;
}

.molecule-2 {
  width: 94px;
  height: 94px;
  bottom: 16%;
  left: 12%;
}

.molecule-3 {
  width: 56px;
  height: 56px;
  bottom: 24%;
  right: 22%;
}

@keyframes drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
  50% { transform: translate3d(12px, -18px, 0) scale(1.18); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
