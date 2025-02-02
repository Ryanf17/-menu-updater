function showMenu(meal) {
    // Hide all menus
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));

    // Show the selected menu
    document.getElementById(`${meal}Menu`).classList.add('active');
}

// Function to remove a menu item
function removeItem(button) {
    const item = button.parentElement;
    item.remove();
}

// Function to add a new menu item (you can customize this to add input fields for customization)
function addItem(menu) {
    const menuList = document.getElementById(`${menu}Items`);
    const newItem = document.createElement('li');
    newItem.innerHTML = `
        <span>New Menu Item</span>
        <div class="description">Description of the new item.</div>
        <button class="remove-btn" onclick="removeItem(this)">🗑️</button>
    `;
    menuList.appendChild(newItem);
}

// Display the current date in MM/DD/YYYY format
function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Set the current date in the date div
document.getElementById('currentDate').textContent = formatDate(new Date());
