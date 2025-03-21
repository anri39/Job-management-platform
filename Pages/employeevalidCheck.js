const createWorkerButton = document.querySelector(".job-btn2");
/*here for setting default img upon load*/
const imageUpload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const deleteBtn = document.getElementById("deleteImage");

const defaultImage = "/bootCampProject/Decals/Frame 1000005909.png";
preview.src = defaultImage;

preview.addEventListener("click", function() {
    imageUpload.click();
});

imageUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            deleteBtn.style.display = "flex";
        };
        reader.readAsDataURL(file);
    }
});

deleteBtn.addEventListener("click", function() {
    preview.src = defaultImage; 
    deleteBtn.style.display = "none";
    imageUpload.value = "";
});


// submit and validation
createWorkerButton.addEventListener("click", async (event) => {
    if (headerInputValid === false || descriptionInputValid === false) {
        event.preventDefault();
        console.log("incorrect format");
        return;
    }

    const workerName = document.querySelector(".firstInput").value.trim();
    const workerLastName = document.querySelector(".secondInput").value.trim();
    const avatarFile = document.getElementById("imageUpload").files[0];

    const selectedDepartment = document.getElementById("inputforDepartament").getAttribute("data-selected-id");
    if (!selectedDepartment) {
        alert("Please select a department.");
        return;
    }

    if (!avatarFile) {
        alert("Please upload ur image");
        return;
    }

    const formData = new FormData(); // make form to send info
    formData.append("name", workerName);
    formData.append("surname", workerLastName);
    formData.append("department_id", Number(selectedDepartment));
    formData.append("avatar", avatarFile, avatarFile.name); 
    
    try {
        const response = await axios.post("https://momentum.redberryinternship.ge/api/employees", formData, { 
            headers: { 
                "Content-Type": "multipart/form-data",  
                 "Authorization": `Bearer 9e7c0f2f-466e-4928-ab6e-d392912b01e1` // token
            }
        });
        console.log("Success:", response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
        } else {
            console.error("Error:", error);
        }
    }

    blur.classList.remove("active");
    workeraddMenu.style.display = "none";
});
