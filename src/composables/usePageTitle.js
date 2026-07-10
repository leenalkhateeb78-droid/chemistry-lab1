import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export function usePageTitle() {
  const { locale, t } = useI18n()
  const route = useRoute()

  const pageTitle = computed(() => {
    const routeName = route.name
    const titles = {
      home: locale.value === 'ar' ? 'مختبر الكيمياء الافتراضي' : 'Virtual Chemistry Lab',
      leaderboard: t('leaderboard.title'),
      reviews: t('reviews.title'),
    }

    return titles[routeName] || (locale.value === 'ar' ? 'مختبر الكيمياء الافتراضي' : 'Virtual Chemistry Lab')
  })

  watch(pageTitle, (value) => {
    document.title = value
  }, { immediate: true })

  return { pageTitle }
}
