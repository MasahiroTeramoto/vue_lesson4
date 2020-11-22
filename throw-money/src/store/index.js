import Vue from 'vue';
import Vuex from 'vuex';
import { auth, firestore } from '../utils/firebase';
import * as settings from './settings';
import router from '../router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: '',
    idToken: '',
  },
  getters: {
    name: (state) => state.name,
    idToken: (state) => state.idToken,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    updateName(state, name) {
      state.name = name;
    },
  },
  actions: {
    register({ commit }, asyncData) {
      auth
        .post(`/accounts:signUp?key=${settings.apiKey}`, {
          email: asyncData.email,
          password: asyncData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          commit('updateIdToken', response.data.idToken);
          router.push('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    },

    login({ commit }, asyncData) {
      console.log('email: ' + asyncData.email);
      auth
        .post(`/accounts:signInWithPassword?key=${settings.apiKey}`, {
          email: asyncData.email,
          password: asyncData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          commit('updateIdToken', response.data.idToken);
          router.push('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUser({ commit }, asyncData) {
      console.log('email: ' + asyncData.email);
      firestore.get('/users').then((response) => {
        const users = response.data.documents;
        const user = users.filter(
          (user) => user.fields.email.stringValue === asyncData.email
        );

        commit('updateName', user[0].fields.name.stringValue);
      });
    },
  },
});

export default store;
