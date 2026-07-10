<script setup>
import { useI18n } from 'vue-i18n'
import * as icons from 'lucide-vue-next'
import { useExperimentsStore } from '../stores/experiments'
const { t } = useI18n()
const store = useExperimentsStore()

const levelColor = (level) =>
  level === 'Easy' || level === '???' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <h2 class="text-3xl font-bold text-gray-900">{{ t('experimentsSection.title') }}</h2>
        <p class="text-gray-500 mt-2">{{ t('experimentsSection.subtitle') }}</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="e in store.featured" :key="e.id" class="rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
              <component :is="icons[e.icon]" class="w-6 h-6 text-primary-600" />
            </div>
            <span :class="['text-xs font-semibold px-2.5 py-1 rounded-full', levelColor(t('experiments.' + e.id + '.level'))]">
              {{ t('experiments.' + e.id + '.level') }}
            </span>
          </div>

          <h3 class="font-bold text-lg text-gray-900">{{ t('experiments.' + e.id + '.title') }}</h3>
          <p class="text-sm text-gray-500 mt-2 flex-1">{{ t('experiments.' + e.id + '.desc') }}</p>

          <div class="flex items-center justify-between mt-4 text-xs text-gray-400">
            <span>{{ t('experiments.' + e.id + '.tag') }}</span>
            <span class="font-semibold text-primary-600">+{{ e.xp }} XP</span>
          </div>

          <router-link to="/lab" class="mt-4 text-sm font-semibold text-primary-600 hover:underline">
            {{ t('experimentsSection.learnMore') }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
