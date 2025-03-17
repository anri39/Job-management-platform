
// for opening / closing workerMenu
const createWorker = document.getElementById("button1");
const blur = document.querySelector(".blur")
const workeraddMenu = document.querySelector(".workAdd");
const closeworkerMenu = document.querySelector(".close");
const closeButton = document.querySelector(".job-btn1")

createWorker.addEventListener('click' , () =>{
     blur.classList.add("active");
     workeraddMenu.style.display = "flex";
})

closeworkerMenu.addEventListener('click', () =>{
    blur.classList.remove("active");
     workeraddMenu.style.display = "none";
})

closeButton.addEventListener('click', () =>{
    blur.classList.remove("active");
     workeraddMenu.style.display = "none";
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
