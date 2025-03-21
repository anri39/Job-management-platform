function getTaskIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("taskId");  
}

function shortenDepartmentName(departmentName) {
    let words = departmentName.split(" ");
    if (words.length > 1) {
        return `${words[0]} ${words[1].slice(0, 3)}`;
    }
    return words[0];
}

document.addEventListener("DOMContentLoaded", function () {
    const taskData = JSON.parse(localStorage.getItem("selectedTask"));

    if (!taskData) {
        console.error("no id found");
        return;
    }

    const priorityColors = {
        "მაღალი": "high-priority",
        "საშუალო": "medium-priority",
        "დაბალი": "low-priority"
    };

    document.querySelector(".priorityOutput").textContent = taskData.priority.name;
    document.querySelector(".departamentOutput").textContent = shortenDepartmentName(taskData.department.name);
    document.querySelector(".headerOutput").textContent = taskData.name;
    document.querySelector(".departamentName").textContent = shortenDepartmentName(taskData.department.name);
    document.querySelector(".descriptionOutput").textContent = taskData.description;
    document.querySelector(".workerIcon").src = taskData.employee.avatar;
    document.querySelector(".workerName").textContent = taskData.employee.name;
    document.querySelector(".deadlineText").textContent = formatDate(taskData.due_date);

    const priorityElement = document.querySelector(".taskPriority");
    priorityElement.classList.add(priorityColors[taskData.priority.name]);

    const statusElement = document.querySelector(".statusDropdown p");
    statusElement.textContent = taskData.status.name;
    statusElement.setAttribute("data-selected-id", taskData.status.id);

    const commentInput = document.querySelector(".commentArea");
    const submitCommentButton = document.getElementById("commentButton");
    const commentsList = document.querySelector(".writtenComments");
    const commentAmount = document.querySelector(".count");

    function updateCommentCount() {
        const commentaries = document.querySelectorAll('.commentary');   
        commentAmount.textContent = commentaries.length;  
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const georgianMonths = [
            "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", 
            "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
        ];
        return `${date.getDate()} ${georgianMonths[date.getMonth()]}, ${date.getFullYear()}`;
    }

    submitCommentButton.addEventListener("click", async function () {
        const commentText = commentInput.value.trim();
        if (!commentText) {
            alert("Comment cannot be empty");
            return;
        }

        const taskId = getTaskIdFromUrl();
        if (!taskId) {
            console.error("no id found");
            return;
        }

        try {
            const response = await axios.post(
                `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
                { text: commentText },
                {
                    headers: {
                        "Authorization": `Bearer 9e6854de-648a-4721-9e28-696233baf82b`,
                        "Content-Type": "application/json"
                    }
                }
            );
            commentInput.value = "";   
            addCommentToUI(response.data);
        } catch (error) {
            console.error("error submitting", error);
        }
    });

    async function fetchAndDisplayComments() {
        const taskId = getTaskIdFromUrl();
        if (!taskId) return;

        try {
            const response = await axios.get(
                `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
                {
                    headers: {
                        "Authorization": `Bearer 9e6854de-648a-4721-9e28-696233baf82b`,
                        "Content-Type": "application/json"
                    }
                }
            );
            displayComments(response.data);
        } catch (error) {
            console.error("error getting comments", error);
        }
    }

    function displayComments(comments) {
        commentsList.innerHTML = "";

        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("commentary");

            const authorPfp = document.createElement("img");
            authorPfp.classList.add("commentAuthorPfp");
            authorPfp.src = "/bootCampProject/Decals/Frame 1000005909.png"; 

            const commentTextContainer = document.createElement("div");
            commentTextContainer.classList.add("comment-text");

            const commentName = document.createElement("p");
            commentName.classList.add("commentName");
            commentName.textContent = "ემილია მორგანი";

            const commentText = document.createElement("p");
            commentText.classList.add("comment");
            commentText.textContent = comment.text;  

            commentTextContainer.appendChild(commentName);
            commentTextContainer.appendChild(commentText);
            commentElement.appendChild(authorPfp);
            commentElement.appendChild(commentTextContainer);

            commentsList.appendChild(commentElement);  
        });
    }

    function addCommentToUI(comment) {
        const commentElement = document.createElement("div");
        commentElement.classList.add('commentary');  
        commentElement.innerHTML = `
            <img src="/bootCampProject/Decals/Frame 1000005909.png" alt="" class="commentAuthorPfp">
            <div class="comment-text">
                <p class="commentName">ემილია მორგანი</p>
                <p class="comment">${comment.text}</p>
            </div>
        `;
        commentsList.appendChild(commentElement);  
        updateCommentCount();  
    }

    // Dropdown functionality
    async function fetchDropdownData(type) {
        let url = "";

        if (type === "status") {
            url = "https://momentum.redberryinternship.ge/api/statuses";
        }

        try {
            const response = await axios.get(url, {
                headers: { 
                    "Authorization": `Bearer 9e6854de-648a-4721-9e28-696233baf82b`, 
                    "Content-Type": "application/json"
                }
            });
            return response.data;   
        } catch (error) {
            console.error(error);   
            return [];  
        }
    }

    async function updateStatus(statusId) {
        const taskId = getTaskIdFromUrl(); 
        const url = `https://momentum.redberryinternship.ge/api/tasks/${taskId}`;

        try {
            const response = await axios.put(url, 
                { status_id: statusId }, 
                {
                    headers: {
                        "Authorization": `Bearer 9e6854de-648a-4721-9e28-696233baf82b}`, 
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Status updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating status:", error);
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

            li.addEventListener("click", async function () {
                const inputElement = document.querySelector(".statusDropdown p");
                if (inputElement) {
                    inputElement.textContent = item.name;  
                    inputElement.setAttribute("data-selected-id", item.id);
                    
                    await updateStatus(item.id);

                    dropdownMenu.style.display = "none"; 
                }
            });
        });

        dropdownMenu.style.display = "flex";   
    }

    document.querySelector(".statusDropdown").addEventListener("click", (event) => {
        event.stopPropagation(); 
        populateDropdown("status");
    });

    document.addEventListener("click", function(event) {
        const dropdownMenu = document.getElementById('statusMenu');
        const statusDropdown = document.querySelector('.statusDropdown');
        
        if (!statusDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";  
        }
    });

    updateCommentCount();
    fetchAndDisplayComments();
});