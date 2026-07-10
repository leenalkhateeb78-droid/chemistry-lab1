<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { User, Mail, Lock, GraduationCap, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const { locale, t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const fourName = ref('')
const grade = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const grades = [7, 8, 9, 10, 11, 12]

function gradeLabel(g) {
  return locale.value === 'ar' ? `الصف ${g}` : `Grade ${g}`
}

function handleSubmit() {
  error.value = ''
  const parts = fourName.value.trim().split(/\s+/)
  if (parts.length < 4) {
    error.value = t('register.fullNameError')
    return
  }
  if (!grade.value) {
    error.value = t('register.gradeError')
    return
  }

  const result = auth.register({
    fourName: fourName.value.trim(),
    grade: grade.value,
    email: email.value,
    password: password.value,
  })

  if (!result.ok) {
    error.value = t('register.duplicateError')
    return
  }

  router.push('/dashboard')
}
</script>

<template>
  <section class="min-h-[70vh] flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-sm glass-card rounded-2xl p-8 shadow-soft">
      <h1 class="text-2xl font-bold text-gray-900 text-center">
        {{ t('register.title') }}
      </h1>
      <p class="text-sm text-gray-500 text-center mt-2 mb-8">
        {{ t('register.subtitle') }}
      </p>

      <div v-if="error" class="flex items-start gap-2 bg-rose-50 text-rose-600 text-sm rounded-lg p-3 mb-4">
        <AlertCircle class="w-4 h-4 mt-0.5 shrink-0" /> {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-700">
            {{ t('register.fullName') }}
          </label>
          <div class="relative mt-1">
            <User class="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
            <input v-model="fourName" type="text" required
              :placeholder="t('register.placeholder')"
              class="w-full border border-gray-200 rounded-lg py-2 ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">
            {{ t('register.grade') }}
          </label>
          <div class="relative mt-1">
            <GraduationCap class="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
            <select v-model="grade" required
              class="w-full border border-gray-200 rounded-lg py-2 ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none">
              <option value="" disabled>{{ t('register.selectGrade') }}</option>
              <option v-for="g in grades" :key="g" :value="g">{{ gradeLabel(g) }}</option>
            </select>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">{{ t('register.email') }}</label>
          <div class="relative mt-1">
            <Mail class="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
            <input v-model="email" type="email" required
              class="w-full border border-gray-200 rounded-lg py-2 ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">{{ t('register.password') }}</label>
          <div class="relative mt-1">
            <Lock class="absolute start-3 top-2.5 w-4 h-4 text-gray-400" />
            <input v-model="password" type="password" required minlength="4"
              class="w-full border border-gray-200 rounded-lg py-2 ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <button type="submit" class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          {{ t('register.submit') }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        {{ t('register.haveAccount') }}
        <router-link to="/login" class="text-primary-600 font-medium hover:underline">
          {{ t('register.signin') }}
        </router-link>
      </p>
      <p class="text-center text-xs text-gray-400 mt-3">
        {{ t('register.note') }}
      </p>
    </div>
  </section>
</template>
