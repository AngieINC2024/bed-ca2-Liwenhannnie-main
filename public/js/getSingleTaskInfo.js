url = new URL(document.URL);
const urlParams = url.searchParams;
const task_id = urlParams.get("task_id");

const callbackForTaskInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const taskInfo = document.getElementById("taskInfo");

  if (responseStatus == 404) {
    taskInfo.innerHTML = `${responseData.message}`;
    return;
  }

  taskInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                <b>Task</b> ${responseData.task_id} <br>
                <b>Task Title:</b> ${responseData.title} <br>
                <b>Description:</b> ${responseData.description} <br>
                <b>Points:</b> ${responseData.points} <br>
                </p>
                <a href="#" class="btn btn-primary" id="update-${responseData.task_id}">Update</a>
                <a href="#" class="btn btn-danger" id="delete-${responseData.task_id}">Delete</a>
            </div>
        </div>
    `;

  const updateButton = document.getElementById(
    `update-${responseData.task_id}`
  );
  updateButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.href = `updateTask.html?task_id=${responseData.task_id}`;
  });

  const deleteButton = document.getElementById(
    `delete-${responseData.task_id}`
  );
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const callbackForDelete = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      window.location.href = `task.html`;
    };
    fetchMethod(
      currentUrl + "/api/task/" + responseData.task_id,
      callbackForDelete,
      "DELETE",
      null,
      localStorage.getItem("token")
    );
  });
};

fetchMethod(currentUrl + `/api/task/${task_id}`, callbackForTaskInfo);
