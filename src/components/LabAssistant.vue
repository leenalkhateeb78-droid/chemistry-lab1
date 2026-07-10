<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { FlaskConical, Send, X, Sparkles, RotateCcw } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

const open = ref(false)
const hasUnread = ref(true)
const input = ref('')
const typing = ref(false)
const scrollBox = ref(null)

const messages = ref([])

function createBotMessage(key, params = {}) {
  const translationKey = key === 'greeting' ? 'chatbot.greeting' : `chatbot.responses.${key}`

  return {
    from: 'bot',
    key,
    params,
    translationKey,
    text: t(translationKey, params),
  }
}

function initMessages() {
  messages.value = [createBotMessage('greeting')]
}

const suggestions = computed(() => t('chatbot.suggestions', { returnObjects: true }))

function toggle() {
  open.value = !open.value
  if (open.value) hasUnread.value = false
}

function scrollToBottom() {
  nextTick(() => {
    if (scrollBox.value) scrollBox.value.scrollTop = scrollBox.value.scrollHeight
  })
}

watch(open, (value) => {
  if (value) scrollToBottom()
})

watch(locale, () => {
  messages.value = messages.value.map((message) => {
    if (message.from !== 'bot' || !message.translationKey) return message

    return {
      ...message,
      text: t(message.translationKey, message.params),
    }
  })
})

function reset() {
  initMessages()
  scrollToBottom()
}

function findAnswer(raw) {
  const q = raw.toLowerCase()

  const has = (arr) => arr.some((word) => q.includes(word))

  if (has(['start', 'begin', 'ابدأ', 'أول', 'بداية', 'ابدء'])) {
    router.push('/experiments')
    return createBotMessage('start')
  }

  if (has(['lab', 'virtual lab', 'مختبر', 'المختبر', 'مختبر افتراضي'])) {
    router.push('/lab')
    return createBotMessage('lab')
  }

  if (has(['xp', 'point', 'badge', 'نقاط', 'نقطة', 'أوسمة', 'وسام', 'خبرة'])) {
    return createBotMessage('xp')
  }

  if (has(['safe', 'danger', 'آمن', 'خطر', 'مخاطر', 'أمان'])) {
    return createBotMessage('safe')
  }

  if (has(['leaderboard', 'تصنيف', 'متصدر', 'top leaders'])) {
    router.push('/leaderboard')
    return createBotMessage('leaderboard')
  }

  if (has(['contact', 'تواصل', 'اتصل'])) {
    router.push('/contact')
    return createBotMessage('contact')
  }

  if (has(['hi', 'hello', 'hey', 'مرحبا', 'أهلا', 'السلام', 'هاي'])) {
    return createBotMessage('hi')
  }

  if (has(['thank', 'thanks', 'شكر', 'شكرا', 'تسلم', 'أشكرك'])) {
    return createBotMessage('thanks')
  }

  return createBotMessage('fallback')
}

function send(text) {
  const value = (text ?? input.value).trim()
  if (!value) return

  messages.value.push({ from: 'user', text: value })
  input.value = ''
  scrollToBottom()
  typing.value = true

  const delay = 500 + Math.random() * 500
  setTimeout(() => {
    typing.value = false
    messages.value.push(findAnswer(value))
    scrollToBottom()
  }, delay)
}

initMessages()
</script>

