exports.handler = async function(event, context) {
  // Allow cross-origin requests from your customer site (Site B)
  const headers = {
    'Access-Control-Allow-Origin': 'https://menu17.netlify.app',  // Set this to the domain of your customer site
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow methods you will use
    'Access-Control-Allow-Headers': 'Content-Type',  // Allow content-type header
  };

  // If the method is OPTIONS (pre-flight request for CORS), return early with allowed methods and headers
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS pre-flight check' }),
    };
  }

  try {
    // Your existing logic for handling the API request goes here
    const menuData = {
      breakfast: [{ title: 'Pancakes', description: 'Delicious pancakes with syrup' }],
      lunch: [{ title: 'Burger', description: 'Juicy beef burger with lettuce' }],
      dinner: [{ title: 'Steak', description: 'Grilled steak with vegetables' }],
      drinks: [{ title: 'Coffee', description: 'Hot brewed coffee' }],
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(menuData), // Return your actual menu data here
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Error fetching menu data', error }),
    };
  }
};
