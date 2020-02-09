import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDyKl8M5W3Q_IlWhsMBfaTTAGVv0Q5UQMI",
    authDomain: "kodekula-1580634701889.firebaseapp.com",
    databaseURL: "https://kodekula-1580634701889.firebaseio.com",
    projectId: "kodekula-1580634701889",
    storageBucket: "kodekula-1580634701889.appspot.com",
    messagingSenderId: "164164000203",
    appId: "1:164164000203:web:ce8e0a071a366f9b76be4e",
    measurementId: "G-TG3FDXBK8D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }
