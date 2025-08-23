const depHeader = document.querySelector(".p-dep");
const prioHeader = document.querySelector(".p-prio");
const workHeader = document.querySelector(".p-work");
const depHeaderIcon = document.querySelector(".p-dep-icon");
const prioHeaderIcon = document.querySelector(".p-prio-icon");
const workHeaderIcon = document.querySelector(".p-work-icon");

// Store selected filter values
let selectedDepartments = [];
let selectedPriorities = [];
let selectedWorkers = [];

document.addEventListener("DOMContentLoaded", function () {
    setupDropdown("dmenu", "dmenuList", depHeader, depHeaderIcon, "https://momentum.redberryinternship.ge/api/departments", "department");
    setupDropdown("wmenu", "wmenuList", workHeader, workHeaderIcon, "https://momentum.redberryinternship.ge/api/employees", "worker");
    setupDropdown("pmenu", "pmenuList", prioHeader, prioHeaderIcon, "https://momentum.redberryinternship.ge/api/priorities", "priority");

    fetchTasks();
});

function setupDropdown(menuId, listId, header, icon, apiUrl, filterType) {
    const menu = document.getElementById(menuId);
    const dropdown = document.getElementById(listId);

    menu.addEventListener("click", function () {
        dropdown.style.display = "block";
        header.classList.add("p-first");
        icon.src = "../Decals/purpleIcon.png";

        if (dropdown.innerHTML.trim() === "") {
            axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer 9e7c1e7d-95dd-4847-941f-21b247bf390e`
                }
            })
            .then(response => {
                dropdown.innerHTML = "";

                response.data.forEach(item => {
                    let listItem = document.createElement("li");
                    listItem.style.display = "flex";
                    listItem.style.alignItems = "center";
                    listItem.style.gap = "10px";
                    listItem.style.padding = "8px";
                    listItem.classList.add("listItem");

                    let checkbox = document.createElement("input");
                    checkbox.classList.add("checkbox");
                    checkbox.type = "checkbox";
                    checkbox.id = `item-${item.id}`;
                    checkbox.value = item.id;

                    // event listener to handle single selection for workers
                    if (filterType === "worker") {
                        checkbox.addEventListener("change", function () {
                            if (this.checked) {
                                // uncheck all other checkboxes
                                Array.from(dropdown.querySelectorAll("input[type='checkbox']")).forEach(otherCheckbox => {
                                    if (otherCheckbox !== this) {
                                        otherCheckbox.checked = false;
                                    }
                                });
                            }
                        });
                    }

                    let label = document.createElement("label");
                    label.htmlFor = `item-${item.id}`;
                    label.textContent = item.name;
                    label.style.flexGrow = "1";

                    if (filterType === "worker") {
                        let avatarUrl = item.avatar && item.avatar.trim() !== "" ? item.avatar : "../Decals/default-avatar.png";
                        let iconImg = document.createElement("img");
                        iconImg.src = avatarUrl;
                        iconImg.alt = "Employee Avatar";
                        iconImg.style.width = "30px";
                        iconImg.style.height = "30px";
                        iconImg.style.borderRadius = "50%";

                        listItem.appendChild(checkbox);
                        listItem.appendChild(iconImg);
                        listItem.appendChild(label);
                    } else {
                        listItem.appendChild(checkbox);
                        listItem.appendChild(label);
                    }

                    dropdown.appendChild(listItem);
                });

                let dropdownButton = document.createElement("button");
                dropdownButton.textContent = "არჩევა";
                dropdownButton.style.marginTop = "10px";
                dropdownButton.classList.add("dropdownButton");
                dropdown.appendChild(dropdownButton);

                dropdownButton.addEventListener("click", function () {
                    const selectedItems = Array.from(dropdown.querySelectorAll("input[type='checkbox']:checked")).map(checkbox => checkbox.value);

                    // Update the selected filter values
                    if (filterType === "department") {
                        selectedDepartments = selectedItems;
                    } else if (filterType === "priority") {
                        selectedPriorities = selectedItems;
                    } else if (filterType === "worker") {
                        selectedWorkers = selectedItems;
                    }

                    // Close the dropdown
                    dropdown.style.display = "none";
                    header.classList.remove("p-first");
                    icon.src = "../Decals/Icon.png";

                    fetchTasks();
                });
            })
            .catch(error => {
                console.error(error);
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
            header.classList.remove("p-first");
            icon.src = "../Decals/Icon.png";
        }
    });
}
