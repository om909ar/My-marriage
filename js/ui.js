function formatDate(date) {

    if (!date) return "—";

    const parts = date.split("-");

    return `${parts[2]} / ${parts[1]} / ${parts[0]}`;

}

function updateStageDates() {

    const stages = getStages();

    document.getElementById("engagementDate").textContent =
        stages.engagement || "—";

    document.getElementById("meetingDate").textContent =
        stages.meeting || "—";

    document.getElementById("contractDate").textContent =
        stages.contract || "—";

    document.getElementById("shabkaDate").textContent =
        stages.shabka || "—";

    document.getElementById("weddingDate").textContent =
        stages.wedding || "—";

    document.getElementById("honeymoonDate").textContent =
        stages.honeymoon || "—";

}
