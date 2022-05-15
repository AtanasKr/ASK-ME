$(document).ready(function() {
    var surveyJSONFromDB = {
        "logoPosition": "right",
        "pages": [
         {
          "name": "page1",
          "elements": [
           {
            "type": "checkbox",
            "name": "question6",
            "choices": [
             "item1",
             "item2",
             "item3"
            ]
           },
           {
            "type": "text",
            "name": "question1",
            "title": "awda",
            "description": "awfaw"
           },
           {
            "type": "text",
            "name": "question2"
           },
           {
            "type": "text",
            "name": "question3"
           },
           {
            "type": "text",
            "name": "question4"
           },
           {
            "type": "file",
            "name": "question5"
           }
          ]
         }
        ]
       };
  
    var surveyResultsDataFromDB = [
      {
        name: 'Anna',
        facnum: '1231231',
        results: {
            "question6": [
                "item1"
            ],
            "question1": "dawd",
            "question2": "awda",
            "question3": "awda",
            "question4": "awda"
        },
      },{
        name: 'Anna',
        facnum: '1231231',
        results: {
            "question6": [
                "item1"
            ],
            "question1": "dawd",
            "question2": "awda",
            "question3": "awda",
            "question4": "awda"
        },
      },
    ];
  
    function surveyResultModel(id, name, facnum, postedAt, results) {
      var self = this;
      self.id = id;
      self.name = name;
      self.facnum = facnum;
      self.postedAt = postedAt;
      self.results = results;
      self.jsonResultsValue = null;
      self.getJsonResults = function() {
        if (!self.jsonResultsValue && self.results) {
          self.jsonResultsValue = self.results;
        }
        return self.jsonResultsValue;
      };
    }
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
              item.postedAt,
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
    ko.applyBindings(
      new surveyResultsModel(surveyResultsDataFromDB),
      document.getElementById('resultsTable')
    );
  
    Survey.Survey.cssType = 'bootstrap';
    var json = surveyJSONFromDB;
    var windowSurvey = new Survey.SurveyWindow(json);
    windowSurvey.survey.mode = "display";
    windowSurvey.survey.title = "Current survey";
    windowSurvey.show();
    window.windowSurvey = windowSurvey;
  });
  