/* valid check */
const headerInput = document.getElementById("inputforHeader");
const descriptionInput = document.getElementById("inputforDescription");
const requirementA = document.querySelectorAll(".requirementA");
const requirementB = document.querySelectorAll(".requirementB");
headerInput.addEventListener("input", () => {
    if (headerInput.value.trim().length >= 2 && headerInput.value.trim().length <= 255) {
        requirementA.forEach((element) => {
            element.style.color = "green";
        });
    } else {
        requirementA.forEach((element) => {
            element.style.color = "#6C757D";
        });
    }
});
descriptionInput.addEventListener("input", () => {
    if (descriptionInput.value.trim().length >= 2 && descriptionInput.value.trim().length <= 255) {
        requirementB.forEach((element) => {
            element.style.color = "green";
        });
    } else {
        requirementB.forEach((element) => {
            element.style.color = "#6C757D";
        });
    }
});


const taskTitle = document.getElementById("inputforHeader");
const taskDescription = document.getElementById("inputforDescription");
const taskPriority = document.getElementById("inputforPriority");
const taskStatus = document.getElementById("inputforStatus");
const taskDepartment = document.getElementById("inputforDepartament");
const taskWorker = document.getElementById("inputforWorker");
const taskDeadline = document.getElementById("inputforDate");

