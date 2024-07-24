document.addEventListener("DOMContentLoaded", function () {
  const createTaskForm = document.getElementById("createTaskForm");

  createTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const TaskTitle = document.getElementById("createTaskTitle").value;
    const TaskDescription = document.getElementById(
      "createTaskDescription"
    ).value;
    const TaskPoints = document.getElementById("createTaskPoints").value;

    const data = {
      title: TaskTitle,
      description: TaskDescription,
      points: TaskPoints,
    };

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        // Check if signup was successful
        createTaskForm.reset();
        window.location.href = "task.html";
      }
    };

    // Perform signup request
    fetchMethod(
      currentUrl + "/api/task",
      callback,
      "POST",
      data,
      localStorage.getItem("token")
    );

    // Reset the form fields
  });
});
