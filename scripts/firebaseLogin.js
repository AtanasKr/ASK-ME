import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later
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
let user;


document.getElementById("signIn").addEventListener('click', (e)=>{
    let email = document.getElementById('femail').value;
    let password = document.getElementById('fpass').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        let data;
        //window.location = 'panelTeacher.html';
        const roleRef = ref(database, 'users/' + user.uid + '/role');
        onValue(roleRef, (snapshot) => {
          data = snapshot.val();
          if(data === "Teacher"){
            window.location = 'panelTeacher.html';
          }else{
            window.location = 'panelStudent.html';
          }
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert("Wrong user crediterials!");
      });

  });


  