const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const fairyLevelList = document.getElementById("fairyLevelList");
  responseData.forEach((fairyLevels) => {
    // const imageUrl = `/Images/Fairy/img${fair.fairy_id}.png`;
    // <img src="${imageUrl}" alt="${fairy.fairy_name} Fairy Image" class="image-fit">
    // <a href="singleFairyInfo.html?fairy_id=${fairy.fairy_id}" class="btn btn-primary">View Attacks</a>
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    displayItem.innerHTML = `
                  <div class="flip">
                    <div class="front">
                    
                      <div class="fairyLevel-text">
                        <h2>${fairyLevels.level_name}</h2>
                      </div>
                    </div>
                    <div class="back">
                      <p class="card-text">
                      Fairy Level Id: ${fairyLevels.level_id} <br>
                      Level Name: ${fairyLevels.level_name} <br>
                      Extra HP Given: ${fairyLevels.level_extraHp} <br>
                      Extra Damage Given: ${fairyLevels.level_extraDamage} <br>
                      Points Required: ${fairyLevels.level_points} <br>
                      </p>
                    </div>
                  </div>
                
            `;
    fairyLevelList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/fairyLevel", callback);

// <a href="singleUserInfo.html?user_id=${user.id}" class="btn btn-primary">View Details</a>
