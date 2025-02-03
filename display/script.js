async function fetchMenuData() {
  try {
    const response = await fetch('https://menu-updater-admin.netlify.app/.netlify/functions/menuFunctions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to fetch data');
    
    const data = await response.json();
    updateMenuDisplay(data);
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }
}
