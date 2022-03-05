// 


const allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';


const studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
const numberOfStudentsContainer = document.getElementById('number-of-students-container');
const numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
const percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');

const modalPlotSloSelector = document.getElementById('SLO-selector-plt');
const modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
const modalPlotStartDateSelector = document.getElementById('start-selector-plt');
const modalPlotEndDateSelector = document.getElementById('end-selector-plt');


const modalInputSloSelector = document.getElementById('SLO-selector-data');
const modalInputMeasureSelector = document.getElementById('measure-selector-data');
const modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
const modalInputTargetSelector = document.getElementById('SLO-selector-target');


function getCurrentSchoolTerm(){
  const date = new Date();
  const AUGUST = 8;
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  if(currentMonth < AUGUST){
    
    let startYear = currentYear-1;
    let endYear = currentYear;
    
    startYear = startYear.toString();
    endYear = endYear.toString();

    startYear = startYear.slice(2,4);
    endYear = endYear.slice(2,4);

    return `${startYear}-${endYear}`; 
  }
  else{
    
    let startYear = currentYear;
    let endYear = currentYear+1;
    
    startYear = startYear.toString();
    endYear = endYear.toString();

    startYear = startYear.slice(2,4);
    endYear = endYear.slice(2,4);

    return `${startYear}-${endYear}`;
  }
}


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

function loadInputAcademicTermTag() {
    modalInputAcademicTermTag.innerHTML = getCurrentSchoolTerm(); 
    console.log("loaded!!")
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
    modalInputMeasureSelector.innerHTML = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.innerHTML = "Choose...";
    modalInputMeasureSelector.appendChild(tempOption);
}


function clearInputTargetSelector() {
    modalInputTargetSelector.innerHTML = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.innerHTML = "Choose...";
    modalInputTargetSelector.appendChild(tempOption);
}



window.addEventListener("load", () => {
    loadInputAcademicTermTag();
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
        modalPlotMeasureSelector.selectedIndex = 0;
    });

});


modalPlotMeasureSelector.addEventListener('change', () => {
    clearPlotStartDateSelector();
    clearPlotEndDateSelector()
    let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;

    if (selectedMeasure != "Choose...") {
       
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
   
        console.log(selectedMeasure)
        let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

        axios.get(startDatesUrl).then(response => {
            let count = 1;
            console.log("start date loader")
            for (let date of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.innerHTML = date;
                count += 1;
                modalPlotStartDateSelector.appendChild(tempOption);
            }
        });
    }

});


modalPlotStartDateSelector.addEventListener('change', () => {
    clearPlotEndDateSelector()
    let selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].innerHTML;
    
    
    if (selectedStartDate != "Choose...") { 
        
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
        let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;

        let endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${selectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

        axios.get(endDatesUrl).then(response => {
            let count = 1;
            console.log("end date loader")
            for (let date of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.innerHTML = date;
                count += 1;
                modalPlotEndDateSelector.appendChild(tempOption);
            }
        });

    }


});


// modalPlotMeasureSelector.addEventListener('change', () => {
//     let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].innerHTML;

//     if (selectedMeasure != "Choose...") {
//         clearPlotStartDateSelector();
//         clearPlotEndDateSelector()
//         let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].innerHTML;
   
//         console.log(selectedMeasure)
//         let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

//         axios.get(startDatesUrl).then(response => {
//             let count = 1;
//             console.log("dates loaded")
//             for (let date of response.data) {
//                 let tempOption = document.createElement('option');
//                 tempOption.value = count;
//                 tempOption.innerHTML = date;
//                 count += 1;
//                 modalPlotStartDateSelector.appendChild(tempOption);
//             }
//         });
//     }
//     else {
//         clearPlotStartDateSelector();
//         clearPlotEndDateSelector()
//     }
// })


modalInputSloSelector.addEventListener('change',() => {
    clearInputMeasureSelector();
    clearInputTargetSelector();

   let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].innerHTML;

    if (selectedSlo != "Choose...") {

        let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

        axios.get(MeasureUrl).then(response => {
            let count = 1;
            console.log("measure loaded")
            for (let slo of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.innerHTML = slo;
                count += 1;
                modalInputMeasureSelector.appendChild(tempOption);
            }
            modalInputMeasureSelector.selectedIndex = 0;
        });
    }
});


modalInputMeasureSelector.addEventListener('change',() => {

    clearInputTargetSelector();

    let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].innerHTML;
    let selectedMeasure = modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].innerHTML;
    

    if (selectedMeasure!= "Choose...") {
        console.log("target changed")
        let MeasureUrl = `https://visualization-practice-api.herokuapp.com/targets/${selectedSlo}/${selectedMeasure}`;

        axios.get(MeasureUrl).then(response => {
            let count = 1;
            console.log("measure loaded")
            for (let slo of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.innerHTML = slo;
                count += 1;
                modalInputTargetSelector.appendChild(tempOption);
            }
            modalInputTargetSelector.selectedIndex = 0;
        });
    }
});


//modalInputMeasureSelector



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


