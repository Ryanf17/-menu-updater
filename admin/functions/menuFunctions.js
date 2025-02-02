const fs = require('fs');
const path = require('path');

// Define the path to your menu file
const menuFilePath = path.join(__dirname, '../menu.json');

// Helper function to read the menu file
const readMenuData = () => {
    return JSON.parse(fs.readFileSync(menuFilePath, 'utf8'));
};

// Helper function to write to the menu file
const writeMenuData = (data) => {
    fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2));
};

exports.handler = async function(event, context) {
    const method = event.httpMethod;

    // Handle GET request (Fetch the current menu)
    if (method === 'GET') {
        try {
            const menuData = readMenuData();
            return {
                statusCode: 200,
                body: JSON.stringify(menuData),
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error fetching menu data', error: err }),
            };
        }
    }

    // Handle POST request (Add a new menu item)
    if (method === 'POST') {
        try {
            const body = JSON.parse(event.body);  // Parse incoming request body
            const { category, title, description } = body;

            const menuData = readMenuData();
            if (!menuData[category]) {
                menuData[category] = [];
            }

            menuData[category].push({ title, description });
            writeMenuData(menuData);

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Menu item added successfully!' }),
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error adding menu item', error: err }),
            };
        }
    }

    // Handle PUT request (Update an existing menu item)
    if (method === 'PUT') {
        try {
            const body = JSON.parse(event.body);  // Parse incoming request body
            const { category, title, newTitle, newDescription } = body;

            const menuData = readMenuData();
            if (menuData[category]) {
                const item = menuData[category].find(item => item.title === title);
                if (item) {
                    item.title = newTitle || item.title;
                    item.description = newDescription || item.description;
                    writeMenuData(menuData);

                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Menu item updated successfully!' }),
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ message: 'Menu item not found' }),
                    };
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Category not found' }),
                };
            }
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error updating menu item', error: err }),
            };
        }
    }

    // Handle DELETE request (Remove a menu item)
    if (method === 'DELETE') {
        try {
            const body = JSON.parse(event.body);  // Parse incoming request body
            const { category, title } = body;

            const menuData = readMenuData();
            if (menuData[category]) {
                const index = menuData[category].findIndex(item => item.title === title);
                if (index !== -1) {
                    menuData[category].splice(index, 1);  // Remove the item
                    writeMenuData(menuData);

                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Menu item deleted successfully!' }),
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ message: 'Menu item not found' }),
                    };
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Category not found' }),
                };
            }
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error deleting menu item', error: err }),
            };
        }
    }

    // If method is not GET, POST, PUT, or DELETE
    return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};
