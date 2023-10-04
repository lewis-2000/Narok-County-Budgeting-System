// Function to open a specific tab
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tabcontent");
    for (const tabContent of tabContents) {
        tabContent.style.display = "none";
    }

    const tabLinks = document.getElementsByClassName("tablinks");
    for (const tabLink of tabLinks) {
        tabLink.classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Function to handle search
document.getElementById("searchButton").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const dataRows = document.querySelectorAll("#dataTab table tbody tr");
    const searchResults = document.getElementById("searchResults");

    let matchingRows = 0;

    dataRows.forEach((row) => {
        const rowData = row.textContent.toLowerCase();
        if (rowData.includes(searchInput)) {
            row.style.display = "table-row";
            matchingRows++;
        } else {
            row.style.display = "none";
        }
    });

    searchResults.textContent = `Found ${matchingRows} matching results.`;
});
