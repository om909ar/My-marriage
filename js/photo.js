const photoInput =
    document.getElementById(
        "photoInput"
    );

const photoPreview =
    document.getElementById(
        "photoPreview"
    );

const noPhoto =
    document.getElementById(
        "noPhoto"
    );

const savePhoto =
    document.getElementById(
        "savePhoto"
    );

const photoTitle =
    document.getElementById(
        "photoTitle"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

// =====================
// ID المرحلة
// =====================

const currentStageId =
    sessionStorage.getItem(
        "currentStageId"
    );

const stages =
    getStages();

const currentStage =
    stages.find(
        stage =>
            stage.id ===
            currentStageId
    );

let selectedFile =
    null;

// =====================
// التأكد من المرحلة
// =====================

if (!currentStage) {

    alert(
        "حدث خطأ في تحديد المرحلة"
    );

    window.location.replace(
        "index.html"
    );
}

// =====================
// العنوان
// =====================

photoTitle.textContent =
    currentStage.name +
    " - الصورة";

// =====================
// تحميل الصورة المحفوظة
// =====================

async function loadPhoto() {

    try {

        const image =
            await getStageImage(
                currentStage.id
            );

        if (!image) {

            photoPreview.hidden =
                true;

            noPhoto.hidden =
                false;

            return;
        }

        const imageURL =
            URL.createObjectURL(
                image
            );

        photoPreview.src =
            imageURL;

        photoPreview.hidden =
            false;

        noPhoto.hidden =
            true;

    } catch (error) {

        console.error(error);

        alert(
            "تعذر تحميل الصورة"
        );
    }
}

loadPhoto();

// =====================
// اختيار صورة
// =====================

photoInput.addEventListener(
    "change",
    function () {

        const file =
            photoInput.files[0];

        if (!file) {
            return;
        }

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "الملف المختار ليس صورة"
            );

            photoInput.value =
                "";

            return;
        }

        // الصورة الأصلية كما هي
        selectedFile =
            file;

        const previewURL =
            URL.createObjectURL(
                file
            );

        photoPreview.src =
            previewURL;

        photoPreview.hidden =
            false;

        noPhoto.hidden =
            true;
    }
);

// =====================
// حفظ الصورة
// =====================

savePhoto.addEventListener(
    "click",
    async function () {

        if (!selectedFile) {

            const existingImage =
                await getStageImage(
                    currentStage.id
                );

            if (!existingImage) {

                alert(
                    "اختر صورة أولاً"
                );

                return;
            }

            alert(
                "الصورة محفوظة مسبقًا ✅"
            );

            return;
        }

        try {

            savePhoto.disabled =
                true;

            savePhoto.textContent =
                "جاري الحفظ...";

            // حفظ الملف الأصلي
            await saveStageImage(
                currentStage.id,
                selectedFile
            );

            // تحديث حالة وجود الصورة
            const updatedStages =
                getStages();

            const stage =
                updatedStages.find(
                    item =>
                        item.id ===
                        currentStage.id
                );

            if (stage) {

                stage.photo =
                    true;

                saveStages(
                    updatedStages
                );
            }

            selectedFile =
                null;

            savePhoto.textContent =
                "حفظ الصورة";

            savePhoto.disabled =
                false;

            alert(
                "تم حفظ الصورة الأصلية ✅"
            );

        } catch (error) {

            console.error(error);

            savePhoto.textContent =
                "حفظ الصورة";

            savePhoto.disabled =
                false;

            alert(
                "تعذر حفظ الصورة"
            );
        }
    }
);

// =====================
// الرجوع
// =====================

backButton.addEventListener(
    "click",
    function () {

        window.location.replace(
            "index.html"
        );
    }
);

// =====================
// تكبير الصورة
// =====================

photoPreview.addEventListener(
    "click",
    function () {

        photoPreview.classList.toggle(
            "fullscreen"
        );
    }
);