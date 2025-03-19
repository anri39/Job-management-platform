const depHeader = document.querySelector(".p-dep");
const prioHeader = document.querySelector(".p-prio");
const workHeader = document.querySelector(".p-work");
const depHeaderIcon = document.querySelector(".p-dep-icon");
const prioHeaderIcon = document.querySelector(".p-prio-icon");
const workHeaderIcon = document.querySelector(".p-work-icon");

document.addEventListener("DOMContentLoaded", function () {
    setupDropdown("dmenu", "dmenuList", depHeader, depHeaderIcon, "https://momentum.redberryinternship.ge/api/departments");
    setupDropdown("wmenu", "wmenuList", workHeader, workHeaderIcon, "https://momentum.redberryinternship.ge/api/employees");
    setupDropdown("pmenu", "pmenuList", prioHeader, prioHeaderIcon, "https://momentum.redberryinternship.ge/api/priorities");
});

function setupDropdown(menuId, listId, header, icon, apiUrl) {
    const menu = document.getElementById(menuId);
    const dropdown = document.getElementById(listId);

    menu.addEventListener("click", function () {
        dropdown.style.display = "block";
        header.classList.add("p-first");
        icon.src = "/bootCampProject/Decals/purpleIcon.png";

        if (dropdown.innerHTML.trim() === "") {
            axios.get(apiUrl, {
                headers: {
                    Authorization: 'Bearer ' // TOKEN
                }
            })
            .then(response => {
                dropdown.innerHTML = "";

                response.data.forEach(item => {
                    let listItem = document.createElement("li"); // create list Elements
                    listItem.style.display = "flex";
                    listItem.style.alignItems = "center";
                    listItem.style.gap = "10px";  
                    listItem.style.padding = "8px";
                    listItem.classList.add("listItem");

                    let checkbox = document.createElement("input"); // create checkboxes
                    checkbox.classList.add("checkbox");
                    checkbox.type = "checkbox";
                    checkbox.id = `item-${item.id}`;
                    checkbox.value = item.id;

                    let label = document.createElement("label"); // create labels
                    label.htmlFor = `item-${item.id}`;
                    label.textContent = item.name;
                    label.style.flexGrow = "1"; 

                    if (menuId === "wmenu") {
                        let avatarUrl = item.avatar && item.avatar.trim() !== "" ? item.avatar : "/bootCampProject/Decals/default-avatar.png";  
                        let iconImg = document.createElement("img");
                        iconImg.src = avatarUrl;
                        iconImg.alt = "Employee Avatar";
                        iconImg.style.width = "30px";  
                        iconImg.style.height = "30px";
                        iconImg.style.borderRadius = "50%";

                        listItem.appendChild(checkbox); // appending here
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
            })
            .catch(error => {
                console.error(error);
            });
        }
    });

    // TO CLOSE WHEN CLICKING OUTSIDE
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
            header.classList.remove("p-first");
            icon.src = "/bootCampProject/Decals/Icon.png";
        }
    });
}
