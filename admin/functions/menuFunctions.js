// menuFunctions.js (Netlify Function)

exports.handler = async function(event, context) {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://menu17.netlify.app',  // Allow only this origin (customer site)
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Allow necessary headers
    };

    // Handle the preflight OPTIONS request (CORS)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
            body: ''
        };
    }

    // Handle the GET request for fetching the menu
    if (event.httpMethod === 'GET') {
        try {
            // Sample menu data (replace with your actual data retrieval logic)
            const menuData = {
                breakfast: [
                    { title: "Eggs", description: "Eggs with cheese and pepper" }
                ],
                lunch: [
                    { title: "Burger", description: "Beef patty with lettuce" }
                ],
                dinner: [
                    { title: "Steak", description: "Grilled steak with potatoes" }
                ],
                drinks: [
                    { title: "Coffee", description: "Hot brewed coffee" }
                ]
            };

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(menuData) // Return the menu data as JSON
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: 'Failed to fetch menu data' })
            };
        }
    } else {
        // Handle unsupported HTTP methods
        return {
            statusCode: 405,
            headers: headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
