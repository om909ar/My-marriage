const photoInput =
    document.getElementById("photoInput");

const photoPreview =
    document.getElementById("photoPreview");

const noPhoto =
    document.getElementById("noPhoto");

const savePhoto =
    document.getElementById("savePhoto");

const photoTitle =
    document.getElementById("photoTitle");

const backButton =
    document.getElementById("backButton");

const currentStage =
    Number(sessionStorage.getItem("currentStage"));

const stages =
    getStages();

let selectedFile = null;

// =====================
// التأكد من المرحلة
// =====================

if (
    isNaN(currentStage) ||
    !stages[currentStage]
) {

    alert("حدث خطأ في تحديد المرحلة");

    window.location.replace("index.html");
}

// =====================
// عنوان الصفحة
// =====================

photoTitle.textContent =
    stages[currentStage].name + " - الصورة";

// =====================
// عرض الصورة
// =====================

async function loadPhoto() {

    try {

        const file =
            await getStageImage(currentStage);

        if (!file) {

            noPhoto.hidden = false;
            photoPreview.hidden = true;

            return;
        }

        const imageURL =
            URL.createObjectURL(file);

        photoPreview.src = imageURL;

        photoPreview.hidden = false;
        noPhoto.hidden = true;

    } catch (error) {

        console.error(error);

        alert("تعذر تحميل الصورة");

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

        if (!file.type.startsWith("image/")) {

            alert("الملف المختار ليس صورة");

            photoInput.value = "";

            return;
        }

        // حفظ الملف الأصلي كما هو
        selectedFile = file;

        // عرض معاينة بدون تعديل الصورة
        const previewURL =
            URL.createObjectURL(file);

        photoPreview.src = previewURL;

        photoPreview.hidden = false;
        noPhoto.hidden = true;

    }
);

// =====================
// حفظ الصورة
// =====================

savePhoto.addEventListener(
    "click",
    async function () {

        if (!selectedFile) {

            // إذا لم يختار صورة جديدة
            // نتأكد أن هناك صورة محفوظة أصلًا

            const existingImage =
                await getStageImage(currentStage);

            if (!existingImage) {

                alert("اختر صورة أولاً");

                return;
            }

            alert("الصورة محفوظة مسبقًا ✅");

            return;
        }

        try {

            savePhoto.disabled = true;

            savePhoto.textContent =
                "جاري الحفظ...";

            // تخزين الملف الأصلي 100%
            await saveStageImage(
                currentStage,
                selectedFile
            );

            // تحديث بيانات المرحلة
            stages[currentStage].photo = true;

            saveStages(stages);

            alert("تم حفظ الصورة الأصلية ✅");

            selectedFile = null;

            savePhoto.textContent =
                "حفظ الصورة";

            savePhoto.disabled = false;

        } catch (error) {

            console.error(error);

            alert(
                "تعذر حفظ الصورة"
            );

            savePhoto.textContent =
                "حفظ الصورة";

            savePhoto.disabled = false;
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