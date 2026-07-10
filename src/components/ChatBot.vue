<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { MessageCircleMore, Minus, SendHorizonal, Sparkles, X } from 'lucide-vue-next'

const { t } = useI18n()

const isOpen = ref(false)
const isMinimized = ref(false)
const input = ref('')
const isTyping = ref(false)
const hasWelcomed = ref(false)
const messages = ref([])
const messagesContainer = ref(null)

const quickReplies = computed(() => [
  { label: t('chatbot.quickReplies.experiment'), value: t('chatbot.quickReplies.experiment') },
  { label: t('chatbot.quickReplies.safety'), value: t('chatbot.quickReplies.safety') },
  { label: t('chatbot.quickReplies.titration'), value: t('chatbot.quickReplies.titration') },
])

const formatTime = () => {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

const scrollToBottom = () => {
  if (!messagesContainer.value) return
  messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}

const addMessage = (sender, text) => {
  messages.value.push({
    id: `${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    sender,
    text,
    timestamp: formatTime(),
  })
}

const showWelcome = () => {
  if (hasWelcomed.value) return
  addMessage('bot', t('chatbot.welcome'))
  hasWelcomed.value = true
}

const openChat = () => {
  isOpen.value = true
  isMinimized.value = false
  if (!hasWelcomed.value) {
    showWelcome()
  }
  nextTick(scrollToBottom)
}

const closeChat = () => {
  isOpen.value = false
  isMinimized.value = false
}

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
  if (!isMinimized.value) {
    nextTick(scrollToBottom)
  }
}

const generateReply = (text) => {
  const normalized = text.toLowerCase()

  if (normalized.includes('titration') || normalized.includes('معايرة')) {
    return t('chatbot.replyTitration')
  }

  if (normalized.includes('safety') || normalized.includes('safe') || normalized.includes('آمن') || normalized.includes('سلامة')) {
    return t('chatbot.replySafety')
  }

  if (normalized.includes('experiment') || normalized.includes('تجربة')) {
    return t('chatbot.replyExperiment')
  }

  if (normalized.includes('hello') || normalized.includes('hi') || normalized.includes('مرحبا') || normalized.includes('أهلا')) {
    return t('chatbot.replyHello')
  }

  return t('chatbot.replyDefault')
}

const submitMessage = (textOverride) => {
  const value = typeof textOverride === 'string' ? textOverride : input.value.trim()
  if (!value) return

  addMessage('user', value)
  input.value = ''
  isTyping.value = true
  nextTick(scrollToBottom)

  window.setTimeout(() => {
    isTyping.value = false
    addMessage('bot', generateReply(value))
    nextTick(scrollToBottom)
  }, 850)
}

const handleQuickReply = (value) => {
  submitMessage(value)
}

watch([messages, isTyping, isOpen, isMinimized], () => {
  nextTick(scrollToBottom)
})

onMounted(() => {
  nextTick(scrollToBottom)
})
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
    <button
      v-if="!isOpen"
      type="button"
      class="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-[0_20px_50px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_60px_rgba(124,58,237,0.4)]"
      :aria-label="t('chatbot.openLabel')"
      @click="openChat"
    >
      <MessageCircleMore class="h-6 w-6" />
    </button>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-4 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 scale-100 opacity-100"
      leave-to-class="translate-y-4 scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        :class="[
          'flex w-[92vw] max-w-[388px] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:w-[420px]',
          isMinimized ? 'h-16' : 'h-[82vh] max-h-[640px] sm:h-[580px]'
        ]"
      >
        <div class="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-3 text-white">
          <div class="flex items-center gap-3">
            <div class="rounded-2xl bg-white/20 p-2">
              <Sparkles class="h-4 w-4" />
            </div>
            <div>
              <p class="text-sm font-semibold">{{ t('chatbot.name') }}</p>
              <p class="text-xs text-white/80">{{ t('chatbot.online') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" class="rounded-full p-2 text-white/90 transition hover:bg-white/20" :aria-label="t('chatbot.minimizeLabel')" @click="toggleMinimize">
              <Minus class="h-4 w-4" />
            </button>
            <button type="button" class="rounded-full p-2 text-white/90 transition hover:bg-white/20" :aria-label="t('chatbot.closeLabel')" @click="closeChat">
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div v-show="!isMinimized" class="flex flex-1 flex-col">
          <div ref="messagesContainer" class="flex-1 overflow-y-auto bg-gradient-to-b from-white via-primary-50/40 to-white px-3 py-3 sm:px-4">
            <div v-for="message in messages" :key="message.id" :class="['mb-3 flex', message.sender === 'user' ? 'justify-end' : 'justify-start']">
              <div
                :class="[
                  'max-w-[82%] rounded-2xl px-3 py-2 text-sm shadow-sm sm:max-w-[78%]',
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white'
                    : 'border border-gray-100 bg-white text-gray-700'
                ]"
              >
                <p class="leading-relaxed">{{ message.text }}</p>
                <p :class="['mt-1 text-[10px]', message.sender === 'user' ? 'text-primary-100' : 'text-gray-400']">
                  {{ message.timestamp }}
                </p>
              </div>
            </div>

            <div v-if="isTyping" class="mb-3 flex justify-start">
              <div class="rounded-2xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
                <div class="flex items-center gap-1">
                  <span class="h-2 w-2 animate-pulse rounded-full bg-primary-400"></span>
                  <span class="h-2 w-2 animate-pulse rounded-full bg-primary-400 [animation-delay:120ms]"></span>
                  <span class="h-2 w-2 animate-pulse rounded-full bg-primary-400 [animation-delay:240ms]"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 bg-white/90 px-3 py-3 sm:px-4">
            <div class="mb-3 flex flex-wrap gap-2">
              <button
                v-for="reply in quickReplies"
                :key="reply.value"
                type="button"
                class="rounded-full border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition hover:border-primary-300 hover:bg-primary-100"
                @click="handleQuickReply(reply.value)"
              >
                {{ reply.label }}
              </button>
            </div>

            <div class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner">
              <input
                v-model="input"
                type="text"
                class="flex-1 border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                :placeholder="t('chatbot.inputPlaceholder')"
                @keyup.enter.prevent="submitMessage()"
              />
              <button type="button" class="rounded-full bg-gradient-to-br from-primary-600 to-accent-500 p-2 text-white transition hover:opacity-90" :aria-label="t('chatbot.sendLabel')" @click="submitMessage()">
                <SendHorizonal class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
