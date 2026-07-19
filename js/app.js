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

// فتح الـ Bottom Sheet
stages.forEach(stage => {

    stage.addEventListener("click", () => {

        currentStage = stage.id;

        sheetTitle.textContent =
            stage.querySelector("span").textContent;

        const data = getStages();

        dateInput.value = data[currentStage] || "";

        // إعادة واجهة الذكرى لوضعها الطبيعي
        memoryEditor.hidden = true;
        choosePhotos.hidden = false;
        chooseMemory.hidden = false;

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

// فتح محرر الذكرى
chooseMemory.addEventListener("click", () => {

    choosePhotos.hidden = true;
    chooseMemory.hidden = true;

    memoryEditor.hidden = false;

    const memory =
        localStorage.getItem(currentStage + "_memory");

    memoryInput.value = memory || "";

});

// حفظ الذكرى
saveMemory.addEventListener("click", () => {

    localStorage.setItem(
        currentStage + "_memory",
        memoryInput.value
    );

    memoryEditor.hidden = true;

    choosePhotos.hidden = false;
    chooseMemory.hidden = false;

});

// إغلاق الـ Bottom Sheet
closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);

function closeBottomSheet() {

    bottomSheet.classList.remove("show");
    overlay.classList.remove("show");

    // إعادة الواجهة للوضع الطبيعي
    memoryEditor.hidden = true;
    choosePhotos.hidden = false;
    chooseMemory.hidden = false;

}