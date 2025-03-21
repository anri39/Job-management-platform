const headerInput = document.querySelector(".firstInput");
const descriptionInput = document.querySelector(".secondInput");
const requirementA = document.querySelectorAll(".requirementA");
const requirementB = document.querySelectorAll(".requirementB");
let headerInputValid = false;
let descriptionInputValid = false;

headerInput.addEventListener("input", () => {
    const headerValue = headerInput.value.trim();
    if (headerValue.length >= 3 && headerValue.length <= 255) {
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
    const descriptionValue = descriptionInput.value.trim();
    if (descriptionValue.length >= 4 && descriptionValue.length <= 255) {
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

