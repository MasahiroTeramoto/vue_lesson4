import firebase from './firebase.js';

const auth = {
  signUp(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
  getCurrentUser() {
    return firebase.auth().currentUser;
  },
};

export default auth;
