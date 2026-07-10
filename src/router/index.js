import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExperimentsView from '../views/ExperimentsView.vue'
import LabView from '../views/LabView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import AchievementsView from '../views/AchievementsView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue'
import ReviewsView from '../views/ReviewsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/experiments', name: 'experiments', component: ExperimentsView },
    { path: '/lab', name: 'lab', component: LabView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView },
    { path: '/achievements', name: 'achievements', component: AchievementsView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/profile', name: 'profile', component: ProfileView },
    { path: '/reviews', name: 'reviews', component: ReviewsView },
  ],
})

export default router
