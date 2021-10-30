import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  // Alias' good if you do not want to redirect
  {
    path: '/manage/music',
    // alias: '/manage',
    name: 'manage',
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Mange Route Guard');
      next();
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  // catchall route
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});
// object that contains information about where the user is navigating to
// next is a function - wont render component until you have called the next function

// runs on each request made before responding with the link
router.beforeEach((to, from, next) => {
  // console.log(to.matched);
  // some function is the jS array function - loop through an array and perform a test - if passed, returns true - find out what has the meta auth field - goes through each record (route) and if it doesnt require auth, it will proceed to the next route with no guard
  // matched contains all the records that match the current
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  // this will run on any record that has the auth required field
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
