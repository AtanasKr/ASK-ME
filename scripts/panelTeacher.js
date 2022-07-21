import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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


auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      //getting user ref in order to reach user data in database
      const userRef = ref(database, 'users/' + user.uid + '/username');
      onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      document.getElementById("name").innerHTML = "Добре дошли: "+data; 
});
      // ...
    } else {
      // User is signed out
      console.log("The user is signed off!");
    }
  });

  document.getElementById("signOut").addEventListener("click",(e)=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location = 'index.html';
      }).catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  });

//© Atanas Krstev 2022 All rights reserved
