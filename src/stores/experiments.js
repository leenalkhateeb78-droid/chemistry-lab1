import { defineStore } from 'pinia'

export const useExperimentsStore = defineStore('experiments', {
  state: () => ({
    stats: [
      { label: 'Interactive Experiments', value: '40+' },
      { label: 'Active Students', value: '12k+' },
      { label: 'Countries', value: '24' },
      { label: 'Rating', value: '4.9 star' },
    ],
    categories: [
      'All',
      'Acids & Bases',
      'Chemical Reactions',
      'Electrochemistry',
      'Organic Chemistry',
      'Lab Skills',
      'Everyday Chemistry',
    ],
    experiments: [
      { id: 'acid-base-titration', icon: 'FlaskConical', title: 'Acid-Base Titration', desc: 'Neutralize hydrochloric acid with sodium hydroxide and watch the indicator change color.', tag: 'Acids & Bases', time: '10 min', xp: 50, level: 'Easy' },
      { id: 'elephant-toothpaste', icon: 'Sparkles', title: 'Elephant Toothpaste', desc: 'A dramatic decomposition reaction of hydrogen peroxide - a foam explosion is coming.', tag: 'Chemical Reactions', time: '8 min', xp: 80, level: 'Medium' },
      { id: 'electrolysis-of-water', icon: 'Zap', title: 'Electrolysis of Water', desc: 'Split water into hydrogen and oxygen using electricity.', tag: 'Electrochemistry', time: '12 min', xp: 90, level: 'Medium' },
      { id: 'esterification', icon: 'Citrus', title: 'Making a Fruity Ester', desc: 'Create a banana-scented ester from an alcohol and an acid.', tag: 'Organic Chemistry', time: '15 min', xp: 120, level: 'Hard' },
      { id: 'flame-test', icon: 'Flame', title: 'Flame Test', desc: 'Identify a metal by the color of its flame.', tag: 'Lab Skills', time: '6 min', xp: 40, level: 'Easy' },
      { id: 'vitamin-c-in-juice', icon: 'Citrus', title: 'Vitamin C in Juice', desc: 'Measure the vitamin C content in different fruit juices.', tag: 'Everyday Chemistry', time: '10 min', xp: 60, level: 'Easy' },
    ],
    testimonials: [
      { name: 'Layla', role: '10th Grade', text: 'First time I truly understood titration. The animations helped a lot!' },
      { name: 'Mr. Adnan', role: 'Teacher', text: 'A great tool for my class - students got hooked on it.' },
      { name: 'Omar', role: '8th Grade', text: 'The XP and badge system keeps me coming back every day.' },
    ],
    faqs: [
      { q: 'Is the virtual lab free?', a: 'Yes, the platform is completely free for all students and teachers.' },
      { q: 'Does it support Arabic?', a: 'Yes, the site fully supports Arabic with RTL layout.' },
      { q: 'What grade levels is it for?', a: 'Suitable for middle and high school students.' },
    ],
  }),
  getters: {
    featured: (state) => state.experiments.slice(0, 3),
  },
})