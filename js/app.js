const dateInput = document.getElementById("dateInput");

let currentStage = "";

const stages = document.querySelectorAll(".stage");

const bottomSheet = document.getElementById("bottomSheet");
const overlay = document.getElementById("overlay");
const closeSheet = document.getElementById("closeSheet");
const sheetTitle = document.getElementById("sheetTitle");
const choosePhotos = document.getElementById("choosePhotos");

// عرض التواريخ عند فتح التطبيق
// updateStageDates();

// الضغط على أي مرحلة
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

    if (!currentStage) return;

    const data = getStages();

    data[currentStage] = dateInput.value;

    saveStages(data);

    updateStageDates();

});

// فتح صفحة الصورة
choosePhotos.addEventListener("click", () => {

    if (!currentStage) return;

    sessionStorage.setItem("currentStage", currentStage);

    window.location.href = "photo.html";

});

// إغلاق النافذة
closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);

function closeBottomSheet() {

    bottomSheet.classList.remove("show");
    overlay.classList.remove("show");

}

const addStage = document.getElementById("addStage");
const stagesList = document.getElementById("stagesList");

addStage.addEventListener("click", () => {

    const stage = document.createElement("div");

    stage.className = "stage";

    stage.innerHTML = `
        <span>📝 مرحلة جديدة</span>
        <span>—</span>
    `;

    stagesList.appendChild(stage);

});
