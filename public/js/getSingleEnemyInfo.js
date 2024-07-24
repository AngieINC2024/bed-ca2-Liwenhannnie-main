url = new URL(document.URL);
const urlParams = url.searchParams;
const enemyId = urlParams.get("enemy_id");

const callbackForEnemyInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const enemyInfo = document.getElementById("enemyInfo");

  if (responseStatus == 404) {
    enemyInfo.innerHTML = `${responseData.message}`;
    return;
  }

  enemyInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                <b>Enemy ID:</b> ${responseData.enemy_id} <br>
                <b>Enemy Name:</b> ${responseData.enemy_name} <br>
                <b>Power:</b> ${responseData.power} <br>
                <b>Health:</b> ${responseData.health} <br>
                </p>
             
            </div>
        </div>
    `;
};

const callbackForEnemyAttacks = (responseStatus, responseData) => {
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
                <div class="card-footer">
               
            </div>
            </div>
        </div>
        `;
    AttackList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + `/api/enemy/${enemyId}`, callbackForEnemyInfo);
fetchMethod(
  fetchMethod(
    currentUrl + `/api/enemy/${enemyId}/attack`,
    callbackForEnemyAttacks
  )
);
