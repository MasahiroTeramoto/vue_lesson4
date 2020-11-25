import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

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
  ],
});

export default router;
