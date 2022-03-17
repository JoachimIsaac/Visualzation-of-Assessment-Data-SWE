"use strict";

var allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';
var studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
var numberOfStudentsContainer = document.getElementById('number-of-students-container');
var numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
var percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');
var modalInputSloSelector = document.getElementById('SLO-selector-data');
var modalInputMeasureSelector = document.getElementById('measure-selector-data');
var modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
var modalInputTargetSelector = document.getElementById('SLO-selector-target');
var modalInputSloDescriptionContainer = document.getElementById('modal-SLO-description-data');
var modalInputMeasureDescriptionContainer = document.getElementById('modal-measure-description-data');
var modalInputSloDescriptionTextBox = document.getElementById('modal-SLO-description-data');
var moadalInputMeasureDescriptionTextbox = document.getElementById('modal-measure-description-data');
studentPecentageCheckSwitch.addEventListener('change', function () {
  if (studentPecentageCheckSwitch.checked) {
    numberOfStudentsContainer.style.display = "none";
    numberOfStudentsMetContainer.style.display = "none";
    percentageOfStudentsContainer.style.display = "flex";
  } else {
    numberOfStudentsContainer.style.display = "flex";
    numberOfStudentsMetContainer.style.display = "flex";
    percentageOfStudentsContainer.style.display = "none";
  }
});

function getCurrentSchoolTerm() {
  var date = new Date();
  var MAY = 5;
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();

  if (currentMonth < MAY) {
    var startYear = currentYear - 1;
    var endYear = currentYear;
    startYear = startYear.toString();
    endYear = endYear.toString();
    startYear = startYear.slice(2, 4);
    endYear = endYear.slice(2, 4);
    return "".concat(startYear, "-").concat(endYear);
  } else {
    var _startYear = currentYear;

    var _endYear = currentYear + 1;

    _startYear = _startYear.toString();
    _endYear = _endYear.toString();
    _startYear = _startYear.slice(2, 4);
    _endYear = _endYear.slice(2, 4);
    return "".concat(_startYear, "-").concat(_endYear);
  }
}

function loadInputSloSelector() {
  axios.get(allSloURL).then(function (response) {
    var count = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = response.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var slo = _step.value;
        var tempOption = document.createElement('option');
        tempOption.value = count;
        tempOption.textContent = slo;
        count += 1;
        modalInputSloSelector.appendChild(tempOption);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
}

function loadInputAcademicTermTag() {
  modalInputAcademicTermTag.textContent = getCurrentSchoolTerm();
  console.log("loaded!!");
}

function clearInputMeasureSelector() {
  modalInputMeasureSelector.textContent = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.textContent = "Choose Measure";
  modalInputMeasureSelector.appendChild(tempOption);
}

function clearInputTargetSelector() {
  modalInputTargetSelector.textContent = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.textContent = "Choose Target";
  modalInputTargetSelector.appendChild(tempOption);
}

function loadSloDescriptionData(selectedSlo) {
  var sloDescriptionUrl = "https://visualization-practice-api.herokuapp.com/slo/description/".concat(selectedSlo);
  axios.get(sloDescriptionUrl).then(function (response) {
    console.log(response.data);
    modalInputSloDescriptionTextBox.value = "";
    modalInputSloDescriptionTextBox.value = "SLO Description: " + response.data;
    modalInputSloDescriptionTextBox.style.height = "auto";
    modalInputSloDescriptionContainer.style.display = "flex";
  });
}

function loadMeasureDescriptionData(selectedSlo, selectedMeasure) {
  var measureDescriptionUrl = "https://visualization-practice-api.herokuapp.com/measure/description/".concat(selectedSlo, "/").concat(selectedMeasure);
  axios.get(measureDescriptionUrl).then(function (response) {
    console.log(response.data);
    moadalInputMeasureDescriptionTextbox.value = "";
    moadalInputMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
    moadalInputMeasureDescriptionTextbox.style.height = "auto";
    modalInputMeasureDescriptionContainer.style.display = "flex";
  });
}

modalInputSloSelector.addEventListener('change', function () {
  clearInputMeasureSelector();
  clearInputTargetSelector();
  modalInputMeasureDescriptionContainer.style.display = "none";
  var selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;

  if (selectedSlo != "Choose SLO") {
    var MeasureUrl = "https://visualization-practice-api.herokuapp.com/measure/".concat(selectedSlo);
    axios.get(MeasureUrl).then(function (response) {
      var count = 1;
      console.log("measure loaded");
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = response.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var measure = _step2.value;

          if (measure != "description") {
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = measure;
            count += 1;
            modalInputMeasureSelector.appendChild(tempOption);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      modalInputMeasureSelector.selectedIndex = 0;
      modalInputSloDescriptionContainer.style.display = "flex";
      loadSloDescriptionData(selectedSlo);
    });
  }
});
modalInputMeasureSelector.addEventListener('change', function () {
  clearInputTargetSelector(); // modalInputMeasureDescriptionContainer.style.display = "none";

  var selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;
  var selectedMeasure = modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].textContent;

  if (selectedMeasure != "Choose Measure") {
    console.log("target changed");
    var MeasureUrl = "https://visualization-practice-api.herokuapp.com/targets/".concat(selectedSlo, "/").concat(selectedMeasure);
    axios.get(MeasureUrl).then(function (response) {
      var count = 1;
      console.log("measure loaded");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = response.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var target = _step3.value;

          if (target != "description") {
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = target;
            count += 1;
            modalInputTargetSelector.appendChild(tempOption);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    });
    modalInputTargetSelector.selectedIndex = 0;
    modalInputMeasureDescriptionContainer.style.display = "flex";
    loadMeasureDescriptionData(selectedSlo, selectedMeasure);
  }
});
window.addEventListener("load", function () {
  loadInputAcademicTermTag();
  loadInputSloSelector();
});