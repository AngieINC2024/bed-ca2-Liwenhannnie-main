const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const userList = document.getElementById("userList");
  responseData.forEach((user) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";

    displayItem.innerHTML = `
                <div class="flip">
                  <div class="front">
                    <h2>${user.username}</h2>
                  </div>
                  <div class="back">
                    <p class="card-text">
                    User ID: ${user.user_id} <br>
                    Username: ${user.username} <br>
                    Email: ${user.email} <br>
                    </p>
                  </div>
                </div>
                      
            `;
    userList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/users", callback);

// <a href="singleUserInfo.html?user_id=${user.id}" class="btn btn-primary">View Details</a>
