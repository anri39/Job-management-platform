let selectedDepartmentId = null;
const workerInput = document.getElementById("inputforWorker");
const departmentInput = document.getElementById("inputforDepartament");
workerInput.style.pointerEvents = "none";
workerInput.style.backgroundColor = "#e0e0e0";
workerInput.style.color = "#6c757d";


// until dep is chosen you can't select employee
document.getElementById("departamentMenu").addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const selectedDepartment = event.target.textContent;
        selectedDepartmentId = event.target.getAttribute("data-value"); 
        departmentInput.querySelector("p").textContent = selectedDepartment;

        workerInput.style.pointerEvents = "auto";
        workerInput.style.backgroundColor = "#ffffff";
        workerInput.style.color = "#212529";
        document.querySelector(".disabled-text").style.color = "#343A40";

        // Clear the worker input when department is switched
        workerInput.querySelector("p").textContent = "";
        workerInput.setAttribute("data-selected-id", "");
    }
});

// fetch data depending on dropdown type
async function fetchDropdownData(type) {
    let url = "";

    if (type === "priority") {
        url = "https://momentum.redberryinternship.ge/api/priorities";
    } else if (type === "status") {
        url = "https://momentum.redberryinternship.ge/api/statuses";
    } else if (type === "departament") {
        url = "https://momentum.redberryinternship.ge/api/departments";  
    } else if (type === "worker") {  
        url = "https://momentum.redberryinternship.ge/api/employees";
    }

    try {
        const response = await axios.get(url, {
            headers: { 
                "Authorization" : `Bearer 9e6854de-648a-4721-9e28-696233baf82b`,
                "Content-Type": "application/json"
            }
        });
        return response.data;   
    } catch (error) {
        console.error(error);   
        return [];  
    }
}

// populate dropdowns depending on type and depID
async function populateDropdown(type, departmentId = null) {
    const dropdownMenu = document.getElementById(`${type}Menu`);   
    dropdownMenu.innerHTML = ""; 

    let data = [];
    if (type === "worker" && departmentId) {
        data = await fetchWorkersByDepartment(departmentId);
    } else {
        data = await fetchDropdownData(type);
    }

    if (type === "worker" && departmentId) {
        const filteredData = data.filter(item => {
            const workerDeptId = String(item.department.id);
            const selectedDeptId = String(departmentId);
            return workerDeptId === selectedDeptId;
        });

        filteredData.forEach(item => {
            const li = createDropdownItem(type, item, dropdownMenu);
            dropdownMenu.appendChild(li);
        });
    } else {
        data.forEach(item => {
            const li = createDropdownItem(type, item, dropdownMenu);
            dropdownMenu.appendChild(li);
        });
    }

    dropdownMenu.style.display = "block";   
}

async function fetchWorkersByDepartment(departmentId) {
    const url = `https://momentum.redberryinternship.ge/api/employees?department_id=${departmentId}`;
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer 9e6854de-648a-4721-9e28-696233baf82b`,
                "Content-Type": "application/json"
            }
        });
        return response.data; 
    } catch (error) {
        console.error("error fetching worker:", error);
        return [];
    }
}

// create items
function createDropdownItem(type, item, dropdownMenu) {
    const li = document.createElement("li");
    li.setAttribute("data-value", item.id); 

    if (type === "departament") {
        li.textContent = item.name; 
    } else if (type === "worker") {
        const workerContainer = document.createElement("div");
        workerContainer.style.display = "flex";
        workerContainer.style.alignItems = "center";
        workerContainer.style.gap = "10px";

        if (item.avatar) {
            const img = document.createElement("img");
            img.src = item.avatar; 
            img.alt = `${item.name} ${item.surname}`;
            img.style.width = "30px";
            img.style.height = "30px";
            img.style.borderRadius = "50%"; 
            workerContainer.appendChild(img);
        }

        const nameText = document.createElement("span");
        nameText.textContent = `${item.name} ${item.surname}`;
        workerContainer.appendChild(nameText);

        li.appendChild(workerContainer);
    } else {
        li.textContent = item.name; 
    }

    // to replace input field with whatever you click
    li.addEventListener("click", function () {
        const inputElement = document.getElementById(`inputfor${type.charAt(0).toUpperCase() + type.slice(1)}`);  
        if (inputElement) {
            inputElement.setAttribute("data-selected-id", item.id);  

            if (type === "priority") {
                const priorityImg = inputElement.querySelector("img:first-of-type");
                if (priorityImg) {
                    priorityImg.src = item.icon;   
                    priorityImg.alt = item.name;
                }
                const textElement = inputElement.querySelector("p");
                textElement.textContent = item.name;  
            } else if (type === "status") {
                const textElement = inputElement.querySelector(".statusText");
                textElement.textContent = item.name;  
            } else if (type === "departament") {  
                const textElement = inputElement.querySelector("p");
                textElement.textContent = item.name;  
            } else if (type === "worker") {
                const textElement = inputElement.querySelector("p");
                textElement.textContent = `${item.name} ${item.surname}`; 
            }

            dropdownMenu.style.display = "none"; 
        }
    });

    return li;
}

// event listeners for dropdowns
document.getElementById("inputforPriority").addEventListener("click", () => populateDropdown("priority"));
document.getElementById("inputforStatus").addEventListener("click", () => populateDropdown("status"));
document.getElementById("inputforDepartament").addEventListener("click", () => populateDropdown("departament"));

document.getElementById("inputforWorker").addEventListener("click", () => {
    if (selectedDepartmentId) {
        populateDropdown("worker", selectedDepartmentId);
    }
});

// to close when clicking outside the box
document.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown-menu").forEach(dropdown => {
        if (!dropdown.contains(event.target) && !event.target.classList.contains("input")) {
            dropdown.style.display = "none";
        }
    });
});

// to move to index.html when create employe is clicked
const button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
    window.location.href = "../index.html?openMenu=true";
});