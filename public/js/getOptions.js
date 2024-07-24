document.addEventListener('DOMContentLoaded', function () {
    // Fetch options for Fairies
    fetchOptions('fairy', 'fairyDropdown');

    // Fetch options for Enemies
    fetchOptions('enemy', 'enemyDropdown');
});

function fetchOptions(entity, dropdownId) {
    fetch(`your_backend_url/${entity}`)
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById(dropdownId);

            // Clear existing options
            dropdown.innerHTML = '';

            // Add new options
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                dropdown.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Error fetching options:', error));
}