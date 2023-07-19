import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDG_eAL5j3cK2A7BiIziBXHAil5yuhsu-c',
  authDomain: 'insurify-fapp.firebaseapp.com',
  projectId: 'insurify-fapp',
  storageBucket: 'insurify-fapp.appspot.com',
  messagingSenderId: '614080380511',
  appId: '1:614080380511:web:aef6778bacc89483e025ea',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
