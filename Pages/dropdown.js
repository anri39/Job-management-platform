/* to have workers selection disabled until dep is chosen */

const workerInput = document.getElementById("inputforWorker");
const departmentInput = document.getElementById("inputforDepartament");
workerInput.style.pointerEvents = "none";
workerInput.style.backgroundColor = "#e0e0e0";
workerInput.style.color = "#6c757d";
document.getElementById("departamentMenu").addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const selectedDepartment = event.target.textContent;
        departmentInput.querySelector("p").textContent = selectedDepartment;
        workerInput.style.pointerEvents = "auto";
        workerInput.style.backgroundColor = "#ffffff"; 
        workerInput.style.color = "#212529"; 
        document.querySelector(".disabled-text").style.color = "#343A40"
    }
});

 
 
 
 
 /* collect data from api and store it  */
 async function fetchDropdownData(type) {
    let url = "";

    if (type === "priority") {
        url = "https://momentum.redberryinternship.ge/api/priorities";
    } else if (type === "status") {
        url = "https://momentum.redberryinternship.ge/api/statuses";
    } else if (type === "departament") {
        url = "https://momentum.redberryinternship.ge/api/departments";  
    }

    try {
        const response = await axios.get(url);  
        return response.data;   
    } catch (error) {
        console.error(error);   
        return [];  
    }
}


/* wait for answer*/
async function populateDropdown(type) {
    const dropdownMenu = document.getElementById(`${type}Menu`);   
    dropdownMenu.innerHTML = "";   

    const data = await fetchDropdownData(type);   

    data.forEach(item => {
        const li = document.createElement("li");
        li.setAttribute("data-value", item.id);
        li.textContent = item.name;

        if (type === "priority" && item.icon) {
            const img = document.createElement("img");
            img.src = item.icon;
            img.alt = item.name;
            img.style.marginRight = "10px";  
            li.innerHTML = "";  
            li.appendChild(img);  
            li.appendChild(document.createTextNode(item.name));  
        }

        dropdownMenu.appendChild(li);  

         
        li.addEventListener("click", function () {
            const inputElement = document.getElementById(`inputfor${type.charAt(0).toUpperCase() + type.slice(1)}`);  

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
            }

            dropdownMenu.style.display = "none";   
        });
    });

    dropdownMenu.style.display = "block";   
}

// Event listeners for dropdownmenus
document.getElementById("inputforPriority").addEventListener("click", () => populateDropdown("priority"));
document.getElementById("inputforStatus").addEventListener("click", () => populateDropdown("status"));
document.getElementById("inputforDepartament").addEventListener("click", () => populateDropdown("departament"));   

// for closing when clicking outside box
document.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown-menu").forEach(dropdown => {
        if (!dropdown.contains(event.target) && !event.target.classList.contains("input")) {
            dropdown.style.display = "none";
        }
    });
});
