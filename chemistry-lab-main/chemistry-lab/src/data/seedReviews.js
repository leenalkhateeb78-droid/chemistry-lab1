export function getSeedReviews(locale) {
  if (locale === 'ar') {
    return [
      { id: 'seed1', name: 'ليلى أ.', role: 'الصف العاشر', rating: 5, text: 'أول مرة بفهم المعايرة صح، الرسوم المتحركة ساعدتني كتير!' },
      { id: 'seed2', name: 'الأستاذ عدنان', role: 'معلم', rating: 5, text: 'أداة رائعة لصفي - الطلاب انجذبوا لها كتير.' },
      { id: 'seed3', name: 'عمر ك.', role: 'الصف الثامن', rating: 4, text: 'نظام نقاط الخبرة والأوسمة بيخليني ارجع كل يوم.' },
      { id: 'seed4', name: 'سارة م.', role: 'الصف الحادي عشر', rating: 5, text: 'المختبر الافتراضي حسيته حقيقي بدون أي قلق على السلامة.' },
      { id: 'seed5', name: 'يوسف ر.', role: 'الصف التاسع', rating: 4, text: 'بحب الشات بوت المساعد، بيساعدني ألاقي التجارب بسرعة.' },
    ]
  }
  return [
    { id: 'seed1', name: 'Layla A.', role: '10th Grade', rating: 5, text: 'First time I truly understood titration. The animations helped a lot!' },
    { id: 'seed2', name: 'Mr. Adnan', role: 'Teacher', rating: 5, text: 'A great tool for my class - students got hooked on it.' },
    { id: 'seed3', name: 'Omar K.', role: '8th Grade', rating: 4, text: 'The XP and badge system keeps me coming back every day.' },
    { id: 'seed4', name: 'Sara M.', role: '11th Grade', rating: 5, text: 'The virtual lab feels so real without any of the safety worries.' },
    { id: 'seed5', name: 'Yousef R.', role: '9th Grade', rating: 4, text: 'I like the chatbot assistant, it helps me find experiments fast.' },
  ]
}
