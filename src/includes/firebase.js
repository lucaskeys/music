import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCZMoj11pxKZl9EyOUXO820YKNGi10TwrQ',
  authDomain: 'music-440c0.firebaseapp.com',
  projectId: 'music-440c0',
  storageBucket: 'music-440c0.appspot.com',
  appId: '1:690935151661:web:12ba7e64c37e82348f8ca4',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
