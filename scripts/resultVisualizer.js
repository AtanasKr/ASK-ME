Survey.StylesManager.applyTheme("default");
let json = JSON.parse(localStorage.getItem("jsonToVisualize"));
window.survey = new Survey.Model(json);
survey.onComplete.add(function (sender) {
  document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
});
survey.data = JSON.parse(localStorage.getItem("surveyData"));
survey.mode = 'display';
$("#surveyElement").Survey({model: survey});