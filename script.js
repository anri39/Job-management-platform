// for opening / closing workerMenu
const createWorker = document.getElementById("button1");
const blur = document.querySelector(".blur")
const workeraddMenu = document.querySelector(".workAdd");
const closeworkerMenu = document.querySelector(".close");
const closeButton = document.querySelector(".job-btn1")
const token = "9e6854de-648a-4721-9e28-696233baf82b"
// to load it  if url has openMenu=true
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const openMenu = urlParams.get('openMenu');
    if (openMenu && blur && workeraddMenu) {
        blur.classList.add('active');
        workeraddMenu.style.display = 'flex';
    }
});


createWorker.addEventListener('click' , () =>{
     blur.classList.add("active");
     workeraddMenu.style.display = "flex";
})

closeworkerMenu.addEventListener('click', () =>{
    blur.classList.remove("active");
     workeraddMenu.style.display = "none";
     document.querySelector(".firstInput").value = "";
    document.querySelector(".secondInput").value = "";
    document.getElementById("inputforDepartament").removeAttribute("data-selected-id"); 
    preview.src = defaultImage;
    deleteBtn.style.display = "none";
    imageUpload.value = "";
})

closeButton.addEventListener('click', () =>{
    blur.classList.remove("active");
     workeraddMenu.style.display = "none";
     document.querySelector(".firstInput").value = "";
    document.querySelector(".secondInput").value = "";
    document.getElementById("inputforDepartament").textContent = "";
    preview.src = defaultImage;
    deleteBtn.style.display = "none";
    imageUpload.value = "";
})

/* departament dropdown */
async function fetchDropdownData(type) {
    let url = "";
     if (type === "departament") {
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

async function populateDropdown(type) {
    const dropdownMenu = document.getElementById(`${type}Menu`);   
    dropdownMenu.innerHTML = "";   
    const data = await fetchDropdownData(type);   
    data.forEach(item => {
        const li = document.createElement("li");
        li.setAttribute("data-value", item.id);
        li.textContent = item.name;
        dropdownMenu.appendChild(li);  
        li.addEventListener("click", function () {
            const inputElement = document.getElementById(`inputfor${type.charAt(0).toUpperCase() + type.slice(1)}`);   
             if (type === "departament") {  
                const textElement = inputElement.querySelector("p");
                textElement.textContent = item.name;  
                inputElement.setAttribute("data-selected-id", item.id); 
            }
            dropdownMenu.style.display = "none";   
        });
    });
    dropdownMenu.style.display = "block";   
}
document.getElementById("inputforDepartament").addEventListener("click", () => populateDropdown("departament"));   


// for loading boxes
const statusMap = {
    1: ".started",        // დასაწყები
    2: ".inProgress",     // პროგრესში
    3: ".readyforTesting", // მზად ტესტირებისთვის
    4: ".productFinished" // დასრულებული
  };
  
  async function fetchTasks() {
    try {
        const response = await axios.get("https://momentum.redberryinternship.ge/api/tasks", {
            headers: { "Authorization": `Bearer ${token}` } 
        });

        const tasks = response.data;
        if (!tasks.length) return;

        // clear all task lists
        document.querySelectorAll(".start-boxes").forEach(list => list.innerHTML = "");

        // filter tasks based on selected values
        const filteredTasks = tasks.filter(task => {
            const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(task.department.id.toString());
            const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(task.priority.id.toString());
            const matchesWorker = selectedWorkers.length === 0 || selectedWorkers.includes(task.employee.id.toString());
            return matchesDepartment && matchesPriority && matchesWorker;
        });

        // add filtered tasks to the UI
        filteredTasks.forEach(task => addTaskToUI(task));
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

  

  // format date in georgian
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Georgian month names
    const georgianMonths = [
        "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", 
        "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
    ];

    const day = date.getDate();
    const month = georgianMonths[date.getMonth()];  
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}

const task = {
    due_date: "2025-03-19T20:00:00.000000Z"
};

const formattedDate = formatDate(task.due_date);
  
const priorityColors = {
    "მაღალი": "high-priority",  
    "საშუალო": "medium-priority",  
    "დაბალი": "low-priority"   
};

function addTaskToUI(task) {
  const listSelector = statusMap[task.status.id] || ".started";
  const list = document.querySelector(listSelector);
  if (!list) return;

  const priorityClass = priorityColors[task.priority.name] || "";

  const li = document.createElement("li");
  li.classList.add("li-boxes");
  const description = task.description || "";

  li.innerHTML = `
      <div class="first-part">
          <div class="inside-first">
              <div class="taskPriority ${priorityClass}">
                  <img src="${task.priority.icon}" alt="status-icon" class="status-icon">
                  <p class="priorityOutput font">${task.priority.name}</p>
              </div>
              <p class="departamentOutput font">
                  ${task.department.name.split(" ")[0]} 
                  ${task.department.name.split(" ")[1] ? task.department.name.split(" ")[1].slice(0, 3) : ""}
              </p>
          </div>
          <p class="deadlineOutput font">${formatDate(task.due_date)}</p>
      </div>
      <div class="middle-part">
          <p class="headerOutput font1">${task.name}</p>
          <p class="descriptionOutput font2">${description}</p>
      </div>
      <div class="last-part">
          <img src="${task.employee.avatar}" alt="pfp" class="iconOutput">
          <i class='bx bx-comment commentOutput'>0</i>
      </div>
  `;

  li.addEventListener("click", function () {
      localStorage.setItem("selectedTask", JSON.stringify(task));
      window.location.href = `./Pages/commentPage.html?taskId=${task.id}`; 
  });

  list.appendChild(li);
}

  document.addEventListener("DOMContentLoaded", fetchTasks);
 