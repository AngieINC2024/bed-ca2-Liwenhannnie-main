const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const enemyList = document.getElementById("enemyList");
  responseData.forEach((enemy) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    const imageUrl = `/Images/Enemy/img${enemy.enemy_id}.png`;

    displayItem.innerHTML = `
                <div class="flip">
                  <div class="front">
                  <img src="${imageUrl}" alt="${enemy.enemy_name} Enemy Image" class="image-fit">
                    <div class="enemy-text">
                      <h2>${enemy.enemy_name}</h2>
                    </div>
                  </div>
                  <div class="back">
                    <p class="card-text">
                    Enemy ID: ${enemy.enemy_id} <br>
                    Enemy Name: ${enemy.enemy_name} <br>
                    Power: ${enemy.power} <br>
                    Health: ${enemy.health} <br>
                    </p>
                    <a href="singleEnemyInfo.html?enemy_id=${enemy.enemy_id}" class="btn btn-primary" id="detailsButton">View Details</a>

                  </div>
                </div>
              
          `;
    const imgElement = displayItem.querySelector("img");
    imgElement.src = imageUrl;
    enemyList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/enemy", callback);

// const callback2 = (responseStatus, responseData) => {
//   console.log("responseStatus:", responseStatus);
//   console.log("responseData:", responseData);

//   const enemyList = document.getElementById("enemyList");
//   responseData.forEach((enemy) => {
//     const displayItem = document.createElement("div");
//     displayItem.className =
//       "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
//     const imageUrl = `/Images/Enemy/img${enemy.enemy_id}.png`;

//     displayItem.innerHTML = `
//                 <div class="flip">
//                   <div class="front">
//                   <img src="${imageUrl}" alt="${enemy.enemy_name} Enemy Image" class="image-fit">
//                     <div class="enemy-text">
//                       <h2>${enemy.enemy_name}</h2>
//                     </div>
//                   </div>
//                   <div class="back">
//                     <p class="card-text">
//                     Enemy ID: ${enemy.enemy_id} <br>
//                     Enemy Name: ${enemy.enemy_name} <br>
//                     Power: ${enemy.power} <br>
//                     Health: ${enemy.health} <br>
//                     </p>
//                     <a href="singleEnemyInfo.html?enemy_id=${enemy.enemy_id}" class="btn btn-primary" id="detailsButton">View Details</a>

//                   </div>
//                 </div>

//           `;
//     enemyList.appendChild(displayItem);
//   });
// };

// fetchMethod(currentUrl + "/api/enemy", callback);

// <a href="singleUserInfo.html?user_id=${user.id}" class="btn btn-primary">View Details</a>
