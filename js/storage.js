const STORAGE_KEY = "myStages";

function getStages() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];

}

function saveStages(stages) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(stages)
    );

}