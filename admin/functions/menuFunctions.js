// menuFunctions.js (Netlify Function)

exports.handler = async function(event, context) {
    const headers = {
        'Content-Type': 'application/json',
        // Replace this with your actual customer site URL
        'Access-Control-Allow-Origin': 'https://menu17.netlify.app',  // Allow only this origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Allow necessary headers
    };

    if (event.httpMethod === 'OPTIONS') {
        // Allow preflight requests (CORS)
        return {
            statusCode: 200,
            headers: headers,
            body: ''
        };
    }

    if (event.httpMethod === 'GET') {
        try {
            // Your menu data, for now using static data
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
                body: JSON.stringify(menuData) // Return menu data
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
