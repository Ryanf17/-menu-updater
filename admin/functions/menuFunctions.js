exports.handler = async function(event, context) {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // 🔥 TEMPORARY: Allow all origins (for testing)
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
            body: ''
        };
    }

    try {
        const menuData = {
            breakfast: [
                { title: "Eggs", description: "Eggs with cheese and pepper" }
            ]
        };

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(menuData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ error: 'Failed to fetch menu data' })
        };
    }
};
