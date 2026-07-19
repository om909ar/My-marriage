const dateInput = document.getElementById("dateInput");

const chooseDate = document.getElementById("chooseDate");

let currentStage = "";

const stages = document.querySelectorAll(".stage");

const bottomSheet = document.getElementById("bottomSheet");
const overlay = document.getElementById("overlay");

const closeSheet = document.getElementById("closeSheet");

const sheetTitle = document.getElementById("sheetTitle");

stages.forEach(stage => {

    stage.addEventListener("click", () => {
        currentStage = stage.id;

        sheetTitle.textContent =
            stage.querySelector("span").textContent;

        bottomSheet.classList.add("show");
        overlay.classList.add("show");

    });

});

closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);

function closeBottomSheet(){

    bottomSheet.classList.remove("show");
    overlay.classList.remove("show");

}

dateInput.addEventListener("change", () => {

    saveStageDate(currentStage, dateInput.value);

    document.getElementById(currentStage + "Date").textContent =
        dateInput.value;

});
