<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowRight, FlaskConical, Sparkles } from 'lucide-vue-next'
import ChemistryDecorations from './ChemistryDecorations.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-slate-950">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.95),rgba(15,23,42,0.78),rgba(2,132,199,0.42))]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.18),transparent_25%)]"></div>
    <ChemistryDecorations />

    <div class="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
      <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm animate-[fadeIn_0.8s_ease-out]">
        <FlaskConical class="h-4 w-4" />
        <span>{{ t('hero.badge') }}</span>
      </div>

      <h1 class="max-w-4xl animate-[fadeIn_1s_ease-out] text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
        {{ t('hero.title') }}
      </h1>

      <p class="mt-6 max-w-2xl animate-[fadeIn_1.2s_ease-out] text-lg leading-8 text-slate-200 sm:text-xl">
        {{ t('hero.subtitle') }}
      </p>

      <div class="mt-10 flex flex-col gap-4 animate-[fadeIn_1.4s_ease-out] sm:flex-row">
        <router-link
          to="/lab"
          :aria-label="t('hero.ariaLab')"
          class="group inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary-500 to-accent-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(8,145,178,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(8,145,178,0.34)]"
        >
          <Sparkles class="h-4 w-4" />
          {{ t('hero.cta1') }}
          <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </router-link>

        <router-link
          to="/experiments"
          :aria-label="t('hero.ariaExperiments')"
          class="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          {{ t('hero.cta2') }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
