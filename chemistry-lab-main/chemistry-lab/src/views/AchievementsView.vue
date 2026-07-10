<script setup>
import { Award, Lock } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'
const { t } = useI18n()
const user = useUserStore()
</script>

<template>
  <section class="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('achievements.title') }}</h1>
      <p class="text-gray-500 mt-2">{{ t('achievements.subtitle') }}</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="a in user.achievements"
        :key="a.id"
        :class="[
          'rounded-2xl border p-6 text-center transition-colors',
          a.unlocked ? 'border-primary-100 bg-primary-50' : 'border-gray-100 bg-gray-50 opacity-70',
        ]"
      >
        <div
          :class="[
            'w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4',
            a.unlocked ? 'bg-primary-100' : 'bg-gray-200',
          ]"
        >
          <component :is="a.unlocked ? Award : Lock" :class="['w-7 h-7', a.unlocked ? 'text-primary-600' : 'text-gray-400']" />
        </div>
        <h3 class="font-semibold text-gray-900">{{ t('achievements.items.' + a.id) }}</h3>
        <p :class="['text-xs mt-2 font-medium', a.unlocked ? 'text-primary-600' : 'text-gray-400']">
          {{ a.unlocked ? t('achievements.unlocked') : t('achievements.locked') }}
        </p>
      </div>
    </div>
  </section>
</template>
