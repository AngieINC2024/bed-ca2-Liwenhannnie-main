url = new URL(document.URL);
const urlParams = url.searchParams;
const fairyId = urlParams.get("fairy_id");

const callbackForFairyInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const fairyInfo = document.getElementById("fairyInfo");

  if (responseStatus == 404) {
    fairyInfo.innerHTML = `${responseData.message}`;
    return;
  }

  fairyInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                <b>Fairy ID:</b> ${responseData.fairy_id} <br>
                <b>Fairy Name:</b> ${responseData.fairy_name} <br>
                <b>Power:</b> ${responseData.power} <br>
                <b>Health:</b> ${responseData.health} <br>
                <b>Level:</b> ${responseData.level} <br>
                <b>Points:</b> ${responseData.points}
                </p>
                <a href="#" class="btn btn-primary" id="update-${responseData.fairy_id}">Update</a>
                <a href="#" class="btn btn-danger" id="delete-${responseData.fairy_id}">Delete</a>
            </div>
        </div>
    `;
  const updateButton = document.getElementById(
    `update-${responseData.fairy_id}`
  );
  updateButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.href = `updateFairy.html?fairy_id=${responseData.fairy_id}`;
  });

  const deleteButton = document.getElementById(
    `delete-${responseData.fairy_id}`
  );
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const callbackForDelete = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      window.location.href = `fairy.html`;
    };
    fetchMethod(
      currentUrl + "/api/fairy/" + responseData.fairy_id,
      callbackForDelete,
      "DELETE",
      null,
      localStorage.getItem("token")
    );
  });
};

const callbackForFairyAttacks = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const AttackList = document.getElementById("DetailsList");
  AttackList.className = "d-flex flex-wrap justify-content-end";
  responseData.forEach((attack) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3  flex-grow-1";
    displayItem.innerHTML = `
        <div class="card card h-100">
            <div class="card-body">
                <h5 class="card-title"><b>${attack.attack}</b></h5>
                <p class="card-text">
                    Attack ID: ${attack.attack_id} <br>
                    Attack By: ${attack.attack_by} <br>
                    Attack Type: ${attack.attack_type} <br>
                    Attack: ${attack.attack} <br>
                    Attack Damage: ${attack.damage} <br>
                    Attack Description 1: ${attack.description}
                </p>
               
            
            </div>
        </div>
        `;
    AttackList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + `/api/fairy/${fairyId}`, callbackForFairyInfo);
fetchMethod(
  fetchMethod(
    currentUrl + `/api/fairy/${fairyId}/attack`,
    callbackForFairyAttacks
  )
);
