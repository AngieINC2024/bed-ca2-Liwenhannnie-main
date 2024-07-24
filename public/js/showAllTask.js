const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const taskList = document.getElementById("taskList");
  responseData.forEach((tasks) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    const imageUrl = `/Images/TaskModel/img${tasks.task_id}.png`;

    displayItem.innerHTML = `
                  <div class="flip">
                    <div class="front">
                      <img src="${imageUrl}" alt="${tasks.task_id} Task Image" class="image-fit" onerror="this.style.display='none'">
                        <div class="taskModel-text">
                          <h2>${tasks.title}</h2>
                        </div>
                    </div>
                    <div class="back">
                      <p class="card-text">
                      Task ID: ${tasks.task_id} <br>
                      Title: ${tasks.title} <br>
                      Description: ${tasks.description} <br>
                      Points: ${tasks.points} 
                      </p>
                      <a href="singleTaskInfo.html?task_id=${tasks.task_id}" class="btn btn-primary" id="detailsButton">View Details</a>

                    </div>
                  </div>
                
            `;
    const imgElement = displayItem.querySelector("img");
    imgElement.src = imageUrl;
    taskList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/task", callback);

// <a href="singleUserInfo.html?user_id=${user.id}" class="btn btn-primary">View Details</a>
