const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const noPhoto = document.getElementById("noPhoto");
const savePhoto = document.getElementById("savePhoto");
const photoTitle = document.getElementById("photoTitle");

const currentStage = Number(sessionStorage.getItem("currentStage"));

const stages = JSON.parse(localStorage.getItem("myStages")) || [];

photoTitle.textContent =
    stages[currentStage].name + " - الصورة";
let selectedImage = "";

// عرض الصورة المحفوظة
const savedImage = localStorage.getItem(currentStage + "_photo");

if (savedImage) {

    selectedImage = savedImage;

    photoPreview.src = savedImage;

    photoPreview.hidden = false;

    noPhoto.hidden = true;

}

// اختيار صورة
photoInput.addEventListener("change", () => {

    const file = photoInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        selectedImage = e.target.result;

        photoPreview.src = selectedImage;

        photoPreview.hidden = false;

        noPhoto.hidden = true;

    };

    reader.readAsDataURL(file);

});

// حفظ // حفظ الصورة
savePhoto.addEventListener("click", () => {

    if (!selectedImage) {

        alert("اختر صورة أولاً");

        return;

    }

    stages[currentStage].photo = selectedImage;

    localStorage.setItem("myStages", JSON.stringify(stages));

    alert("تم حفظ الصورة ✅");

});

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {

    window.location.href = "index.html";

});

photoPreview.addEventListener("click", () => {

    photoPreview.classList.toggle("fullscreen");

});