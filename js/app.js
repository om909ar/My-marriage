const chooseMemory = document.getElementById("chooseMemory");

const memoryInput = document.getElementById("memoryInput");

const saveMemory = document.getElementById("saveMemory");

const dateInput = document.getElementById("dateInput");

let currentStage = "";

const stages = document.querySelectorAll(".stage");

const bottomSheet = document.getElementById("bottomSheet");
const overlay = document.getElementById("overlay");
const closeSheet = document.getElementById("closeSheet");
const sheetTitle = document.getElementById("sheetTitle");

const choosePhotos = document.getElementById("choosePhotos");

// عرض التواريخ
updateStageDates();

// فتح القائمة
stages.forEach(stage => {

    stage.addEventListener("click", () => {

        currentStage = stage.id;

        sheetTitle.textContent =
            stage.querySelector("span").textContent;

        const data = getStages();

        dateInput.value = data[currentStage] || "";

        bottomSheet.classList.add("show");
        overlay.classList.add("show");

    });

});

// حفظ التاريخ
dateInput.addEventListener("change", () => {

    const data = getStages();

    data[currentStage] = dateInput.value;

    saveStages(data);

    updateStageDates();

});

// فتح صفحة الصورة
choosePhotos.addEventListener("click", () => {

    sessionStorage.setItem("currentStage", currentStage);

    window.location.href = "photo.html";

});

closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);

function closeBottomSheet() {

    bottomSheet.classList.remove("show");
    overlay.classList.remove("show");

}

chooseMemory.addEventListener("click", () => {

    memoryInput.hidden = false;

    saveMemory.hidden = false;

    const memory =
        localStorage.getItem(currentStage + "_memory");

    memoryInput.value = memory || "";

});

saveMemory.addEventListener("click", () => {

    localStorage.setItem(
        currentStage + "_memory",
        memoryInput.value
    );

    alert("تم حفظ الذكرى ❤️");

});