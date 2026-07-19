function formatDate(date) {

    if (!date) return "—";

    const parts = date.split("-");

    return `${parts[2]} / ${parts[1]} / ${parts[0]}`;

}

function updateStageDates() {

    const stages = getStages();

    document.getElementById("engagementDate").textContent =
        formatDate(stages.engagement);

    document.getElementById("meetingDate").textContent =
        formatDate(stages.meeting);

    document.getElementById("contractDate").textContent =
        formatDate(stages.contract);

    document.getElementById("shabkaDate").textContent =
        formatDate(stages.shabka);

    document.getElementById("weddingDate").textContent =
        formatDate(stages.wedding);

    document.getElementById("honeymoonDate").textContent =
        formatDate(stages.honeymoon);

}