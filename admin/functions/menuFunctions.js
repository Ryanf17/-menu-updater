const menuStorage = { 
    breakfast: [], 
    lunch: [], 
    dinner: [], 
    drinks: [] 
};

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify(menuStorage)
        };
    } else if (event.httpMethod === 'POST') {
        try {
            const newMenu = JSON.parse(event.body);
            Object.assign(menuStorage, newMenu); // Update menu
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Menu updated successfully", menu: menuStorage })
            };
        } catch (error) {
            return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON data" }) };
        }
    }

    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
};
