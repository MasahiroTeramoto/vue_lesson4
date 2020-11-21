import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../utils/firebase';
import * as settings from './settings';

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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

export default store;
