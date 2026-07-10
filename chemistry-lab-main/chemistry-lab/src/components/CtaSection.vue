<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section class="py-20 bg-primary-600">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-white">{{ t('cta.title') }}</h2>
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/lab" class="bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
          {{ t('cta.cta1') }}
        </router-link>
        <router-link to="/experiments" class="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-500 transition-colors">
          {{ t('cta.cta2') }}
        </router-link>
      </div>
    </div>
  </section>
</template>
