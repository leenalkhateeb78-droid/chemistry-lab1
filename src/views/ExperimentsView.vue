<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import * as icons from 'lucide-vue-next'
import { useExperimentsStore } from '../stores/experiments'

const { t } = useI18n()
const store = useExperimentsStore()
const active = ref('all')

const categoryList = computed(() => [
  { key: 'all', label: t('categories.all') },
  { key: 'acidsBases', label: t('categories.acidsBases') },
  { key: 'reactions', label: t('categories.reactions') },
  { key: 'electro', label: t('categories.electro') },
  { key: 'organic', label: t('categories.organic') },
  { key: 'skills', label: t('categories.skills') },
  { key: 'everyday', label: t('categories.everyday') },
])

const tagMap = {
  acidsBases: 'Acids & Bases',
  reactions: 'Chemical Reactions',
  electro: 'Electrochemistry',
  organic: 'Organic Chemistry',
  skills: 'Lab Skills',
  everyday: 'Everyday Chemistry',
}

const filtered = computed(() => {
  if (active.value === 'all') return store.experiments
  return store.experiments.filter((experiment) => experiment.tag === tagMap[active.value])
})

const levelColor = (level) => {
  if (level === 'Easy' || level === 'سهل') return 'bg-green-100 text-green-700'
  if (level === 'Medium' || level === 'متوسط') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}
</script>

<template>
  <section class="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('experimentsPage.title') }}</h1>
      <p class="text-gray-500 mt-2">{{ t('experimentsPage.subtitle') }}</p>
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <button
        v-for="c in categoryList"
        :key="c.key"
        @click="active = c.key"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
          active === c.key
            ? 'bg-primary-600 text-white border-primary-600'
            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300',
        ]"
      >
        {{ c.label }}
      </button>
    </div>

    <div v-if="filtered.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="e in filtered" :key="e.id" class="rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow flex flex-col">
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
          <span>{{ t('experiments.' + e.id + '.tag') }} - {{ t('experimentsPage.duration', { minutes: e.time }) }}</span>
          <span class="font-semibold text-primary-600">+{{ e.xp }} XP</span>
        </div>

        <router-link to="/lab" class="mt-4 text-center bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
          {{ t('experimentsPage.start') || t('experimentsSection.start') }}
        </router-link>
      </div>
    </div>
    <div v-else class="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
      {{ t('experimentsPage.empty') }}
    </div>
  </section>
</template>
