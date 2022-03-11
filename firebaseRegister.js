// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
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


document.getElementById("signUp").addEventListener("click",(e)=>{
var email = document.getElementById('femail').value;
var password = document.getElementById('fpass').value;
var username = document.getElementById('fname').value;
  const auth = getAuth();
  console.log(email);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // Signed in 
      const user = userCredential.user;
      set(ref(database,'users/'+user.uid),{
        username:username,
        email:email
      });
      window.location.href = "panelTeacher.html"
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;

  alert(errorMessage);
  // ..
});
});
