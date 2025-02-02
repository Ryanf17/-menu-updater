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

    // Update the menuData array
    menuData[menu] = items;

    // Send updated menuData to Site B (GitHub or Backend)
    pushMenuData();  // Send to server or GitHub
    console.log(`Saved ${menu} Menu:`, items);
}

// Function to push updated menu data to GitHub or backend
async function pushMenuData() {
    const menuDataJson = JSON.stringify(menuData);

    // Use GitHub API or custom backend API to update the menu
    const response = await fetch('https://your-api-or-github-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer your-token-here`  // If using GitHub or protected API
        },
        body: menuDataJson
    });

    const result = await response.json();
    console.log('Menu data pushed successfully:', result);
}
