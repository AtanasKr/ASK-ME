Survey
    .StylesManager
    .applyTheme("defaultV2");

var json = localStorage.getItem("jsonText"); 

window.survey = new Survey.Model(json);
survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = JSON.stringify(sender.data, null, 3);
            localStorage.setItem("surveyResult",JSON.stringify(sender.data, null, 3));
            window.location = "sendResults.html";
    });

ReactDOM.render(<SurveyReact.Survey model={survey}/>, document.getElementById("surveyElement"));