<template>
  <div class="fixed bottom-4 end-4 z-[100] flex flex-col items-end gap-2">
    <!-- Chat window -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="open"
        class="w-[22rem] max-w-[92vw] h-[30rem] max-h-[65vh] flex flex-col rounded-3xl overflow-hidden border border-white/40 shadow-2xl shadow-primary-900/20 backdrop-blur-xl bg-white/90"
      >
        <!-- Header -->
        <div class="relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-600 via-primary-500 to-fuchsia-500 text-white overflow-hidden">
          <div class="absolute -top-6 -end-6 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
          <div class="relative w-11 h-11 shrink-0 rounded-2xl bg-white/15 flex items-center justify-center">
            <svg viewBox="0 0 48 48" class="w-8 h-8">
              <g>
                <path d="M19 6h10v9l8 16a4 4 0 0 1-3.6 5.8H14.6A4 4 0 0 1 11 30.9l8-15.9V6z" fill="rgba(255,255,255,0.25)" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                <path d="M14.5 27h19" stroke="white" stroke-width="2"/>
                <circle class="lab-bubble" cx="21" cy="30" r="1.6" fill="#a7f3d0"/>
                <circle class="lab-bubble lab-bubble-delay1" cx="25" cy="32" r="1.2" fill="#fef08a"/>
                <circle class="lab-bubble lab-bubble-delay2" cx="23" cy="34" r="1" fill="#fca5f1"/>
                <circle class="eye-blink" cx="20.5" cy="16.5" r="1.3" fill="white"/>
                <circle class="eye-blink" cx="25.5" cy="16.5" r="1.3" fill="white"/>
              </g>
            </svg>
          </div>
          <div class="relative flex-1 min-w-0">
            <p class="font-bold leading-tight truncate">{{ t('chatbot.name') }}</p>
            <p class="text-xs text-white/80 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              {{ t('chatbot.online') }}
            </p>
          </div>
          <button @click="reset" :title="t('chatbot.resetTitle')" class="relative w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
            <RotateCcw class="w-4 h-4" />
          </button>
          <button @click="open = false" class="relative w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
            <X class="w-4.5 h-4.5" />
          </button>
        </div>

        <!-- Messages -->
        <div ref="scrollBox" class="flex-1 overflow-y-auto p
        -3 py-4 space-y-3 chat-scroll bg-gradient-to-b from-primary-50/40 to-white">
          <div v-for="(m, i) in messages" :key="i" class="flex" :class="m.from === 'user' ? 'justify-end' : 'justify-start'">
            <div
              class="max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm animate-pop"
              :class="m.from === 'user'
                ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-2xl rounded-ee-sm'
                : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-ss-sm'"
            >
              {{ m.text }}
            </div>
          </div>

          <div v-if="typing" class="flex justify-start">
            <div class="bg-white border border-gray-100 rounded-2xl rounded-ss-sm px-4 py-3 flex items-center gap-1.5">
              <span class="typing-dot"></span>
              <span class="typing-dot" style="animation-delay:.15s"></span>
              <span class="typing-dot" style="animation-delay:.3s"></span>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div v-if="messages.length < 3" class="px-3 pb-2 flex flex-wrap gap-1.5">
          <button
            v-for="s in suggestions" :key="s"
            @click="send(s)"
            class="text-xs px-3 py-1.5 rounded-full border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors flex items-center gap-1"
          >
            <Sparkles class="w-3 h-3" /> {{ s }}
          </button>
        </div>

        <!-- Input -->
        <form @submit.prevent="send()" class="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
          <input
            v-model="input"
            type="text"
            :placeholder="t('chatbot.placeholder')"
            class="flex-1 text-sm bg-gray-100 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-400 transition-shadow"
          />
          <button
            type="submit"
            class="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary-500/30"
          >
            <Send class="w-4 h-4 rtl:-scale-x-100" />
          </button>
        </form>
      </div>
    </Transition>

    <!-- Toggle button -->
    <button
      @click="toggle"
      class="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-fuchsia-500 text-white shadow-xl shadow-primary-600/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform animate-float"
    >
      <span class="absolute inset-0 rounded-full bg-primary-500 animate-glow-pulse"></span>
      <FlaskConical v-if="!open" class="relative w-7 h-7" />
      <X v-else class="relative w-7 h-7" />
      <span v-if="hasUnread && !open" class="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white animate-pulse"></span>
    </button>
  </div>
</template>

<style scoped>
.chat-scroll::-webkit-scrollbar { width: 6px; }
.chat-scroll::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.35); border-radius: 999px; }
.chat-scroll::-webkit-scrollbar-track { background: transparent; }

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #8b5cf6;
  display: inline-block;
  animation: typingBounce 1s infinite ease-in-out;
}

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: .5; }
  30% { transform: translateY(-5px); opacity: 1; }
}

.animate-pop { animation: popIn .25s ease-out; }
@keyframes popIn {
  from { opacity: 0; transform: translateY(6px) scale(.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.lab-bubble { animation: bubbleRise 2.2s infinite ease-in; transform-origin: center; }
.lab-bubble-delay1 { animation-delay: .6s; }
.lab-bubble-delay2 { animation-delay: 1.1s; }
@keyframes bubbleRise {
  0% { opacity: 0; transform: translateY(0) scale(.6); }
  20% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-14px) scale(1.1); }
}

.eye-blink { animation: blink 4s infinite; transform-origin: center; }
@keyframes blink {
  0%, 92%, 100% { transform: scaleY(1); }
  96% { transform: scaleY(.1); }
}
</style>
