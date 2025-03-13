const taskTitle = document.getElementById("inputforHeader");
const taskDescription = document.getElementById("inputforDescription");
const taskPriority = document.getElementById("inputforPriority");
const taskStatus = document.getElementById("inputforStatus");
const taskDepartment = document.getElementById("inputforDepartament");
const taskWorker = document.getElementById("inputforWorker");
const taskDeadline = document.getElementById("inputforDate");


// drop-down start
document.getElementById("inputforPriority").addEventListener("click", () => {
    document.getElementById("priorityDropdown").style.display = "block";
});

document.querySelectorAll("#priorityDropdown li").forEach(item => {
    item.addEventListener("click",  () => {
        document.getElementById("priorityText").textContent = this.textContent;
        document.getElementById("priorityDropdown").style.display = "none";
    });
});

document.addEventListener("click",  event => {
    if (!document.querySelector(".custom-dropdown").contains(event.target)) {
        document.getElementById("priorityDropdown").style.display = "none";
    }
});
// drop-down end