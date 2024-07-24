document.addEventListener("DOMContentLoaded", function () {
  const createEnemyForm = document.getElementById("createEnemyForm");

  createEnemyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const EnemyName = document.getElementById("createEnemyName").value;
    const EnemyPower = document.getElementById("createEnemyPower").value;

    const data = {
      name: EnemyName,
      power: EnemyPower,
    };

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        // Check if signup was successful
        createFairyForm.reset();
        window.location.href = "enemy.html";
      }
    };

    // Perform signup request
    fetchMethod(
      currentUrl + "/api/enemy",
      callback,
      "POST",
      data,
      localStorage.getItem("token")
    );

    // Reset the form fields
  });
});
