<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import ChemBackground from './components/ChemBackground.vue'
import ChatBot from './components/ChatBot.vue'
import { usePageTitle } from './composables/usePageTitle'

const { locale } = useI18n()
usePageTitle()

watch(locale, (val) => {
  document.documentElement.setAttribute('dir', val === 'ar' ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', val)
  localStorage.setItem('lang', val)
}, { immediate: true })
</script>

<template>
  <div class="font-sans min-h-screen flex flex-col relative">
    <ChemBackground />
    <div class="relative z-10 flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-1">
        <router-view />
      </main>
      <FooterSection />
      <ChatBot />
    </div>
  </div>
</template>
