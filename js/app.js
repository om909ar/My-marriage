const stagesList =
    document.getElementById("stagesList");

const addStage =
    document.getElementById("addStage");

const dateInput =
    document.getElementById("dateInput");

const deleteStage =
    document.getElementById("deleteStage");

const addStageModal =
    document.getElementById("addStageModal");

const stageNameInput =
    document.getElementById("stageNameInput");

const saveStage =
    document.getElementById("saveStage");

const cancelStage =
    document.getElementById("cancelStage");

const bottomSheet =
    document.getElementById("bottomSheet");

const overlay =
    document.getElementById("overlay");

const sheetTitle =
    document.getElementById("sheetTitle");

const choosePhotos =
    document.getElementById("choosePhotos");

const closeSheet =
    document.getElementById("closeSheet");

let currentStage = null;

// =====================
// تحميل المراحل
// =====================

loadStages();

async function loadStages() {

    stagesList.innerHTML = "";

    const stages = getStages();

    for (
        let index = 0;
        index < stages.length;
        index++
    ) {

        const item = stages[index];

        const stage =
            document.createElement("div");

        stage.className = "stage";

        stage.dataset.index = index;

        const stagePhoto =
            document.createElement("div");

        stagePhoto.className =
            "stage-photo";

        const stageLeft =
            document.createElement("div");

        stageLeft.className =
            "stage-left";

        const name =
            document.createElement("span");

        name.textContent =
            item.name;

        stageLeft.appendChild(
            stagePhoto
        );

        stageLeft.appendChild(
            name
        );

        const date =
            document.createElement("span");

        date.textContent =
            item.date
                ? item.date
                    .split("-")
                    .reverse()
                    .join(" / ")
                : "—";

        stage.appendChild(
            stageLeft
        );

        stage.appendChild(
            date
        );

        // =====================
        // تحميل صورة المرحلة
        // =====================

        try {

            const image =
                await getStageImage(index);

            if (image) {

                const imageURL =
                    URL.createObjectURL(image);

                const img =
                    document.createElement("img");

                img.src = imageURL;

                img.className =
                    "stage-photo-img";

                stagePhoto.appendChild(img);

                stagePhoto.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        const imageViewer =
                            document.getElementById(
                                "imageViewer"
                            );

                        const viewerImage =
                            document.getElementById(
                                "viewerImage"
                            );

                        viewerImage.src =
                            imageURL;

                        imageViewer.classList.add(
                            "show"
                        );
                    }
                );

            } else {

                stagePhoto.textContent =
                    "+";
            }

        } catch (error) {

            console.error(
                "خطأ في تحميل الصورة:",
                error
            );

            stagePhoto.textContent =
                "+";
        }

        // =====================
        // الضغط على المرحلة
        // =====================

        stage.addEventListener(
            "click",
            function () {

                currentStage =
                    index;

                dateInput.value =
                    item.date || "";

                sheetTitle.textContent =
                    item.name;

                bottomSheet.classList.add(
                    "show"
                );

                overlay.classList.add(
                    "show"
                );
            }
        );

        stagesList.appendChild(
            stage
        );
    }
}

// =====================
// إضافة مرحلة
// =====================

addStage.addEventListener(
    "click",
    function () {

        stageNameInput.value = "";

        addStageModal.classList.add(
            "show"
        );

        stageNameInput.focus();

    }
);

cancelStage.addEventListener(
    "click",
    function () {

        addStageModal.classList.remove(
            "show"
        );

    }
);

saveStage.addEventListener(
    "click",
    function () {

        const stageName =
            stageNameInput.value.trim();

        if (!stageName) {
            return;
        }

        const stages =
            getStages();

        stages.push({

            name: stageName,

            date: "",

            photo: false

        });

        saveStages(stages);

        loadStages();

        addStageModal.classList.remove(
            "show"
        );

    }
);

// =====================
// التاريخ
// =====================

dateInput.addEventListener(
    "change",
    function () {

        const stages =
            getStages();

        stages[currentStage].date =
            dateInput.value;

        saveStages(stages);

        loadStages();

    }
);

// =====================
// إغلاق النافذة
// =====================

closeSheet.addEventListener(
    "click",
    closeBottomSheet
);

overlay.addEventListener(
    "click",
    closeBottomSheet
);

function closeBottomSheet() {

    bottomSheet.classList.remove(
        "show"
    );

    overlay.classList.remove(
        "show"
    );
}

// =====================
// الصور
// =====================

choosePhotos.addEventListener(
    "click",
    function () {

        if (currentStage === null) {
            return;
        }

        sessionStorage.setItem(
            "currentStage",
            currentStage
        );

        window.location.replace(
            "photo.html"
        );
    }
);

// =====================
// حذف المرحلة
// =====================

deleteStage.addEventListener(
    "click",
    async function () {

        if (currentStage === null) {
            return;
        }

        if (
            !confirm(
                "هل تريد حذف هذه المرحلة؟"
            )
        ) {
            return;
        }

        const stages =
            getStages();

        // حذف صورة المرحلة من IndexedDB
        try {

            await deleteStageImage(
                currentStage
            );

        } catch (error) {

            console.error(
                "خطأ في حذف الصورة:",
                error
            );
        }

        stages.splice(
            currentStage,
            1
        );

        /*
         * مهم:
         * بعد حذف مرحلة، أرقام الصور التي
         * بعدها تتغير.
         *
         * لذلك نعيد ترتيب الصور في IndexedDB.
         */

        try {

            for (
                let i = currentStage;
                i < stages.length;
                i++
            ) {

                const nextImage =
                    await getStageImage(
                        i + 1
                    );

                if (nextImage) {

                    await saveStageImage(
                        i,
                        nextImage
                    );

                } else {

                    await deleteStageImage(
                        i
                    );
                }
            }

            await deleteStageImage(
                stages.length
            );

        } catch (error) {

            console.error(
                "خطأ في ترتيب الصور:",
                error
            );
        }

        saveStages(stages);

        currentStage = null;

        closeBottomSheet();

        loadStages();

    }
);

// =====================
// عارض الصور
// =====================

const imageViewer =
    document.getElementById(
        "imageViewer"
    );

const viewerImage =
    document.getElementById(
        "viewerImage"
    );

imageViewer.addEventListener(
    "click",
    function () {

        imageViewer.classList.remove(
            "show"
        );

        viewerImage.src = "";

    }
);