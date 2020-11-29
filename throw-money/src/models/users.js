import firebase from '../plugin/firebase.js';

const usersRef = firebase.firestore().collection('users');

const Users = {
  createUser(id, name, email) {
    return new Promise((resolve, reject) => {
      usersRef
        .doc(id)
        .set({
          id: id,
          name: name,
          email: email,
          balance: 0,
        })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
};

export default Users;
