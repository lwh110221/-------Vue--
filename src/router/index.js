import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import Mainhome from '../views/Mainhome.vue';
import Search from '../views/Search.vue';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/main',
    name: 'Mainhome',
    component: Mainhome,
    children: [
      {
        path: '/main/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/main/search',
        name: 'Search',
        component: Search
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
});

export default router;
