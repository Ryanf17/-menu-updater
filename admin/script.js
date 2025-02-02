// Array to hold the menu items data
let menuData = {
    breakfast: [],
    lunch: [],
    dinner: [],
    drinks: []
};

// Function to show the active menu
function showMenu(meal) {
    // Hide all menus
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));

    // Show the selected menu
    document.getElementById(`${meal}Menu`).classList.add('active');
}

// Function to remove a menu item
function removeItem(button) {
    const item = button.parentElement;
    const menu = item.closest('.menu');
    const menuId = menu.id.replace('Menu', '').toLowerCase(); // Get the menu name (breakfast, lunch, etc.)
    
    // Remove from menuData
    const index = menuData[menuId].indexOf(item);
    if (index !== -1) {
        menuData[menuId].splice(index, 1);
    }

    item.remove();
}

// Function to add a new menu item
function addItem(menu) {
    const menuList = document.getElementById(`${menu}Items`);
    const newItem = document.createElement('li');
    
    // Adding input fields for customization
    newItem.innerHTML = `
        <input type="text" placeholder="Title" class="title-input" />
        <textarea placeholder="Description" class="description-input"></textarea>
        <button class="remove-btn" onclick="removeItem(this)">🗑️</button>
        <button class="edit-btn" onclick="saveCustomItem(this)">✏️ Save</button>
    `;
    menuList.appendChild(newItem);
}

// Function to save custom item after editing
function saveCustomItem(button) {
    const item = button.parentElement;
    const titleInput = item.querySelector('.title-input');
    const descriptionInput = item.querySelector('.description-input');

    // Save input values into menuData
    const menuId = item.closest('.menu').id.replace('Menu', '').toLowerCase(); 
    menuData[menuId].push({
        title: titleInput.value,
        description: descriptionInput.value
    });

    // Replace inputs with saved data
    item.innerHTML = `
        <span>${titleInput.value}</span>
        <div class="description">${descriptionInput.value}</div>
        <button class="remove-btn" onclick="removeItem(this)">🗑️</button>
        <button class="edit-btn" onclick="editItem(this)">✏️ Edit</button>
    `;
}

// Function to save the menu to the customer side (Site B)
function saveMenu(menu) {
    const menuList = document.getElementById(`${menu}Items`);
    const items = [];
    menuList.querySelectorAll('li').forEach(item => {
        const title = item.querySelector('.title-input') ? item.querySelector('.title-input').value : item.querySelector('span').textContent;
        const description = item.querySelector('.description-input') ? item.querySelector('.description-input').value : item.querySelector('.description').textContent;
        items.push({ title, description });
    });

    // Log saved menu (or send to customer side)
    console.log(`Saved ${menu} Menu:`, items);
    // Here, you can send this data to the customer side (Site B)
}

// Fetch the updated menu when Site B loads (optional)
async function fetchMenuData() {
    const response = await fetch('https://raw.githubusercontent.com/your-github-username/restaurant-menu/main/menu.json');
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
