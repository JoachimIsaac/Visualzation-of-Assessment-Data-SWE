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

const modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');

const modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');

const modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');

const modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');



const modalInputSloSelector = document.getElementById('SLO-selector-data');
const modalInputMeasureSelector = document.getElementById('measure-selector-data');
const modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
const modalInputTargetSelector = document.getElementById('SLO-selector-target');

const modalInputSloDescriptionContainer = document.getElementById('modal-SLO-description-data');
const modalInputMeasureDescriptionContainer = document.getElementById('modal-measure-description-data');


const modalInputSloDescriptionTextBox = document.getElementById('modal-SLO-description-data');
const moadalInputMeasureDescriptionTextbox = document.getElementById('modal-measure-description-data');





function getCurrentSchoolTerm(){
  const date = new Date();
  const MAY = 5;
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  if(currentMonth < MAY){
    
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
            tempOption.textContent = slo;
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
            tempOption.textContent = slo;
            count += 1;
            modalInputSloSelector.appendChild(tempOption);
        }
    });
}

function loadInputAcademicTermTag() {
    modalInputAcademicTermTag.textContent = getCurrentSchoolTerm(); 
    console.log("loaded!!")
}


function clearPlotMeasureSelector() {
    modalPlotMeasureSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";
    modalPlotMeasureSelector.appendChild(tempOption);
}

function clearPlotStartDateSelector() {
    modalPlotStartDateSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Start Date";
     modalPlotStartDateSelector.appendChild(tempOption);
}

function clearPlotEndDateSelector() {
    modalPlotEndDateSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose End Date";
    modalPlotEndDateSelector.appendChild(tempOption);
}

function clearInputMeasureSelector() {
    modalInputMeasureSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";
    modalInputMeasureSelector.appendChild(tempOption);
}


function clearInputTargetSelector() {
    modalInputTargetSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Target";
    modalInputTargetSelector.appendChild(tempOption);
}



window.addEventListener("load", () => {
    loadInputAcademicTermTag();
    loadPlotSloSelector();
    loadInputSloSelector();
    
});
    


modalPlotSloSelector.addEventListener('change', () => {
    let selectedSlo= modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
    let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

        clearPlotMeasureSelector();
        clearPlotStartDateSelector();
        clearPlotEndDateSelector();
        modalPlotMeasureDescriptionContainer.style.display = "none";
 
    

    axios.get(MeasureUrl).then(response => {

        if (response.status ) {
            let count = 1;
            console.log("measure loaded")
            for (let measure of response.data) {
                if (measure != "description") {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = measure;
                    count += 1;
                    modalPlotMeasureSelector.appendChild(tempOption);
                }
                modalPlotMeasureSelector.selectedIndex = 0;
            }

            loadSloDescriptionSlo(selectedSlo);
        }
    });
});


function loadSloDescriptionSlo(selectedSlo) {
    let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

                axios.get(sloDescriptionUrl).then(response => { 
                    console.log(response.data)
                    modalPlotSloDescriptionTextbox.value = "";
                    modalPlotSloDescriptionTextbox.value = "SLO Description: " + response.data;
                    modalPlotSloDescriptionTextbox.style.height = "auto";
                    modalPlotSloDescriptionContainer.style.display = "flex";
                });
}

function loadSloDescriptionData(selectedSlo) { 
    let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

                axios.get(sloDescriptionUrl).then(response => { 
                    console.log(response.data)
                    modalInputSloDescriptionTextBox.value = "";
                    modalInputSloDescriptionTextBox.value = "SLO Description: " + response.data;
                    modalInputSloDescriptionTextBox.style.height = "auto";
                    modalInputSloDescriptionContainer.style.display = "flex";
                });

}


function loadMeasureDescriptionSlo(selectedSlo,selectedMeasure) {
    let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

              axios.get(measureDescriptionUrl).then(response => { 
                  console.log(response.data)
                  modalPlotMeasureDescriptionTextbox.value = "";
                  modalPlotMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
                  modalPlotMeasureDescriptionTextbox.style.height = "auto";
                  modalPlotMeasureDescriptionContainer.style.display = "flex";

                });
}


function loadMeasureDescriptionData(selectedSlo, selectedMeasure) {
     let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

    axios.get(measureDescriptionUrl).then(response => { 
        console.log(response.data)
        moadalInputMeasureDescriptionTextbox.value = "";
        moadalInputMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
        moadalInputMeasureDescriptionTextbox.style.height = "auto";
        modalInputMeasureDescriptionContainer.style.display = "flex";
    });

}


modalPlotMeasureSelector.addEventListener('change',() => {
    clearPlotStartDateSelector();
    clearPlotEndDateSelector()
    let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

    if (selectedMeasure != "Choose Measure") {
       
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
   
        console.log(selectedMeasure)
        let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

        
       axios.get(startDatesUrl).then(response => {
            if (response.status) {
                let count = 1;
                console.log("start date loader")
                for (let date of response.data) {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = date;
                    count += 1;
                    modalPlotStartDateSelector.appendChild(tempOption);
                }

            }

       });
        
        loadMeasureDescriptionSlo(selectedSlo, selectedMeasure)
 
    }

});




modalPlotStartDateSelector.addEventListener('change', () => {
    clearPlotEndDateSelector()
    let selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;
    
    
    if (selectedStartDate != "Choose Start Date") { 
        
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
        let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

        let endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${selectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

        axios.get(endDatesUrl).then(response => {
            let count = 1;
            console.log("end date loader")
            for (let date of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.textContent = date;
                count += 1;
                modalPlotEndDateSelector.appendChild(tempOption);
            }
        });

    }


});



modalInputSloSelector.addEventListener('change',() => {
    clearInputMeasureSelector();
    clearInputTargetSelector();
    modalInputMeasureDescriptionContainer.style.display = "none";

   let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;

    if (selectedSlo != "Choose SLO") {

        let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

        axios.get(MeasureUrl).then(response => {
            let count = 1;
            console.log("measure loaded")
            for (let measure of response.data) {
                if (measure != "description") {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = measure;
                    count += 1;
                    modalInputMeasureSelector.appendChild(tempOption);
                }
            }
                modalInputMeasureSelector.selectedIndex = 0;
                modalInputSloDescriptionContainer.style.display = "flex";
                loadSloDescriptionData(selectedSlo)
            
        });

    }
});


modalInputMeasureSelector.addEventListener('change',() => {

    clearInputTargetSelector();
    // modalInputMeasureDescriptionContainer.style.display = "none";

    let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;
    let selectedMeasure = modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].textContent;
    

    if (selectedMeasure!= "Choose Measure") {
        console.log("target changed")
        let MeasureUrl = `https://visualization-practice-api.herokuapp.com/targets/${selectedSlo}/${selectedMeasure}`;

        axios.get(MeasureUrl).then(response => {
            let count = 1;
            console.log("measure loaded")
            for (let target of response.data) {
                if (target != "description") {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = target;
                    count += 1;
                    modalInputTargetSelector.appendChild(tempOption);
                }
            }
           
        });
        modalInputTargetSelector.selectedIndex = 0;
        modalInputMeasureDescriptionContainer.style.display = "flex";
        loadMeasureDescriptionData(selectedSlo, selectedMeasure)
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


