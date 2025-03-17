const headerInput = document.querySelector(".firstInput");
const descriptionInput = document.querySelector(".secondInput");
const requirementA = document.querySelectorAll(".requirementA");
const requirementB = document.querySelectorAll(".requirementB");
let headerInputValid = false;
let descriptionInputValid = false;

headerInput.addEventListener("input", () => {
    if (headerInput.value.trim().length >= 2 && headerInput.value.trim().length <= 255) {
        requirementA.forEach((element) => {
            element.style.color = "green";
        });
        headerInputValid = true;
    } else {
        requirementA.forEach((element) => {
            element.style.color = "#6C757D";
        });
        headerInputValid = false;
    }
});
descriptionInput.addEventListener("input", () => {
    if (descriptionInput.value.trim().length >= 2 && descriptionInput.value.trim().length <= 255) {
        requirementB.forEach((element) => {
            element.style.color = "green";
        });
        descriptionInputValid = true;
    } else {
        requirementB.forEach((element) => {
            element.style.color = "#6C757D";
        });
        descriptionInputValid = false;
    }
});