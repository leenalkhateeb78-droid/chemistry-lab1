<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Camera, Lock, CheckCircle2 } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const { locale, t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const fileInput = ref(null)
const saved = ref(false)

onMounted(() => {
  if (!auth.isLoggedIn) router.push('/login')
})

function pickPhoto() {
  fileInput.value?.click()
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    auth.updateAvatar(reader.result)
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  }
  reader.readAsDataURL(file)
}

function gradeLabel(g) {
  return locale.value === 'ar' ? `الصف ${g}` : `Grade ${g}`
}
</script>

<template>
  <section v-if="auth.currentUser" class="py-16 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('profile.title') }}</h1>
      <p class="text-gray-500 mt-2 text-sm">
        {{ t('profile.subtitle') }}
      </p>
    </div>

    <div class="glass-card rounded-2xl p-8 shadow-soft">
      <div class="flex flex-col items-center">
        <div class="relative">
          <img v-if="auth.currentUser.avatar" :src="auth.currentUser.avatar" class="w-24 h-24 rounded-full object-cover border-4 border-primary-100" />
          <div v-else class="w-24 h-24 rounded-full bg-primary-100 text-primary-700 text-3xl font-bold flex items-center justify-center border-4 border-primary-50">
            {{ auth.initials }}
          </div>
          <button @click="pickPhoto" class="absolute bottom-0 end-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center border-2 border-white hover:bg-primary-700 transition-colors">
            <Camera class="w-4 h-4" />
          </button>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </div>

        <Transition
          enter-active-class="transition duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          leave-active-class="transition duration-200"
          leave-to-class="opacity-0"
        >
          <p v-if="saved" class="flex items-center gap-1.5 text-emerald-600 text-sm mt-3 font-medium">
            <CheckCircle2 class="w-4 h-4" /> {{ t('profile.photoUpdated') }}
          </p>
        </Transition>

        <p class="text-xs text-gray-400 mt-3">
          {{ t('profile.photoHint') }}
        </p>
      </div>

      <div class="mt-8 space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            {{ t('profile.fullName') }}
            <Lock class="w-3.5 h-3.5 text-gray-400" />
          </label>
          <input :value="auth.currentUser.fourName" disabled
            class="w-full mt-1 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg py-2 px-3 text-sm cursor-not-allowed" />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            {{ t('profile.grade') }}
            <Lock class="w-3.5 h-3.5 text-gray-400" />
          </label>
          <input :value="gradeLabel(auth.currentUser.grade)" disabled
            class="w-full mt-1 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg py-2 px-3 text-sm cursor-not-allowed" />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            {{ t('profile.email') }}
            <Lock class="w-3.5 h-3.5 text-gray-400" />
          </label>
          <input :value="auth.currentUser.email" disabled
            class="w-full mt-1 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg py-2 px-3 text-sm cursor-not-allowed" />
        </div>
      </div>

      <p class="text-xs text-gray-400 mt-6 text-center">
        {{ t('profile.note') }}
      </p>
    </div>
  </section>
</template>
