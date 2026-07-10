<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown } from 'lucide-vue-next'

const { t, tm } = useI18n()
const openIndex = ref(null)
const toggle = (i) => (openIndex.value = openIndex.value === i ? null : i)
const faqItems = computed(() => tm('faq.items'))
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">{{ t('faq.title') }}</h2>

      <div class="space-y-3">
        <div v-for="(f, i) in faqItems" :key="f.q" class="border border-gray-100 rounded-xl">
          <button class="w-full flex items-center justify-between p-4 text-start font-medium text-gray-800" @click="toggle(i)">
            {{ f.q }}
            <ChevronDown :class="['w-5 h-5 transition-transform shrink-0', openIndex === i ? 'rotate-180' : '']" />
          </button>
          <div v-if="openIndex === i" class="px-4 pb-4 text-sm text-gray-500">{{ f.a }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
