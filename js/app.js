document.querySelectorAll(".stage").forEach(stage => {

    stage.addEventListener("click", () => {

        alert(stage.querySelector("span").textContent);

    });

});
