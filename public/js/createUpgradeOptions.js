document.addEventListener("DOMContentLoaded", function () {
  const newFairyLevelSelect = document.getElementById("newFairyLevel"); // Corrected variable name

  // Fetch fairy levels from the backend
  fetch(currentUrl + "/api/fairyLevel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // You may need to include authorization headers or other required headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the dropdown with options
      data.forEach(function (level) {
        const option = document.createElement("option");
        option.value = level.level_name; // Set a unique value for each option based on the level's ID or another identifier
        option.text = level.level_name; // Assuming each level has a "name" property
        newFairyLevelSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching fairy levels:", error));
});
