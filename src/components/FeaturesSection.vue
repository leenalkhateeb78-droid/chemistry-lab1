<script setup>
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Sparkles, Trophy, Languages } from 'lucide-vue-next'
const { t } = useI18n()

const features = [
  { icon: ShieldCheck, key: 'safe' },
  { icon: Sparkles, key: 'watch' },
  { icon: Trophy, key: 'play' },
  { icon: Languages, key: 'lang' },
]
</script>

<template>
  <section class="py-20 bg-gradient-to-b from-gray-50/70 to-white/70 backdrop-blur-sm">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">{{ t('features.title') }}</h2>
        <p class="mt-3 text-lg text-gray-500">{{ t('features.subtitle') }}</p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="f in features" :key="f.key" class="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
            <component :is="f.icon" class="h-6 w-6 text-primary-600" />
          </div>
          <h3 class="font-semibold text-gray-900">{{ t('features.' + f.key + '.title') }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ t('features.' + f.key + '.desc') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
