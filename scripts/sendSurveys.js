import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, update} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

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

function sendSurveyToStudent(number,surveyJson){
    const userRef = ref(database, 'users');
        onValue(userRef, (snapshot) => {
            const data = snapshot;
            data.forEach(function(childSnapshot){
                if(+childSnapshot.val().fnum===+number){
                    const surveyData = {
                        json: surveyJson,
                      };
                    const surveyRef = ref(database, 'surveyHolder/' + childSnapshot.key + "-survey");
                    // Get the unique ID generated by push() by accessing its key
                    const newPostKey = push(surveyRef).key;
                    const updates = {};
                    updates['surveyHolder/' + childSnapshot.key + "-survey/" + newPostKey] = surveyData;
                       // Get the unique ID generated by push() by accessing its key
                       alert("Survey Send Succesfully!")
                       return update(ref(database), updates);
                }
            });
        });
}


document.getElementById("send").addEventListener("click",(e)=>{
    var studentNumber = document.getElementById('student-facnum').value;
    var surveyJson = document.getElementById('survey-json').value;
    if(studentNumber.length!=9){
        alert("Wrong faculty number!");
    }else{
        sendSurveyToStudent(studentNumber,surveyJson);
    }
})