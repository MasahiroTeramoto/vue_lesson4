import Vue from 'vue';
import Vuex from 'vuex';
import { auth, firestore } from '../utils/firebase';
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
    updateName(state, name) {
      state.name = name;
    },
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

          firestore
            .post('/users', {
              fields: {
                name: {
                  stringValue: asyncData.name,
                },
                email: {
                  stringValue: asyncData.email,
                },
              },
            })
            .then((response) => {
              commit('updateName', asyncData.name);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

export default store;
