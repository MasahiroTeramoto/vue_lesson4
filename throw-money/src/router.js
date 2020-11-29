import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import DashBoard from './components/DashBoard';
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: Login,
      component: Login,
    },
    {
      path: '/register',
      name: Register,
      component: Register,
    },
    {
      path: '/dashboard',
      name: DashBoard,
      component: DashBoard,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
