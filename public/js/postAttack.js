document.addEventListener("DOMContentLoaded", function () {
  const postAttackButton = document.getElementById("postAttackButton");
  const resultText = document.getElementById("resultText");

  // Add an event listener to the postAttackButton
  postAttackButton.addEventListener("click", function () {
    // Fetch the selected values from the dropdowns
    const selectedFairy = document.getElementById("fairyDropdown").value;
    const selectedEnemy = document.getElementById("enemyDropdown").value;
    const selectedAttack = document.getElementById("AttackDropdown").value;

    // Check if any dropdown is not selected
    if (!selectedFairy || !selectedEnemy || !selectedAttack) {
      alert("Please select all options before attacking.");
      return;
    }

    const callbackForAttack = (responseStatus, responseData) => {
      console.log("responseStatus for Attack:", responseStatus);
      console.log("responseData for Attack:", responseData);

      if (responseStatus === 201) {
        const remainingHealth = responseData.remainingHealth;
        alert(`Attack successful! Remaining Health: ${remainingHealth}`);
        // Optionally, you can redirect or perform other actions here
      } else {
        alert(responseData.message);
      }
    };

    const data = {
      fairy_name: selectedFairy,
      enemy_name: selectedEnemy,
      attack: selectedAttack,
    };

    // Make a PUT request to the server with the data object
    fetchMethod(
      currentUrl + "/api/arena",
      callbackForAttack,
      "PUT",
      data,
      localStorage.getItem("token")
    );
  });

  // Fetch attack names and populate the dropdown with static options
});
