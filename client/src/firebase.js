import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDOVMl62dIoJXFiVB5KFHb4i3mOVg4nCLw',
  authDomain: 'codevcircle.firebaseapp.com',
  projectId: 'codevcircle',
  storageBucket: 'codevcircle.appspot.com',
  messagingSenderId: '464524565157',
  appId: '1:464524565157:web:9e1e77c7a01e1acbc08b4c',
  measurementId: 'G-N51PSMM6GJ',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage , firebase as default}