document.addEventListener("DOMContentLoaded", function () {
  const newEnemyNameSelect = document.getElementById("enemyDropdown"); // Corrected variable name

  // Fetch fairy levels from the backend
  fetch(currentUrl + "/api/enemy", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // You may need to include authorization headers or other required headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the dropdown with options
      data.forEach(function (enemy) {
        const option = document.createElement("option");
        option.value = enemy.enemy_name; // Set a unique value for each option based on the level's ID or another identifier
        option.text = enemy.enemy_name; // Assuming each level has a "name" property
        newEnemyNameSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching enemy names:", error));
});
