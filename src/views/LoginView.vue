<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Mail, Lock, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const { locale, t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const remember = ref(false)
const error = ref('')

function handleSubmit() {
  error.value = ''
  const result = auth.login({ email: email.value, password: password.value })
  if (!result.ok) {
    error.value = t('login.errorInvalid')
    return
  }
  router.push('/dashboard')
}
</script>

<template>
  <section class="min-h-[70vh] flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-sm glass-card rounded-2xl p-8 shadow-soft">
      <h1 class="text-2xl font-bold text-gray-900 text-center">
        {{ t('login.title') }}
      </h1>
      <p class="text-sm text-gray-500 text-center mt-2 mb-8">
        {{ t('login.subtitle') }}
      </p>

      <div v-if="error" class="flex items-start gap-2 bg-rose-50 text-rose-600 text-sm rounded-lg p-3 mb-4">
        <AlertCircle class="w-4 h-4 mt-0.5 shrink-0" /> {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-700">{{ t('login.email') }}</label>
          <div class="relative mt-1">
            <Mail class="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
            <input v-model="email" type="email" required
              class="w-full border border-gray-200 rounded-lg py-2 ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">{{ t('login.password') }}</label>
          <div class="relative mt-1">
            <Lock class="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
            <input v-model="password" type="password" required
              class="w-full border border-gray-200 rounded-lg py-2 ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-gray-600">
            <input v-model="remember" type="checkbox" class="rounded border-gray-300" />
            {{ t('login.remember') }}
          </label>
        </div>

        <button type="submit" class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          {{ t('login.submit') }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        {{ t('login.noAccount') }}
        <router-link to="/register" class="text-primary-600 font-medium hover:underline">
          {{ t('login.signup') }}
        </router-link>
      </p>
      <p class="text-center text-xs text-gray-400 mt-3">
        {{ t('login.note') }}
      </p>
    </div>
  </section>
</template>
