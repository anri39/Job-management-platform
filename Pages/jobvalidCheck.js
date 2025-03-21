const token = "9e6854de-648a-4721-9e28-696233baf82b"
const createJob = document.getElementById("createButton");

// to set default date to always tommorow
let taskDeadlineInput = document.getElementById("inputforDate");
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);  
let tomorrowDate = tomorrow.toISOString().split('T')[0]; 
taskDeadlineInput.value = tomorrowDate;


createJob.addEventListener("click", async (event) => {
    const headerInput = document.querySelector(".firstInput").value.trim();
    const descriptionInput = document.querySelector(".secondInput").value.trim();
    const taskPriority = document.getElementById("inputforPriority");
    const taskStatus = document.getElementById("inputforStatus");
    const taskDepartment = document.getElementById("inputforDepartament");
    const taskWorker = document.getElementById("inputforWorker");
    const taskDeadline = document.getElementById("inputforDate").value;

    if (!headerInput) {
        alert("Please enter a valid job title and description.");
        event.preventDefault();
        return;
    }

    const selectedPriority = taskPriority.getAttribute("data-selected-id");
    const selectedStatus = taskStatus.getAttribute("data-selected-id");
    const selectedDepartment = taskDepartment.getAttribute("data-selected-id");
    const selectedWorker = taskWorker.getAttribute("data-selected-id");

    // Validation checks
    if (!selectedPriority || !selectedStatus || !selectedDepartment || !selectedWorker) {
        alert("Please select all required fields before creating a job.");
        return;
    }

    let jobInfo;

    if (!descriptionInput) {
        jobInfo = {
            name: headerInput,
            due_date: taskDeadline,
            status_id: Number(selectedStatus),
            employee_id: Number(selectedWorker),
            priority_id: Number(selectedPriority),
            department_id: Number(selectedDepartment)
        }; 
    } else {
        jobInfo = {
            name: headerInput,
            description: descriptionInput,
            due_date: taskDeadline,
            status_id: Number(selectedStatus),
            employee_id: Number(selectedWorker),
            priority_id: Number(selectedPriority),
            department_id: Number(selectedDepartment)
        };
    }
  
    try {
        const response = await axios.post("https://momentum.redberryinternship.ge/api/tasks", jobInfo, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // token
            }
        });
        window.location.href = "/bootCampProject/index.html";
    } catch (error) {
        console.error(error.response ? error.response.data : error);
        alert("failed to create a job check inputs and try again");
    }
});
