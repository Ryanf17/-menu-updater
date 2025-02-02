// menuFunctions.js (Netlify Function)

exports.handler = async function(event, context) {
    // Handle CORS headers for cross-origin requests
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow all origins (use specific domain if you prefer)
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Allow necessary headers
    };

    // Check if the request is a GET (could be other methods like POST, PUT, DELETE)
    if (event.httpMethod === 'GET') {
        try {
            // Replace this with actual data fetching or static menu data
            const menuData = {
                breakfast: [
                    { title: "Pancakes", description: "Fluffy pancakes served with syrup" },
                    { title: "Omelette", description: "Eggs with cheese and vegetables" }
                ],
                lunch: [
                    { title: "Burger", description: "Beef patty with cheese and lettuce" },
                    { title: "Salad", description: "Fresh greens with dressing" }
                ],
                dinner: [
                    { title: "Steak", description: "Grilled steak served with mashed potatoes" },
                    { title: "Pasta", description: "Spaghetti with marinara sauce" }
                ],
                drinks: [
                    { title: "Coffee", description: "Hot brewed coffee" },
                    { title: "Juice", description: "Fresh orange juice" }
                ]
            };

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(menuData) // Send the menu data as JSON
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: 'Failed to fetch menu data' })
            };
        }
    } else {
        return {
            statusCode: 405,
            headers: headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
