document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/Enemy/count")
    .then((response) => response.json())
    .then((data) => {
      // Update the user count in the HTML
      document.getElementById("EnemyCount").innerText = data.enemyCount;
    })
    .catch((error) => {
      console.error("Error fetching Enemy count:", error);
    });
});
