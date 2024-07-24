document.addEventListener("DOMContentLoaded", function () {
  const newAttackSelect = document.getElementById("AttackDropdown"); // Corrected variable name

  // Fetch fairy levels from the backend
  fetch(currentUrl + "/api/attack", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // You may need to include authorization headers or other required headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the dropdown with options
      data.forEach(function (attack) {
        const option = document.createElement("option");
        option.value = attack.attack; // Set a unique value for each option based on the level's ID or another identifier
        option.text = attack.attack; // Assuming each level has a "name" property
        newAttackSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching attack names:", error));
});
