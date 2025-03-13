const taskTitleElement = document.getElementById("inputforHeader");
const taskDescriptionElement = document.getElementById("inputforDescription");
const taskPriorityElement = document.getElementById("inputforPriority");
const taskStatusElement = document.getElementById("inputforStatus");
const taskDepartmentElement = document.getElementById("inputforDepartament");
const taskWorkerElement = document.getElementById("inputforWorker");
const taskDeadlineElement = document.getElementById("inputforDate");

function getUserInfo() {
    const userInfo = {
        task_title: taskTitleElement.value, 
        task_description: taskDescriptionElement.value, 
        task_priority: taskPriorityElement.innerText.trim(),
        task_status: taskStatusElement.innerText.trim(),
        task_department: taskDepartmentElement.innerText.trim(),
        task_worker: taskWorkerElement.innerText.trim(),
        task_deadline: taskDeadlineElement.value
    };

    console.log(userInfo);
}

document.getElementById("createButton").addEventListener("click", () => {
    getUserInfo(); 
});
