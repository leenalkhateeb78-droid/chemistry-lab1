<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Star, Send } from 'lucide-vue-next'
import { useReviewsStore } from '../stores/reviews'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const store = useReviewsStore()
const auth = useAuthStore()

const rating = ref(5)
const hoverRating = ref(0)
const text = ref('')
const submitted = ref(false)

function submit() {
  if (!text.value.trim()) return
  store.addReview({
    name: auth.currentUser?.fourName || t('reviews.anonymous'),
    role: auth.currentUser?.grade ? t('reviews.grade', { grade: auth.currentUser.grade }) : '',
    rating: rating.value,
    text: text.value.trim(),
  })
  text.value = ''
  rating.value = 5
  submitted.value = true
  setTimeout(() => (submitted.value = false), 2500)
}
</script>

<template>
  <section class="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ t('reviews.title') }}
      </h1>
      <p class="text-gray-500 mt-2">
        {{ t('reviews.subtitle') }}
      </p>
      <div class="inline-flex items-center gap-2 mt-4 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold">
        <Star class="w-4 h-4 fill-primary-500 text-primary-500" />
        {{ store.average }} / 5
        <span class="text-primary-400 font-normal">({{ t('reviews.ratingLabel', { count: store.all.length }) }})</span>
      </div>
    </div>

    <div class="glass-card rounded-2xl p-6 shadow-soft mb-10">
      <h2 class="font-bold text-gray-900 mb-4">
        {{ t('reviews.shareTitle') }}
      </h2>

      <div class="flex items-center gap-1 mb-4">
        <button
          v-for="n in 5" :key="n"
          type="button"
          @mouseenter="hoverRating = n"
          @mouseleave="hoverRating = 0"
          @click="rating = n"
        >
          <Star
            class="w-7 h-7 transition-colors"
            :class="(hoverRating || rating) >= n ? 'fill-amber-400 text-amber-400' : 'text-gray-300'"
          />
        </button>
      </div>

      <textarea
        v-model="text"
        rows="3"
        :placeholder="t('reviews.placeholder')"
        class="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
      ></textarea>

      <div class="flex items-center justify-between mt-3">
        <p v-if="submitted" class="text-emerald-600 text-sm font-medium">
          {{ t('reviews.success') }}
        </p>
        <span v-else></span>
        <button
          @click="submit"
          class="flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
        >
          <Send class="w-4 h-4" /> {{ t('reviews.submit') }}
        </button>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-5">
      <div v-for="r in store.all" :key="r.id" class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center gap-0.5 mb-3">
          <Star v-for="n in 5" :key="n" class="w-4 h-4" :class="r.rating >= n ? 'fill-amber-400 text-amber-400' : 'text-gray-200'" />
        </div>
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
  </section>
</template>
