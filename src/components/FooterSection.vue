<script setup>
import { useI18n } from 'vue-i18n'
import BrandLogo from './BrandLogo.vue'

const { t } = useI18n()
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-8">
      <div>
        <div class="mb-3 [&_span]:!text-white brand-dark">
          <BrandLogo />
        </div>
        <p class="text-sm text-gray-400">{{ t('footer.tagline') }}</p>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-3">{{ t('footer.product') }}</h4>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/experiments" class="hover:text-white">{{ t('nav.experiments') }}</router-link></li>
          <li><router-link to="/lab" class="hover:text-white">{{ t('nav.lab') }}</router-link></li>
          <li><router-link to="/achievements" class="hover:text-white">{{ t('footer.achievements') }}</router-link></li>
          <li><router-link to="/reviews" class="hover:text-white">{{ t('footer.reviews') }}</router-link></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-3">{{ t('footer.company') }}</h4>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/about" class="hover:text-white">{{ t('nav.about') }}</router-link></li>
          <li><router-link to="/contact" class="hover:text-white">{{ t('footer.contact') }}</router-link></li>
        </ul>
      </div>
    </div>
    <p class="text-center text-xs text-gray-500 mt-10">&#169; {{ t('footer.rights') }}</p>
  </footer>
</template>

<style scoped>
.brand-dark :deep(span) {
  color: white !important;
  -webkit-text-fill-color: white !important;
}
</style>
