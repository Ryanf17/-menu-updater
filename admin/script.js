let menuData = {
    breakfast: [],
    lunch: [],
    dinner: [],
    drinks: []
};

function showMenu(meal) {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
    document.getElementById(`${meal}Menu`).classList.add('active');
}

function removeItem(button) {
    const item = button.parentElement;
    const menu = item.closest('.menu');
    const menuId = menu.id.replace('Menu', '').toLowerCase();
    
    const index = menuData[menuId].findIndex(obj => obj.title === item.querySelector('span').textContent);
    if (index !== -1) menuData[menuId].splice(index, 1);

    item.remove();
}

function addItem(menu) {
    const menuList = document.getElementById(`${menu}Items`);
    const newItem = document.createElement('li');
    
    newItem.innerHTML = `
        <input type="text" placeholder="Title" class="title-input" />
        <textarea placeholder="Description" class="description-input"></textarea>
        <button class="remove-btn" onclick="removeItem(this)">🗑️</button>
        <button class="edit-btn" onclick="saveCustomItem(this)">✏️ Save</button>
    `;
    menuList.appendChild(newItem);
}

function saveCustomItem(button) {
    const item = button.parentElement;
    const titleInput = item.querySelector('.title-input');
    const descriptionInput = item.querySelector('.description-input');

    const menuId = item.closest('.menu').id.replace('Menu', '').toLowerCase();
    menuData[menuId].push({
        title: titleInput.value,
        description: descriptionInput.value
    });

    item.innerHTML = `
        <span>${titleInput.value}</span>
        <div class="description">${descriptionInput.value}</div>
        <button class="remove-btn" onclick="removeItem(this)">🗑️</button>
    `;
}

async function saveMenu() {
    try {
        const response = await fetch('https://menu-updater-admin.netlify.app/.netlify/functions/menuFunctions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuData)
        });

        const result = await response.json();
        console.log('Menu saved successfully:', result);

    } catch (error) {
        console.error('Error saving menu:', error);
    }
}

document.getElementById('saveMenuButton').addEventListener('click', saveMenu);
