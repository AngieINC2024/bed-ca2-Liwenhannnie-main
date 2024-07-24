document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/Fairy/count")
    .then((response) => response.json())
    .then((data) => {
      // Update the user count in the HTML
      document.getElementById("FairyCount").innerText = data.fairyCount;
    })
    .catch((error) => {
      console.error("Error fetching Fairy count:", error);
    });
});
