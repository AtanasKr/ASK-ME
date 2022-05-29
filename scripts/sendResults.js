import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, update, remove} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

var jsonSurvey = localStorage.getItem("jsonText");
var jsonResult = localStorage.getItem("surveyResult"); 
var from = localStorage.getItem("fromText");
var id = localStorage.getItem("idText");
var name = localStorage.getItem("nameText");
var fnum = localStorage.getItem("fnumText");

const firebaseConfig = {
    apiKey: "AIzaSyDkZEmYPaS6ZU4pq3mkTFrO9r7Ua_1i-Jo",
    authDomain: "ask-me-1d534.firebaseapp.com",
    projectId: "ask-me-1d534",
    storageBucket: "ask-me-1d534.appspot.com",
    messagingSenderId: "1069134548159",
    appId: "1:1069134548159:web:f24d2cc880438e907cca0a",
    measurementId: "G-CWXG9BYSDB"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
var userUid;

auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      //getting user ref in order to reach user data in database
      userUid = user.uid;
      // ...
    } else {
      // User is signed out
      console.log("The user is signed off!");
    }
  });

function sendResults(){
    const surveyRef = ref(database, 'resultHolder/' + from + "-result");
    // Get the unique ID generated by push() by accessing its key
    const newPostKey = push(surveyRef).key;
    const updates = {};
    updates['resultHolder/' + from + "-result" + newPostKey] = {
        jsonResult,
        jsonSurvey,
        userUid,
        name,
        fnum,
        from
    }
    debugger;
    // Get the unique ID generated by push() by accessing its key
    alert("Results are saved!")
    return update(ref(database), updates);
}

function deleteSurvey(){
    const refToDelete = ref(database,'surveyHolder/'+from+"-survey/"+id);
    const allSurveys = ref(database,"surveyHolder/"+from+"-survey");
    onValue(allSurveys, (snapshot) => {
        const data = snapshot;
        data.forEach(function(childSnapshot){
          if(id===childSnapshot.val().id){
            return remove(refToDelete);
          }
        });
    });
}

document.getElementById("sendResults").addEventListener("click",(e)=>{
    sendResults();
    deleteSurvey();
})