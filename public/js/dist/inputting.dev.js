"use strict";

var saveButton = document.getElementById('data-input-button');
var closeInputModalButton = document.querySelector("#dataInputModal > div > div > div.modal-footer > button.btn.btn-secondary");
var dashboardLogo = document.getElementById('dashboard-logo');

function clearDashboardLogo() {
  dashboardLogo.style.display = "none";
}

function closeInputModal() {
  closeInputModalButton.click();
}

saveButton.addEventListener("click", function () {
  clearDashboardLogo();
  closeInputModal();
});