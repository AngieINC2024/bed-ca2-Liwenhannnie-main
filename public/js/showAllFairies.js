const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const fairyList = document.getElementById("fairyList");
  responseData.forEach((fairy) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    const imageUrl = `/Images/Fairy/img${fairy.fairy_id}.png`;
    displayItem.innerHTML = `
                  <div class="flip">
                    <div class="front">
                      <img src="" alt="${fairy.fairy_name} Fairy Image" class="image-fit" onerror="this.style.display='none'">
                      <div class="fairy-text">
                        <h2>${fairy.fairy_name}</h2>
                      </div>
                    </div>
                    <div class="back">
                      <p class="card-text">
                      Fairy ID: ${fairy.fairy_id} <br>
                      Fairy Name: ${fairy.fairy_name} <br>
                      Power: ${fairy.power} <br>
                      Health: ${fairy.health} <br>
                      Level: ${fairy.level} <br>
                      Points: ${fairy.points}
                      </p>
                      <a href="singleFairyInfo.html?fairy_id=${fairy.fairy_id}" class="btn btn-primary" id="detailsButton">View Details</a>
                    </div>
                  </div>
            `;

    // Check if the image exists before setting the src attribute
    const imgElement = displayItem.querySelector("img");
    imgElement.src = imageUrl;

    fairyList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/fairy", callback);
