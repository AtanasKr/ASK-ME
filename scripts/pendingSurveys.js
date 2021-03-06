import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

let counter= 1;

function clearList(){
    let completelist= document.getElementById("pendingList");
    counter = 1;
    completelist.innerHTML = "";
}

function addElementToList(surveyJson,from,id,name,fnum){
    var completelist= document.getElementById("pendingList");
    
    completelist.innerHTML += "<li><input type='text' disabled style='display:none' value='"+fnum+"' id='"+counter+"fnum'><input type='text' disabled style='display:none' value='"+name+"' id='"+counter+"name'><input type='text' disabled style='display:none' value='"+id+"' id='"+counter+"id'><input type='text' disabled style='display:none' value='"+from+"' id='"+counter+"from'><input type='text' disabled style='display:none' value='"+surveyJson+"' id='"+counter+"'>" + "<button onclick='goToFunc("+counter+")'> <span class='tooltiptext' id='myTooltip'>Решаване на проучване "+counter+"</span></button></li><br>";
    counter++;
}
auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      //getting user ref in order to reach user data in database
      const userRef = ref(database, 'surveyHolder/' + user.uid + "-survey");
      onValue(userRef, (snapshot) => {
          const data = snapshot;
          clearList();
          data.forEach(function(childSnapshot){
            addElementToList(childSnapshot.val().json,childSnapshot.val().from,childSnapshot.val().id,childSnapshot.val().name,childSnapshot.val().fnum);
          });
      });
      // ...
    } else {
      // User is signed out
      console.log("The user is signed off!");
    }
  });