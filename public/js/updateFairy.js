document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const fairyId = urlParams.get("fairy_id");

  const updateDetailsButton = document.getElementById("updateDetailsButton");
  const upgradeButton = document.getElementById("upgradeButton"); // Corrected ID

  updateDetailsButton.addEventListener("click", function () {
    const fairy_name = document.getElementById("newFairyName").value;
    const power = document.getElementById("newFairyPower").value;

    const data = {
      fairy_name: fairy_name,
      power: power,
    };

    const callbackForUpdate = (responseStatus, responseData) => {
      console.log("responseStatus for update:", responseStatus);
      console.log("responseData for update:", responseData);

      if (responseStatus === 201) {
        window.location.href = "singleFairyInfo.html?fairy_id=" + fairyId;
      } else {
        alert(responseData.message);
      }
    };

    fetchMethod(
      currentUrl + `/api/fairy/${fairyId}`,
      callbackForUpdate,
      "PUT",
      data,
      localStorage.getItem("token")
    );
  });

  upgradeButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the form from submitting (if the upgrade button is inside a form)

    const newFairyLevel = document.getElementById("newFairyLevel").value;

    const upgradeData = {
      fairy_id: fairyId,
      level_name: newFairyLevel,
    };

    const callbackForUpgrade = (responseStatus, responseData) => {
      console.log("responseStatus for upgrade:", responseStatus);
      console.log("responseData for upgrade:", responseData);

      if (responseStatus === 201) {
        window.location.href = "singleFairyInfo.html?fairy_id=" + fairyId;
      } else {
        alert(
          `Upgrade failed: ${responseData.Message}. Current Points: ${responseData.Current_Fairy_Points}. Required Points: ${responseData.Require_Points}`
        );
      }
    };

    fetchMethod(
      currentUrl + "/api/fairy",
      callbackForUpgrade,
      "PUT", // Adjust the HTTP method based on your API design
      upgradeData,
      localStorage.getItem("token")
    );
  });
});
