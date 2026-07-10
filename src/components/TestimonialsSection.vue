<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowRight } from 'lucide-vue-next'
import { useReviewsStore } from '../stores/reviews'

const { t, locale } = useI18n()
const store = useReviewsStore()
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <h2 class="text-3xl font-bold text-gray-900">{{ t('testimonials.title') }}</h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="r in store.all.slice(0, 3)" :key="r.id" class="bg-white rounded-2xl p-6 border border-gray-100">
          <p class="text-gray-600 text-sm leading-relaxed">{{ r.text }}</p>
          <div class="flex items-center gap-3 mt-5">
            <div class="w-9 h-9 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm">
              {{ r.name.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ r.name }}</p>
              <p class="text-xs text-gray-400">{{ r.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <router-link to="/reviews" class="inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:underline">
          {{ t('reviews.seeAll') }}
          <ArrowRight class="w-4 h-4 rtl:-scale-x-100" />
        </router-link>
      </div>
    </div>
  </section>
</template>
