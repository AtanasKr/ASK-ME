// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkZEmYPaS6ZU4pq3mkTFrO9r7Ua_1i-Jo",
  authDomain: "ask-me-1d534.firebaseapp.com",
  projectId: "ask-me-1d534",
  storageBucket: "ask-me-1d534.appspot.com",
  messagingSenderId: "1069134548159",
  appId: "1:1069134548159:web:f24d2cc880438e907cca0a",
  measurementId: "G-CWXG9BYSDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
var user;


document.getElementById("signIn").addEventListener('click', (e)=>{
    let email = document.getElementById('femail').value;
    let password = document.getElementById('fpass').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const dt = new Date();
        user = userCredential.user;
        window.location = 'panelTeacher.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert("Wrong user crediterials!");
      });

  });


  