async function fetchMenuData() {
    try {
        const response = await fetch('https://menu-updater-admin.netlify.app/.netlify/functions/menuFunctions');
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        updateMenuDisplay(data);

    } catch (error) {
        console.error('Error fetching menu data:', error);
    }
}

function updateMenuDisplay(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

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

fetchMenuData();
