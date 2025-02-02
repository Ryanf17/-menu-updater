document.addEventListener('DOMContentLoaded', function() {
    fetch('https://your-netlify-site-b-url/menu.json')
        .then(response => response.json())
        .then(menuData => {
            const menuContainer = document.getElementById('restaurantMenu');
            menuContainer.innerHTML = `
                <h2>${menuData.menuName}</h2>
                <p>Date: ${menuData.date}</p>
                <ul>
                    ${menuData.menuItems.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
            document.getElementById('restaurantMenu').innerHTML = 'Failed to load menu.';
        });
});
