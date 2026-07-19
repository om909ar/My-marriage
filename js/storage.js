function saveStageDate(stage, date) {

    localStorage.setItem(stage, date);

}

function getStageDate(stage) {

    return localStorage.getItem(stage) || "—";

}
