import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import DashBoard from './components/DashBoard';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: Login,
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: Register,
      component: Register,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/dashboard',
      name: DashBoard,
      component: DashBoard,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next();
        } else {
          next('/');
        }
      },
    },
  ],
});

export default router;
