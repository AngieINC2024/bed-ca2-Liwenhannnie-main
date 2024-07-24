//show all messages in the chat and delete them by message_id
const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const messageList = document.getElementById("messageList");
  responseData.forEach((chat) => {
    const displayItem = document.createElement("div");

    displayItem.innerHTML = `
          <div class="card ">
              <div class="card-body">
                  <h5 class="card-title">
                    ${chat.message_text}
                  </h5>
                  <p class="card-text">
                    user_id: ${chat.user_id}
                  </p>
                  
                  <button type="button" data-message-id=${chat.chat_id} class="btn btn-danger">Delete</button>
              </div>
          </div>
          `;
    messageList.appendChild(displayItem);
    // Scroll to the bottom
    messageList.scrollTop = messageList.scrollHeight;
  });
  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
};

fetchMethod(currentUrl + "/api/message", callback, "GET", null, null);

// Delete message by message_id
function handleButtonClick(event) {
  const message_id = event.target.getAttribute("data-message-id");
  const token = localStorage.getItem("token");
  fetchMethod(
    currentUrl + `/api/message/${message_id}`,
    deleteCallback,
    "DELETE",
    null,
    token
  );
}

function deleteCallback(responseStatus, responseData) {
  if (responseStatus == 409) {
    alert(responseData);
  }
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);
  window.location.reload();
}
