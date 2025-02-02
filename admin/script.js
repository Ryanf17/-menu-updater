// Set the current date in MM/DD/YYYY format
function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Set date field value on page load
document.getElementById('date').value = formatDate(new Date());

// Handle form submission
document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const menuName = document.getElementById('menuName').value;
    const menuItems = document.getElementById('menuItems').value;
    const date = document.getElementById('date').value;

    const menuData = {
        menuName: menuName,
        menuItems: menuItems.split(','),
        date: date
    };

    fetch('https://your-netlify-site-b-url/submit-menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Menu updated successfully!');
        document.getElementById('menuForm').reset();
    })
    .catch(error => {
        alert('Error updating menu!');
        console.error('Error:', error);
    });
});
