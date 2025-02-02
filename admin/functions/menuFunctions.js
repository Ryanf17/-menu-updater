exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://menu17.netlify.app', // Allow access from the customer site
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',     // Allow these methods
    'Access-Control-Allow-Headers': 'Content-Type',               // Allow Content-Type header
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight check' }),
    };
  }

  try {
    // Replace this with actual dynamic data if necessary
    const menuData = {
      breakfast: [{ title: 'Pancakes', description: 'Delicious pancakes with syrup' }],
      lunch: [{ title: 'Burger', description: 'Juicy beef burger with lettuce' }],
      dinner: [{ title: 'Steak', description: 'Grilled steak with vegetables' }],
      drinks: [{ title: 'Coffee', description: 'Hot brewed coffee' }],
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(menuData), // Return the actual menu data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Error fetching menu data', error }),
    };
  }
};
