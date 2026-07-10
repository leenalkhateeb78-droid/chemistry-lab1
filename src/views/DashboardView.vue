<script setup>
import { useI18n } from 'vue-i18n'
import * as icons from 'lucide-vue-next'
import { useUserStore } from '../stores/user'
import { useExperimentsStore } from '../stores/experiments'

const { t } = useI18n()
const user = useUserStore()
const store = useExperimentsStore()
</script>

<template>
  <section class="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="text-sm text-gray-400 mb-1">{{ t('dashboard.welcome') }}</p>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ t('dashboard.title') }}</h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div class="bg-white border border-gray-100 rounded-2xl p-5">
        <p class="text-xs text-gray-400 mb-2">{{ t('dashboard.level') }}</p>
        <p class="text-2xl font-extrabold text-primary-600 mb-2">Lv {{ user.level }}</p>
        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full bg-primary-500" :style="{ width: user.xpPercent + '%' }"></div>
        </div>
        <p class="text-xs text-gray-400 mt-2">{{ user.xp }} / {{ user.xpNeeded }} XP</p>
      </div>

      <div class="bg-white border border-gray-100 rounded-2xl p-5 text-center">
        <p class="text-xs text-gray-400 mb-2">{{ t('dashboard.completed') }}</p>
        <p class="text-3xl font-extrabold text-green-600">{{ user.completed }}</p>
      </div>

      <div class="bg-white border border-gray-100 rounded-2xl p-5 text-center">
        <p class="text-xs text-gray-400 mb-2">{{ t('dashboard.remaining') }}</p>
        <p class="text-3xl font-extrabold text-gray-700">{{ user.remaining }}</p>
      </div>

      <div class="bg-white border border-gray-100 rounded-2xl p-5 text-center">
        <p class="text-xs text-gray-400 mb-2">{{ t('dashboard.streak') }}</p>
        <p class="text-3xl font-extrabold text-orange-500">{{ user.streak }}</p>
      </div>
    </div>

    <h2 class="text-xl font-bold text-gray-900 mb-5">{{ t('dashboard.recommended') }}</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="e in store.featured" :key="e.id" class="rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
        <div class="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
          <component :is="icons[e.icon]" class="w-6 h-6 text-primary-600" />
        </div>
        <h3 class="font-bold text-gray-900">{{ t('experiments.' + e.id + '.title') }}</h3>
        <div class="flex items-center justify-between mt-4 text-xs text-gray-400">
          <span>{{ e.time }}</span>
          <span class="font-semibold text-primary-600">+{{ e.xp }} XP</span>
        </div>
        <router-link to="/lab" class="mt-4 block text-center bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
          {{ t('dashboard.start') }}
        </router-link>
      </div>
    </div>
  </section>
</template>
