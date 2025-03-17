const jobName = document.querySelector(".firstInput").value.trim();
const jobDescription = document.querySelector(".secondInput").value.trim();
const taskPriority = document.getElementById("inputforPriority");
const taskStatus = document.getElementById("inputforStatus");
const taskDepartment = document.getElementById("inputforDepartament");
const taskWorker = document.getElementById("inputforWorker");
const taskDeadline = document.getElementById("inputforDate");
const createJob = document.getElementById("createButton");

createJob.addEventListener('click', async (event) => {
    if (headerInputValid === false || descriptionInputValid === false) {
        event.preventDefault();
        console.log("incorrect format");
        return;
    }
})
