// Post message to the chat
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 201) {
      // Check if creation of message is succesful
      if (responseData.user_id) {
        localStorage.setItem("user_id", responseData.user_id); //store user_id in local storage
      }
    } else if (!localStorage.getItem("token")) {
      window.location.href = "../login.html";
    }
  };

  const messageForm = document.getElementById("messageForm");

  messageForm.addEventListener("submit", function (event) {
    console.log("messageForm.addEventListener");
    event.preventDefault(); //prevent the form from submitting

    const user_id = localStorage.getItem("user_id");
    const message_text = document.getElementById("message_text").value;

    const data = {
      user_id: user_id,
      message_text: message_text,
    };
    // Perform createNewMessage request
    fetchMethod(
      currentUrl + "/api/chat",
      callback,
      "POST",
      data,
      localStorage.getItem("token")
    ); //token is passed as a header

    // Reset the form fields
    messageForm.reset();
    window.location.reload(); //reload the page
  });
});
