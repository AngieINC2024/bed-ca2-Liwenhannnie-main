document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const taskId = urlParams.get("task_id");

  const updateDetailsButton = document.getElementById("updateDetailsButton");

  updateDetailsButton.addEventListener("click", function () {
    const newTaskTitle = document.getElementById("newTaskTitle").value;
    const newTaskDescription =
      document.getElementById("newTaskDescription").value;
    const newTaskPoints = document.getElementById("newTaskPoints").value;

    const updateData = {
      task_id: taskId,
      title: newTaskTitle,
      description: newTaskDescription,
      points: newTaskPoints,
    };
    console.log(updateData);

    const callbackForUpdate = (responseStatus, responseData) => {
      console.log("responseStatus for update:", responseStatus);
      console.log("responseData for update:", responseData);
      console.log(responseData);
      console.log(responseStatus);
      if (responseStatus === 201) {
        window.location.href = "singleTaskInfo.html?task_id=" + taskId;
      } else {
        alert(`Update failed: ${responseData.Message}. `);
      }
    };

    fetchMethod(
      currentUrl + `/api/task/${taskId}`,
      callbackForUpdate,
      "PUT",
      updateData,
      localStorage.getItem("token")
    );
  });
});
