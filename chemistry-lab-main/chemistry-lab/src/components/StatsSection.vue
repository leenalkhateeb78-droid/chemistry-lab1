<script setup>
import { useI18n } from 'vue-i18n'
import { useExperimentsStore } from '../stores/experiments'
const { t } = useI18n()
const store = useExperimentsStore()

const items = [
  { key: 'experiments', value: '40+' },
  { key: 'students', value: '12k+' },
  { key: 'countries', value: '24' },
  { key: 'rating', value: '4.9' },
]
</script>

<template>
  <section class="border-y border-gray-100 bg-white/80 backdrop-blur-sm">
    <div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-12 text-center sm:px-6 md:grid-cols-4 lg:px-8">
      <div v-for="s in items" :key="s.key" class="rounded-2xl bg-slate-50/80 p-4 shadow-sm">
        <p class="text-3xl font-extrabold text-primary-600">{{ s.value }}</p>
        <p class="mt-2 text-sm text-gray-500">{{ t('stats.' + s.key) }}</p>
      </div>
    </div>
  </section>
</template>
