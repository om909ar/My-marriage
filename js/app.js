const stagesList = document.getElementById("stagesList");
const addStage = document.getElementById("addStage");
const dateInput = document.getElementById("dateInput");
// عرض المراحل المحفوظة
loadStages();

// =====================
// تحميل المراحل
// =====================

function loadStages() {

    stagesList.innerHTML = "";

    const stages = getStages();

    stages.forEach((item, index) => {

        const stage = document.createElement("div");

        stage.className = "stage";

        stage.dataset.index = index;

        stage.innerHTML = `
            <span>${item.name}</span>
            <span>${item.date || "—"}</span>
        `;

stage.addEventListener("click", () => {

    currentStage = index;

dateInput.value = item.date || "";

    sheetTitle.textContent = item.name;

    bottomSheet.classList.add("show");
    overlay.classList.add("show");

});

        stagesList.appendChild(stage);

    });

}

// =====================
// إضافة مرحلة
// =====================

addStage.addEventListener("click", () => {

    const stageName = prompt("اكتب اسم المرحلة");

    if (!stageName) return;

    const stages = getStages();

    stages.push({
        name: stageName,
        date: "",
        photo: ""
    });

    saveStages(stages);

    loadStages();

});

dateInput.addEventListener("change", () => {

    const stages = getStages();

    stages[currentStage].date = dateInput.value;

    saveStages(stages);

    loadStages();

});