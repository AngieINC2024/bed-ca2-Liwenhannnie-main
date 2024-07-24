document.addEventListener("DOMContentLoaded", function () {
  const currentUserCard = document.getElementById("currentUserCard");
  const currentUserSpan = document.getElementById("currentUser");
  const usernameSpan = document.getElementById("username");
  const userEmailSpan = document.getElementById("useremail");

  // Check if the user is already logged in (using stored token)
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    try {
      // Decode the token
      const decodedToken = jwt_decode(storedToken);

      // Display the current user's information within the card
      currentUserSpan.innerText = decodedToken.user_id;
      usernameSpan.innerText = decodedToken.username;
      userEmailSpan.innerText = decodedToken.email;
      currentUserCard.classList.remove("d-none");
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle the error, e.g., redirect to login page
    }
  }
});
