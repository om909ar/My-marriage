

const memoryEditor = document.getElementById("memoryEditor");

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
        
        const memory = localStorage.getItem(currentStage + "_memory");

let preview = memory || "لا توجد ذكرى";

if (preview.length > 25) {
    preview = preview.substring(0, 25) + "...";
}

memoryPreview.textContent = preview;

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

    document.getElementById("choosePhotos").hidden = true;
    document.getElementById("chooseMemory").hidden = true;

    memoryEditor.hidden = false;

    const memory = localStorage.getItem(currentStage + "_memory");

memoryInput.value = memory || "";

let preview = memory || "لا توجد ذكرى";

if (preview.length > 25) {
    preview = preview.substring(0, 25) + "...";
}

memoryPreview.textContent = preview;

});

saveMemory.addEventListener("click", () => {

    localStorage.setItem(
        currentStage + "_memory",
        memoryInput.value
    );

    memoryEditor.hidden = true;

    document.getElementById("choosePhotos").hidden = false;
    document.getElementById("chooseMemory").hidden = false;

});