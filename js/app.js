const dateInput = document.getElementById("dateInput");

let currentStage = "";

const stages = document.querySelectorAll(".stage");

const bottomSheet = document.getElementById("bottomSheet");
const overlay = document.getElementById("overlay");
const closeSheet = document.getElementById("closeSheet");
const sheetTitle = document.getElementById("sheetTitle");

// عرض التواريخ المحفوظة عند تشغيل التطبيق
updateStageDates();

// فتح الـ Bottom Sheet
stages.forEach(stage => {

    stage.addEventListener("click", () => {

        currentStage = stage.id;

        sheetTitle.textContent =
            stage.querySelector("span").textContent;

        // عرض التاريخ الحالي إن وجد
        const data = getStages();
        dateInput.value = data[currentStage] || "";

        bottomSheet.classList.add("show");
        overlay.classList.add("show");

    });

});

// حفظ التاريخ عند تغييره
dateInput.addEventListener("change", () => {

    const data = getStages();

    data[currentStage] = dateInput.value;

    saveStages(data);

    updateStageDates();

});

// إغلاق النافذة
closeSheet.addEventListener("click", closeBottomSheet);
overlay.addEventListener("click", closeBottomSheet);

function closeBottomSheet() {

    bottomSheet.classList.remove("show");
    overlay.classList.remove("show");

}