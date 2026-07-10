<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, Atom, Beaker, BookOpen, FlaskConical, Lightbulb, Microscope, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-vue-next'
import RevealOnScroll from '../components/RevealOnScroll.vue'

const { t } = useI18n()

const stats = computed(() => t('about.stats', { returnObjects: true }))
const timeline = computed(() => t('about.timeline', { returnObjects: true }))
const platformFeatures = computed(() => t('about.platformFeatures', { returnObjects: true }))
const whyChooseItems = computed(() => t('about.whyChooseItems', { returnObjects: true }))
const processSteps = computed(() => t('about.processSteps', { returnObjects: true }))
const teacherItems = computed(() => t('about.teacherItems', { returnObjects: true }))
const studentItems = computed(() => t('about.studentItems', { returnObjects: true }))
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
    <RevealOnScroll>
      <div class="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div class="grid gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
          <div class="flex flex-col justify-center">
            <span class="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700">
              <Sparkles class="h-4 w-4" /> {{ t('about.heroBadge') }}
            </span>
            <h1 class="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">{{ t('about.heroTitle') }}</h1>
            <p class="mt-5 max-w-2xl text-lg leading-8 text-gray-600">{{ t('about.heroSubtitle') }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link to="/experiments" class="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-700">
                {{ t('about.heroCta') }} <ArrowRight class="h-4 w-4" />
              </router-link>
              <router-link to="/lab" class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700">
                {{ t('about.heroSecondary') }}
              </router-link>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-[1.6rem] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-cyan-50 p-6">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_35%)]"></div>
            <div class="relative flex h-full flex-col justify-between">
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                  <div class="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <FlaskConical class="h-5 w-5" />
                  </div>
                  <p class="text-sm font-semibold text-gray-800">{{ t('about.platformFeaturesTitle') }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ t('about.platformFeatures.0.title') }}</p>
                </div>
                <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                  <div class="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                    <Atom class="h-5 w-5" />
                  </div>
                  <p class="text-sm font-semibold text-gray-800">{{ t('about.safetyTitle') }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ t('about.safetyText') }}</p>
                </div>
              </div>
              <div class="mt-4 rounded-[1.25rem] border border-white/80 bg-white/80 p-4 shadow-sm">
                <div class="flex items-center gap-2 text-sm font-semibold text-primary-700">
                  <Lightbulb class="h-4 w-4" /> {{ t('about.processTitle') }}
                </div>
                <div class="mt-3 flex items-center gap-3 text-sm text-gray-600">
                  <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700">1</div>
                  <span>{{ t('about.processSteps.0') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll :delay="120">
      <div class="mt-8 rounded-[1.6rem] border border-gray-100 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-soft sm:p-8">
        <div class="mb-6 flex items-center gap-2">
          <Users class="h-5 w-5 text-cyan-300" />
          <h2 class="text-2xl font-bold">{{ t('about.statsTitle') }}</h2>
        </div>
        <div class="grid gap-4 md:grid-cols-4">
          <div v-for="item in stats" :key="item.label" class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <p class="text-3xl font-black">{{ item.value }}</p>
            <p class="mt-2 text-sm text-slate-300">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll :delay="180">
      <div class="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div class="rounded-[1.6rem] border border-gray-100 bg-white p-6 shadow-soft">
          <div class="mb-5 flex items-center gap-2">
            <BookOpen class="h-5 w-5 text-primary-600" />
            <h3 class="text-xl font-bold text-gray-900">{{ t('about.timelineTitle') }}</h3>
          </div>
          <div class="space-y-4">
            <div v-for="(step, index) in timeline" :key="step.title" class="flex gap-3 rounded-2xl border border-gray-100 bg-slate-50 p-4">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">0{{ index + 1 }}</div>
              <div>
                <p class="font-semibold text-gray-900">{{ step.title }}</p>
                <p class="mt-1 text-sm text-gray-600">{{ step.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[1.6rem] border border-gray-100 bg-white p-6 shadow-soft">
          <div class="mb-5 flex items-center gap-2">
            <Rocket class="h-5 w-5 text-accent-500" />
            <h3 class="text-xl font-bold text-gray-900">{{ t('about.platformFeaturesTitle') }}</h3>
          </div>
          <div class="grid gap-4">
            <div v-for="feature in platformFeatures" :key="feature.title" class="rounded-2xl border border-primary-100 bg-primary-50/60 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p class="font-semibold text-gray-900">{{ feature.title }}</p>
              <p class="mt-1 text-sm text-gray-600">{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll :delay="240">
      <div class="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="rounded-[1.6rem] border border-gray-100 bg-white p-6 shadow-soft">
          <div class="mb-5 flex items-center gap-2">
            <ShieldCheck class="h-5 w-5 text-emerald-600" />
            <h3 class="text-xl font-bold text-gray-900">{{ t('about.whyChooseTitle') }}</h3>
          </div>
          <div class="space-y-3">
            <div v-for="item in whyChooseItems" :key="item" class="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
              <div class="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
              <p class="text-sm text-gray-700">{{ item }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[1.6rem] border border-gray-100 bg-gradient-to-br from-primary-600 to-fuchsia-500 p-6 text-white shadow-soft">
          <div class="mb-5 flex items-center gap-2">
            <Lightbulb class="h-5 w-5" />
            <h3 class="text-xl font-bold">{{ t('about.processTitle') }}</h3>
          </div>
          <div class="space-y-3">
            <div v-for="(step, index) in processSteps" :key="step" class="flex gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">{{ index + 1 }}</div>
              <p class="text-sm leading-7">{{ step }}</p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll :delay="300">
      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-[1.6rem] border border-gray-100 bg-white p-6 shadow-soft">
          <div class="mb-4 flex items-center gap-2">
            <Microscope class="h-5 w-5 text-primary-600" />
            <h3 class="text-xl font-bold text-gray-900">{{ t('about.teacherTitle') }}</h3>
          </div>
          <ul class="space-y-3 text-sm text-gray-600">
            <li v-for="item in teacherItems" :key="item" class="flex gap-2"><span class="mt-1.5 h-2 w-2 rounded-full bg-primary-500"></span>{{ item }}</li>
          </ul>
        </div>

        <div class="rounded-[1.6rem] border border-gray-100 bg-white p-6 shadow-soft">
          <div class="mb-4 flex items-center gap-2">
            <Beaker class="h-5 w-5 text-cyan-600" />
            <h3 class="text-xl font-bold text-gray-900">{{ t('about.studentTitle') }}</h3>
          </div>
          <ul class="space-y-3 text-sm text-gray-600">
            <li v-for="item in studentItems" :key="item" class="flex gap-2"><span class="mt-1.5 h-2 w-2 rounded-full bg-cyan-500"></span>{{ item }}</li>
          </ul>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll :delay="360">
      <div class="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="rounded-[1.6rem] border border-gray-100 bg-gradient-to-br from-slate-50 to-white p-6 shadow-soft">
          <h3 class="text-xl font-bold text-gray-900">{{ t('about.missionTitle') }}</h3>
          <p class="mt-3 text-sm leading-7 text-gray-600">{{ t('about.missionText') }}</p>
        </div>
        <div class="rounded-[1.6rem] border border-gray-100 bg-gradient-to-br from-slate-50 to-white p-6 shadow-soft">
          <h3 class="text-xl font-bold text-gray-900">{{ t('about.visionTitle') }}</h3>
          <p class="mt-3 text-sm leading-7 text-gray-600">{{ t('about.visionText') }}</p>
        </div>
      </div>
    </RevealOnScroll>

    <RevealOnScroll :delay="420">
      <div class="mt-8 rounded-[2rem] border border-primary-100 bg-gradient-to-br from-primary-600 to-fuchsia-500 p-8 text-center text-white shadow-soft">
        <h2 class="text-3xl font-black">{{ t('about.ctaTitle') }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-sm leading-7 text-primary-50 sm:text-base">{{ t('about.ctaText') }}</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/experiments" class="rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-700 transition hover:-translate-y-0.5">{{ t('about.ctaPrimary') }}</router-link>
          <router-link to="/lab" class="rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">{{ t('about.ctaSecondary') }}</router-link>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
