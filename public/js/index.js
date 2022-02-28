

const allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';


const studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
const numberOfStudentsContainer = document.getElementById('number-of-students-container');
const numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
const percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');

const modalPlotSloSelector = document.getElementById('SLO-selector');
const modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
const modalPlotStartDateSelector = document.getElementById('start-selector');
const modalPlotEndDateSelector = document.getElementById('end-selector');
const modalInputSloSelector = document.getElementById('SLO-selector-data');
const modalInputMeasureSlector = document.getElementById('measure-selector-data');


function loadPlotSloSelector() {
    axios.get(allSloURL).then(response => {
        let count = 1;
        for (let slo of response.data) {
            let tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.innerHTML = slo;
            count += 1;
            modalPlotSloSelector.appendChild(tempOption);
        }
    });
}


function loadInputSloSelector() {

    axios.get(allSloURL).then(response => {
        let count = 1;
        for (let slo of response.data) {
            let tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.innerHTML = slo;
            count += 1;
            modalInputSloSelector.appendChild(tempOption);
        }
    });
}

function clearPlotMeasureSelector() {
    modalPlotMeasureSelector.innerHTML = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.innerHTML = "Choose...";
    modalPlotMeasureSelector.appendChild(tempOption);
}

function clearPlotStartDateSelector() {
    modalPlotStartDateSelector.innerHTML = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.innerHTML = "Choose...";
     modalPlotStartDateSelector.appendChild(tempOption);
}

function clearPlotEndDateSelector() {
    modalPlotEndDateSelector.innerHTML = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.innerHTML = "Choose...";
    modalPlotEndDateSelector.appendChild(tempOption);
}

function clearInputMeasureSelector() {
    modalInputMeasureSlector.innerHTML = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.innerHTML = "Choose...";
    modalInputMeasureSlector.appendChild(tempOption);
}




window.addEventListener("load", () => {
    loadPlotSloSelector();
    loadInputSloSelector();
});
    


modalPlotSloSelector.addEventListener('change',() => {
    clearPlotMeasureSelector();
    clearPlotStartDateSelector();
    clearPlotEndDateSelector()
    let selectedSlo= modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
    let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

    axios.get(MeasureUrl).then(response => {
        let count = 1;
        console.log("measure loaded")
        for (let slo of response.data) {
            let tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.innerHTML = slo;
            count += 1;
            modalPlotMeasureSelector.appendChild(tempOption);
        }
        modalInputMeasureSlector.selectedIndex = 0;
    });

});


modalPlotMeasureSelector.addEventListener('change', () => {
    let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;

    if (selectedMeasure != "Choose...") {
        clearPlotStartDateSelector();
        clearPlotEndDateSelector()
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
   
        console.log(selectedMeasure)
        let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

        axios.get(startDatesUrl).then(response => {
            let count = 1;
            console.log("dates loaded")
            for (let date of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.innerHTML = date;
                count += 1;
                modalPlotStartDateSelector.appendChild(tempOption);
            }
        });
    }
    else {
        clearPlotStartDateSelector();
        clearPlotEndDateSelector()
    }
})


modalPlotStartDateSelector.addEventListener('change', () => {
    let selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].innerHTML;
    
    if (selectedStartDate != "Choose...") { 
        clearPlotEndDateSelector()
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
        let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;

        let endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${selectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

        axios.get(endDatesUrl).then(response => {
            let count = 1;
            console.log("dates loaded")
            for (let date of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.innerHTML = date;
                count += 1;
                modalPlotEndDateSelector.appendChild(tempOption);
            }
        });

    }
    else {
        clearPlotEndDateSelector()
    }


});

studentPecentageCheckSwitch.addEventListener('change', () => {
    if (studentPecentageCheckSwitch.checked) {
        numberOfStudentsContainer.style.display = "none";
        numberOfStudentsMetContainer.style.display = "none";
        percentageOfStudentsContainer.style.display = "flex";
    }
    else {
        numberOfStudentsContainer.style.display = "flex";
        numberOfStudentsMetContainer.style.display = "flex";
        percentageOfStudentsContainer.style.display = "none";

    }
});


