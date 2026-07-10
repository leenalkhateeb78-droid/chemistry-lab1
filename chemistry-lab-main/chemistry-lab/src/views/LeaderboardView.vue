<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'

const { t, locale } = useI18n()
const user = useUserStore()

const leaderboard = computed(() => user.localizedLeaderboard)
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">{{ t('leaderboard.title') }}</h1>
      <p class="mt-3 text-lg text-gray-500">{{ t('leaderboard.subtitle') }}</p>
    </div>

    <div class="overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-soft">
      <div class="border-b border-gray-100 bg-slate-50 px-5 py-4 text-sm font-semibold text-gray-600">
        {{ t('leaderboard.weeklyRanking') }}
      </div>
      <div
        v-for="p in leaderboard"
        :key="p.rank"
        :class="['flex items-center justify-between px-5 py-4 transition-colors', p.isYou ? 'bg-primary-50' : 'hover:bg-slate-50']"
      >
        <div class="flex items-center gap-4">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">{{ p.rank }}</span>
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
            {{ p.name.charAt(0) }}
          </div>
          <span class="font-medium text-gray-800">{{ p.name }}</span>
        </div>
        <span class="text-sm font-semibold text-primary-600">{{ p.xp.toLocaleString() }} XP</span>
      </div>
    </div>
  </section>
</template>
