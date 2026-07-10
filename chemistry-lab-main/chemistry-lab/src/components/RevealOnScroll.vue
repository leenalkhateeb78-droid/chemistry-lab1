<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { visible.value = true }, props.delay)
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <div ref="el" :class="['reveal', visible ? 'reveal-visible' : '']" role="presentation">
    <slot />
  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
