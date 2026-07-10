<script setup>
import HeroSection from '../components/HeroSection.vue'
import StatsSection from '../components/StatsSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ExperimentsSection from '../components/ExperimentsSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FaqSection from '../components/FaqSection.vue'
import CtaSection from '../components/CtaSection.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
</script>

<template>
  <div>
    <HeroSection />
    <RevealOnScroll><StatsSection /></RevealOnScroll>
    <RevealOnScroll :delay="100"><FeaturesSection /></RevealOnScroll>
    <RevealOnScroll :delay="100"><ExperimentsSection /></RevealOnScroll>
    <RevealOnScroll :delay="100"><TestimonialsSection /></RevealOnScroll>
    <RevealOnScroll :delay="100"><FaqSection /></RevealOnScroll>
    <RevealOnScroll :delay="100"><CtaSection /></RevealOnScroll>
  </div>
</template>
