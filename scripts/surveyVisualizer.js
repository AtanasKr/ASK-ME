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
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });

ReactDOM.render(<SurveyReact.Survey model={survey}/>, document.getElementById("surveyElement"));