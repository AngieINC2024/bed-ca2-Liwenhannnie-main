document.addEventListener("DOMContentLoaded", function () {
  const createFairyForm = document.getElementById("createFairyForm");

  createFairyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fairyName = document.getElementById("createFairyName").value;
    const fairyPower = document.getElementById("createFairyPower").value;

    const data = {
      name: fairyName,
      power: fairyPower,
    };

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        // Check if signup was successful
        createFairyForm.reset();
        window.location.href = "fairy.html";
      }
    };

    // Perform signup request
    fetchMethod(
      currentUrl + "/api/fairy",
      callback,
      "POST",
      data,
      localStorage.getItem("token")
    );

    // Reset the form fields
  });
});
