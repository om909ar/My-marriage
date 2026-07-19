const STORAGE_KEY = "myMarriageStages";

function getStages() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return {
        engagement: "",
        meeting: "",
        contract: "",
        shabka: "",
        wedding: "",
        honeymoon: ""
    };

}

function saveStages(stages) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(stages)
    );

}