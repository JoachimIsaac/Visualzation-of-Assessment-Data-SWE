"use strict";

var allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';
var modalPlotSloSelector = document.getElementById('SLO-selector-plt');
var modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
var modalPlotStartDateSelector = document.getElementById('start-selector-plt');
var modalPlotEndDateSelector = document.getElementById('end-selector-plt');
var modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');
var modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');
var modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');
var modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');

function clearPlotMeasureSelector() {
  modalPlotMeasureSelector.textContent = null;
  var tempOption = document.createElement('option');
  tempOption.value = 0;
  tempOption.textContent = "Choose Measure";
  modalPlotMeasureSelector.appendChild(tempOption);
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
            modalPlotMeasureSelector.appendChild(tempOption);
          }

          modalPlotMeasureSelector.selectedIndex = 0;
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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = response.data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var date = _step3.value;
            var tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = date;
            count += 1;
            modalPlotStartDateSelector.appendChild(tempOption);
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
          modalPlotEndDateSelector.appendChild(tempOption);
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
  }
});
window.addEventListener("load", function () {
  loadPlotSloSelector();
});