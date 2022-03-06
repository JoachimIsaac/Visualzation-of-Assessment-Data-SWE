"use strict";

// 
var allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';
var studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
var numberOfStudentsContainer = document.getElementById('number-of-students-container');
var numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
var percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');
var modalPlotSloSelector = document.getElementById('SLO-selector-plt');
var modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
var modalPlotStartDateSelector = document.getElementById('start-selector-plt');
var modalPlotEndDateSelector = document.getElementById('end-selector-plt');
var modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');
var modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');
var modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');
var modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');
var modalInputSloSelector = document.getElementById('SLO-selector-data');
var modalInputMeasureSelector = document.getElementById('measure-selector-data');
var modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
var modalInputTargetSelector = document.getElementById('SLO-selector-target');
var modalInputSloDescriptionContainer = document.getElementById('modal-SLO-description-data');
var modalInputMeasureDescriptionContainer = document.getElementById('modal-measure-description-data');
var modalInputSloDescriptionTextBox = document.getElementById('modal-SLO-description-data');
var moadalInputMeasureDescriptionTextbox = document.getElementById('modal-measure-description-data');

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

function loadPlotSloSelector() {
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
        modalPlotSloSelector.appendChild(tempOption);
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

function loadInputSloSelector() {
  axios.get(allSloURL).then(function (response) {
    var count = 1;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = response.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var slo = _step2.value;
        var tempOption = document.createElement('option');
        tempOption.value = count;
        tempOption.textContent = slo;
        count += 1;
        modalInputSloSelector.appendChild(tempOption);
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
  });
}

function loadInputAcademicTermTag() {
  modalInputAcademicTermTag.textContent = getCurrentSchoolTerm();
  console.log("loaded!!");
}

function clearPlotMeasureSelector() {
  modalPlotMeasureSelector.textContent = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.textContent = "Choose Measure";
  modalPlotMeasureSelector.appendChild(tempOption);
}

function clearPlotStartDateSelector() {
  modalPlotStartDateSelector.textContent = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.textContent = "Choose Start Date";
  modalPlotStartDateSelector.appendChild(tempOption);
}

function clearPlotEndDateSelector() {
  modalPlotEndDateSelector.textContent = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.textContent = "Choose End Date";
  modalPlotEndDateSelector.appendChild(tempOption);
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

window.addEventListener("load", function () {
  loadInputAcademicTermTag();
  loadPlotSloSelector();
  loadInputSloSelector();
});
modalPlotSloSelector.addEventListener('change', function () {
  var selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
  var MeasureUrl = "https://visualization-practice-api.herokuapp.com/measure/".concat(selectedSlo);
  clearPlotMeasureSelector();
  clearPlotStartDateSelector();
  clearPlotEndDateSelector();
  modalPlotMeasureDescriptionContainer.style.display = "none";
  axios.get(MeasureUrl).then(function (response) {
    if (response.status) {
      var count = 1;
      console.log("measure loaded");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = response.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var measure = _step3.value;

          if (measure != "description") {
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = measure;
            count += 1;
            modalPlotMeasureSelector.appendChild(tempOption);
          }

          modalPlotMeasureSelector.selectedIndex = 0;
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

      loadSloDescriptionSlo(selectedSlo);
    }
  });
});

function loadSloDescriptionSlo(selectedSlo) {
  var sloDescriptionUrl = "https://visualization-practice-api.herokuapp.com/slo/description/".concat(selectedSlo);
  axios.get(sloDescriptionUrl).then(function (response) {
    console.log(response.data);
    modalPlotSloDescriptionTextbox.value = "";
    modalPlotSloDescriptionTextbox.value = "SLO Description: " + response.data;
    modalPlotSloDescriptionTextbox.style.height = "auto";
    modalPlotSloDescriptionContainer.style.display = "flex";
  });
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

function loadMeasureDescriptionSlo(selectedSlo, selectedMeasure) {
  var measureDescriptionUrl = "https://visualization-practice-api.herokuapp.com/measure/description/".concat(selectedSlo, "/").concat(selectedMeasure);
  axios.get(measureDescriptionUrl).then(function (response) {
    console.log(response.data);
    modalPlotMeasureDescriptionTextbox.value = "";
    modalPlotMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
    modalPlotMeasureDescriptionTextbox.style.height = "auto";
    modalPlotMeasureDescriptionContainer.style.display = "flex";
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

modalPlotMeasureSelector.addEventListener('change', function () {
  clearPlotStartDateSelector();
  clearPlotEndDateSelector();
  var selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

  if (selectedMeasure != "Choose Measure") {
    var selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
    console.log(selectedMeasure);
    var startDatesUrl = "https://visualization-practice-api.herokuapp.com/dates/".concat(selectedSlo, "/").concat(selectedMeasure);
    axios.get(startDatesUrl).then(function (response) {
      if (response.status) {
        var count = 1;
        console.log("start date loader");
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = response.data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var date = _step4.value;
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = date;
            count += 1;
            modalPlotStartDateSelector.appendChild(tempOption);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    });
    loadMeasureDescriptionSlo(selectedSlo, selectedMeasure);
  }
});
modalPlotStartDateSelector.addEventListener('change', function () {
  clearPlotEndDateSelector();
  var selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;

  if (selectedStartDate != "Choose Start Date") {
    var selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
    var selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;
    var endDatesUrl = "https://visualization-practice-api.herokuapp.com/startdate/".concat(selectedSlo, "/").concat(selectedMeasure, "?start=").concat(selectedStartDate);
    axios.get(endDatesUrl).then(function (response) {
      var count = 1;
      console.log("end date loader");
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = response.data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var date = _step5.value;
          var tempOption = document.createElement('option');
          tempOption.value = count;
          tempOption.textContent = date;
          count += 1;
          modalPlotEndDateSelector.appendChild(tempOption);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    });
  }
});
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
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = response.data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var measure = _step6.value;

          if (measure != "description") {
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = measure;
            count += 1;
            modalInputMeasureSelector.appendChild(tempOption);
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
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
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = response.data[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var target = _step7.value;

          if (target != "description") {
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = target;
            count += 1;
            modalInputTargetSelector.appendChild(tempOption);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    });
    modalInputTargetSelector.selectedIndex = 0;
    modalInputMeasureDescriptionContainer.style.display = "flex";
    loadMeasureDescriptionData(selectedSlo, selectedMeasure);
  }
});
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