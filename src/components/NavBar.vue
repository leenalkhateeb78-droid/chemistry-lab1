<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Menu, X, Globe, ChevronDown, User, LogOut, Star } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'
import { useAuthStore } from '../stores/auth'

const { t, locale } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const open = ref(false)
const menuOpen = ref(false)

const links = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.experiments'), to: '/experiments' },
  { label: t('nav.lab'), to: '/lab' },
  { label: t('nav.dashboard'), to: '/dashboard' },
  { label: t('nav.leaderboard'), to: '/leaderboard' },
  { label: t('nav.reviews'), to: '/reviews' },
  { label: t('nav.about'), to: '/about' },
])

function toggleLang() {
  locale.value = locale.value === 'en' ? 'ar' : 'en'
}

const languageLabel = computed(() => (locale.value === 'ar' ? t('nav.switchToEnglish') : t('nav.switchToArabic')))

function handleLogout() {
  auth.logout()
  menuOpen.value = false
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <router-link to="/">
        <BrandLogo />
      </router-link>

      <nav class="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
        <router-link v-for="l in links" :key="l.to" :to="l.to" class="hover:text-primary-600 transition-colors">
          {{ l.label }}
        </router-link>
      </nav>

      <div class="hidden lg:flex items-center gap-3">
        <button @click="toggleLang" class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 border border-gray-200 rounded-lg px-3 py-1.5">
          <Globe class="w-4 h-4" /> {{ languageLabel }}
        </button>

        <template v-if="!auth.isLoggedIn">
          <router-link to="/login" class="text-sm font-medium text-gray-600 hover:text-primary-600">{{ t('nav.signin') }}</router-link>
          <router-link to="/register" class="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            {{ t('nav.getstarted') }}
          </router-link>
        </template>

        <div v-else class="relative">
          <button @click="menuOpen = !menuOpen" class="flex items-center gap-2 border border-gray-200 rounded-full pl-1.5 pr-3 py-1.5 hover:bg-gray-50 transition-colors">
            <img v-if="auth.currentUser?.avatar" :src="auth.currentUser.avatar" class="w-7 h-7 rounded-full object-cover" />
            <div v-else class="w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">
              {{ auth.initials }}
            </div>
            <span class="text-sm font-medium text-gray-700 max-w-[100px] truncate">{{ auth.currentUser?.fourName }}</span>
            <ChevronDown class="w-4 h-4 text-gray-400" />
          </button>

          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="menuOpen" class="absolute end-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
              <router-link to="/profile" @click="menuOpen = false" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User class="w-4 h-4" /> {{ t('nav.profile') }}
              </router-link>
              <router-link to="/reviews" @click="menuOpen = false" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Star class="w-4 h-4" /> {{ t('nav.reviews') }}
              </router-link>
              <button @click="handleLogout" class="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
                <LogOut class="w-4 h-4" /> {{ t('nav.logout') }}
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <button class="lg:hidden" @click="open = !open">
        <component :is="open ? X : Menu" class="w-6 h-6 text-gray-700" />
      </button>
    </div>

    <div v-if="open" class="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
      <router-link v-for="l in links" :key="l.to" :to="l.to" class="block text-gray-700" @click="open = false">
        {{ l.label }}
      </router-link>
      <button @click="toggleLang" class="flex items-center gap-1.5 text-gray-700">
        <Globe class="w-4 h-4" /> {{ languageLabel }}
      </button>

      <template v-if="!auth.isLoggedIn">
        <router-link to="/login" class="block text-gray-700" @click="open = false">{{ t('nav.signin') }}</router-link>
        <router-link to="/register" class="block text-center bg-primary-600 text-white py-2 rounded-lg" @click="open = false">
          {{ t('nav.getstarted') }}
        </router-link>
      </template>
      <template v-else>
        <router-link to="/profile" class="block text-gray-700" @click="open = false">{{ t('nav.profile') }}</router-link>
        <button @click="() => { handleLogout(); open = false }" class="block text-rose-600">{{ t('nav.logout') }}</button>
      </template>
    </div>
  </header>
</template>
