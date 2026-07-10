<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const name = ref('')
const email = ref('')
const message = ref('')

function handleSubmit() {
  alert('Message sent demo - not connected to a server yet.')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section class="py-20 max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 text-center mb-10">{{ t('contact.title') }}</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="text-sm font-medium text-gray-700">{{ t('contact.name') }}</label>
        <input v-model="name" type="text" required
          class="w-full mt-1 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700">{{ t('contact.email') }}</label>
        <input v-model="email" type="email" required
          class="w-full mt-1 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700">{{ t('contact.message') }}</label>
        <textarea v-model="message" rows="5" required
          class="w-full mt-1 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
      </div>
      <button type="submit" class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
        {{ t('contact.submit') }}
      </button>
    </form>
  </section>
</template>
