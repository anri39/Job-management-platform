const createJob = document.getElementById("createButton");

// Set default date to always tomorrow
let taskDeadlineInput = document.getElementById("inputforDate");
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);  
let tomorrowDate = tomorrow.toISOString().split('T')[0]; 
taskDeadlineInput.value = tomorrowDate;

createJob.addEventListener("click", async (event) => {
    event.preventDefault(); 

    const headerInputValue = headerInput.value.trim();
    const descriptionInputValue = descriptionInput.value.trim();
    const taskPriority = document.getElementById("inputforPriority");
    const taskStatus = document.getElementById("inputforStatus");
    const taskDepartment = document.getElementById("inputforDepartament");
    const taskWorker = document.getElementById("inputforWorker");
    const taskDeadline = document.getElementById("inputforDate").value;

    // Validation for header
    if (!headerInputValid) {
        alert("Please enter a valid job title (3 to 255 characters).");
        return;
    }

    // Validation for description 
    if (descriptionInputValue && (descriptionInputValue.length < 4 || descriptionInputValue.length > 255)) {
        alert("Please enter a valid job description (4 to 255 characters).");
        return;
    }

    // Validation for date 
    const currentDate = new Date().toISOString().split('T')[0]; 
    if (taskDeadline < currentDate) {
        alert("The selected date cannot be behind the current date.");
        return;
    }

    const selectedPriority = taskPriority.getAttribute("data-selected-id");
    const selectedStatus = taskStatus.getAttribute("data-selected-id");
    const selectedDepartment = taskDepartment.getAttribute("data-selected-id");
    const selectedWorker = taskWorker.getAttribute("data-selected-id");

    // Validation for dropdowns
    if (!selectedPriority || !selectedStatus || !selectedDepartment || !selectedWorker) {
        alert("Please select all required fields before creating a job.");
        return;
    }

    let jobInfo;

    if (!descriptionInputValue) {
        jobInfo = {
            name: headerInputValue,
            due_date: taskDeadline,
            status_id: Number(selectedStatus),
            employee_id: Number(selectedWorker),
            priority_id: Number(selectedPriority),
            department_id: Number(selectedDepartment)
        }; 
    } else {
        jobInfo = {
            name: headerInputValue,
            description: descriptionInputValue,
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
                "Authorization": `Bearer 9e7c1e7d-95dd-4847-941f-21b247bf390e` // token
            }
        });
        window.location.href = "../index.html";
    } catch (error) {
        console.error(error.response ? error.response.data : error);
        alert("Failed to create a job. Check inputs and try again.");
    }
});