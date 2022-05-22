import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue, push, update} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

  
    function surveyResultModel(id, name, facnum, results) {
      var self = this;
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
    var json;
    var surveyResultsDataFromDB=[];
    var surveyJSONFromDB = [];
    function surveyResultsModel(data) {
      var self = this;
      var items = [];
      if (data) {
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
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
        window.windowSurvey.survey.data = item.getJsonResults();
        window.windowSurvey.isExpanded = true;
      };
    }

    const resultRef = ref(database, 'resultHolder');
        onValue(resultRef, (snapshot) => {
            const data = snapshot;
            var count = 0;
            data.forEach(function(childSnapshot){
              var holderForTable = {
                name:"",
                facnum:"",
                results:""
              };
              
              var holderForSurvey = {
                json:"",
                counter:""
              }
              holderForTable.name="dada";
              holderForTable.facnum = 123456;
              holderForTable.results = JSON.parse(childSnapshot.val().jsonResult);
              holderForSurvey.json = childSnapshot.val().jsonSurvey;
              holderForSurvey.counter = count;
              console.log(childSnapshot.val());
              surveyResultsDataFromDB.push(holderForTable);
              surveyJSONFromDB.push(holderForSurvey);
              

              count++;

  });
  ko.applyBindings(
    new surveyResultsModel(surveyResultsDataFromDB),
    document.getElementById('resultsTable')
  );

 var json = JSON.parse(localStorage.getItem("jsonToVisualize"));
  Survey.Survey.cssType = 'bootstrap';
  var windowSurvey = new Survey.SurveyWindow(json);
  windowSurvey.survey.mode = "display";
  windowSurvey.survey.title = "Current survey";
  windowSurvey.show();
  window.windowSurvey = windowSurvey;
  debugger;
});

  