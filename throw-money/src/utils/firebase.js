import axios from 'axios';

const auth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});

const firestore = axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1/projects/throw-money-lesson/databases/(default)/documents',
});

export { auth, firestore };
