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

// Function to send updated menu to backend
async function pushMenuData() {
    const menu = {
        breakfast: [],
        lunch: [],
        dinner: [],
        drinks: []
    };

    // Collect menu items
    document.querySelectorAll('.menu').forEach(menuElement => {
        const menuId = menuElement.id.replace('Menu', '').toLowerCase();
        const items = menuElement.querySelectorAll('li');
        items.forEach(item => {
            const title = item.querySelector('.title-input') ? item.querySelector('.title-input').value : item.querySelector('span').textContent;
            const description = item.querySelector('.description-input') ? item.querySelector('.description-input').value : item.querySelector('.description').textContent;
            menu[menuId].push({ title, description });
        });
    });

    // Send updated menu to backend (Netlify or GitHub API)
    const response = await fetch('https://your-netlify-endpoint-or-github-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu) // Send the updated menu data
    });

    if (response.ok) {
        console.log('Menu updated successfully!');
    } else {
        console.error('Failed to update the menu.');
    }
}

// Call pushMenuData when needed (e.g., when you save the menu)
document.getElementById('saveMenuButton').addEventListener('click', pushMenuData);
