import Vue from 'vue';
import Vuex from 'vuex';
import { auth, firestore } from '../utils/firebase';
import * as settings from './settings';
import router from '../router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: '',
    balance: 0,
    idToken: '',
  },
  getters: {
    name: (state) => state.name,
    balance: (state) => state.balance,
    idToken: (state) => state.idToken,
  },
  mutations: {
    updateName(state, name) {
      state.name = name;
    },
    updateBalance(state, balance) {
      state.balance = balance;
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
                balance: {
                  integerValue: '0',
                },
              },
            })
            .then(() => {
              commit('updateName', asyncData.name);
              commit('updateBalance', 0);
              router.push('/dashboard');
            })
            .catch((error) => {
              console.log(error);
            });
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
        const filteredUser = users.filter(
          (user) => user.fields.email.stringValue === asyncData.email
        );
        console.log(filteredUser);
        commit('updateName', filteredUser[0].fields.name.stringValue);
        commit('updateBalance', filteredUser[0].fields.balance.integerValue);
      });
    },
  },
});

export default store;
