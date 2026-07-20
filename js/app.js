const stagesList = document.getElementById("stagesList");
const addStage = document.getElementById("addStage");
const dateInput = document.getElementById("dateInput");
const deleteStage = document.getElementById("deleteStage");

let currentStage = null;

const bottomSheet = document.getElementById("bottomSheet");
const overlay = document.getElementById("overlay");
const sheetTitle = document.getElementById("sheetTitle");
const choosePhotos = document.getElementById("choosePhotos");
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
    <div class="stage-left">
        <div class="stage-photo">

    ${
        item.photo
        ? `<img src="${item.photo}" class="stage-photo-img">`
        : "+"
    }

</div>
        <span>${item.name}</span>
    </div>

    <span>${
        item.date
            ? item.date.split("-").reverse().join(" / ")
            : "—"
    }</span>
`;
const stagePhoto = stage.querySelector(".stage-photo");

stagePhoto.addEventListener("click", (e) => {

    e.stopPropagation();

    if (!item.photo) return;

    const imageViewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");

    viewerImage.src = item.photo;

    imageViewer.classList.add("show");

});

const imageViewer = document.getElementById("imageViewer");

imageViewer.addEventListener("click", () => {

    imageViewer.classList.remove("show");

});

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

const closeSheet = document.getElementById("closeSheet");

closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);

function closeBottomSheet() {

    bottomSheet.classList.remove("show");
    overlay.classList.remove("show");

}

choosePhotos.addEventListener("click", () => {

    if (currentStage === null) return;

    sessionStorage.setItem("currentStage", currentStage);

    window.location.href = "photo.html";

});

deleteStage.addEventListener("click", () => {

    if (currentStage === null) return;

    if (!confirm("هل تريد حذف هذه المرحلة؟")) return;

    const stages = getStages();

    stages.splice(currentStage, 1);

    saveStages(stages);
    
    currentStage = null;

    closeBottomSheet();

    loadStages();

});