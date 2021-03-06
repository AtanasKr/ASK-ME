import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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
let userUid;

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


  
    function surveyResultModel(id, name, facnum, results) {
      let self = this;
      self.id = id;
      self.name = name;
      self.facnum = facnum;
      self.results = results;
      self.jsonResultsValue = null;
      self.getJsonResults = function() {
        if (!self.jsonResultsValue && self.results) {
          self.jsonResultsValue = self.results;
        }
        return self.jsonResultsValue;
      };
    }

    let surveyResultsDataFromDB=[];
    let surveyJSONFromDB = [];
    function surveyResultsModel(data) {
      let self = this;
      let items = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          items.push(
            new surveyResultModel(
              i + 1,
              item.name,
              item.facnum,
              item.results
            )
          );
        }
      }
      self.koItems = ko.observableArray(items);
      self.showSurveyResult = function(item) {
        localStorage.setItem("jsonToVisualize",surveyJSONFromDB[item.id-1].json);
        localStorage.setItem("counterRow",surveyJSONFromDB[item.id-1].counter);
        localStorage.setItem("surveyData",JSON.stringify(surveyResultsDataFromDB[item.id-1].results));
        window.location="resultVisualize.html"
      };
    }

    const resultRef = ref(database, 'resultHolder');
        onValue(resultRef, (snapshot) => {
            const data = snapshot;
            let count = 0;
            data.forEach(function(childSnapshot){
              let holderForTable = {
                name:"",
                facnum:"",
                results:""
              };
              
              let holderForSurvey = {
                json:"",
                counter:""
              }
              if(userUid===childSnapshot.val().from){
                holderForTable.name=childSnapshot.val().name;
                holderForTable.facnum = childSnapshot.val().fnum;
                holderForTable.results = JSON.parse(childSnapshot.val().jsonResult);
                holderForSurvey.json = childSnapshot.val().jsonSurvey;
                holderForSurvey.counter = count;
                surveyResultsDataFromDB.push(holderForTable);
                surveyJSONFromDB.push(holderForSurvey);
                
  
                count++; 
              }

  });
  ko.applyBindings(
    new surveyResultsModel(surveyResultsDataFromDB),
    document.getElementById('resultsTable')
  );
});

  