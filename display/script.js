// Function to fetch the latest menu data from GitHub or backend
async function fetchMenuData() {
    const response = await fetch('https://menu-updater-admin.netlify.app/.netlify/functions/menuFunctions');
    const data = await response.json();

    // Now, update Site B with the fetched menu data
    updateMenuDisplay(data);
}

// Function to update the displayed menu based on the fetched data
function updateMenuDisplay(data) {
    const menuContainer = document.getElementById('menu-container'); // where the menu will be displayed

    // Clear the current menu display
    menuContainer.innerHTML = '';

    // Loop through the menu categories (breakfast, lunch, dinner, drinks)
    for (let category in data) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('menu-category');
        categoryContainer.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)} Menu</h2>`;

        data[category].forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('menu-item');
            itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            categoryContainer.appendChild(itemElement);
        });

        menuContainer.appendChild(categoryContainer);
    }
}

// Fetch the updated menu when Site B loads
fetchMenuData();
