"use strict";

var allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';
var studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
var numberOfStudentsContainer = document.getElementById('number-of-students-container');
var numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
var percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');
var modalPlotSloSelector = document.getElementById('SLO-selector');
var modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
var modalPlotStartDateSelector = document.getElementById('start-selector');
var modalPlotEndDateSelector = document.getElementById('end-selector');
var modalInputSloSelector = document.getElementById('SLO-selector-data');
var modalInputMeasureSlector = document.getElementById('measure-selector-data');

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
        tempOption.innerHTML = slo;
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
        tempOption.innerHTML = slo;
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

function clearPlotMeasureSelector() {
  modalPlotMeasureSelector.innerHTML = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.innerHTML = "Choose...";
  modalPlotMeasureSelector.appendChild(tempOption);
}

function clearPlotStartDateSelector() {
  modalPlotStartDateSelector.innerHTML = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.innerHTML = "Choose...";
  modalPlotStartDateSelector.appendChild(tempOption);
}

function clearPlotEndDateSelector() {
  modalPlotEndDateSelector.innerHTML = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.innerHTML = "Choose...";
  modalPlotEndDateSelector.appendChild(tempOption);
}

function clearInputMeasureSelector() {
  modalInputMeasureSlector.innerHTML = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.innerHTML = "Choose...";
  modalInputMeasureSlector.appendChild(tempOption);
}

window.addEventListener("load", function () {
  loadPlotSloSelector();
  loadInputSloSelector();
});
modalPlotSloSelector.addEventListener('change', function () {
  clearPlotMeasureSelector();
  clearPlotStartDateSelector();
  clearPlotEndDateSelector();
  var selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
  var MeasureUrl = "https://visualization-practice-api.herokuapp.com/measure/".concat(selectedSlo);
  axios.get(MeasureUrl).then(function (response) {
    var count = 1;
    console.log("measure loaded");
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = response.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var slo = _step3.value;
        var tempOption = document.createElement('option');
        tempOption.value = count;
        tempOption.innerHTML = slo;
        count += 1;
        modalPlotMeasureSelector.appendChild(tempOption);
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

    modalInputMeasureSlector.selectedIndex = 0;
  });
});
modalPlotMeasureSelector.addEventListener('change', function () {
  var selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;

  if (selectedMeasure != "Choose...") {
    clearPlotStartDateSelector();
    clearPlotEndDateSelector();
    var selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
    console.log(selectedMeasure);
    var startDatesUrl = "https://visualization-practice-api.herokuapp.com/dates/".concat(selectedSlo, "/").concat(selectedMeasure);
    axios.get(startDatesUrl).then(function (response) {
      var count = 1;
      console.log("dates loaded");
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = response.data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var date = _step4.value;
          var tempOption = document.createElement('option');
          tempOption.value = count;
          tempOption.innerHTML = date;
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
    });
  } else {
    clearPlotStartDateSelector();
    clearPlotEndDateSelector();
  }
});
modalPlotStartDateSelector.addEventListener('change', function () {
  var selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].innerHTML;

  if (selectedStartDate != "Choose...") {
    clearPlotEndDateSelector();
    var selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
    var selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;
    var endDatesUrl = "https://visualization-practice-api.herokuapp.com/startdate/".concat(selectedSlo, "/").concat(selectedMeasure, "?start=").concat(selectedStartDate);
    axios.get(endDatesUrl).then(function (response) {
      var count = 1;
      console.log("dates loaded");
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = response.data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var date = _step5.value;
          var tempOption = document.createElement('option');
          tempOption.value = count;
          tempOption.innerHTML = date;
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
  } else {
    clearPlotEndDateSelector();
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