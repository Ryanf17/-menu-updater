/* Global Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body and layout styles */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f7fa;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.container {
    text-align: center;
    max-width: 800px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Header Styles */
h1 {
    color: #333;
    font-size: 2.5rem;
    margin-bottom: 5px; /* Reduced margin */
    font-weight: 700;
}

.date {
    font-size: 1.2rem;
    color: #777;
    margin-top: 5px; /* Reduced margin */
    margin-bottom: 15px; /* Reduced margin */
    font-weight: 500;
}

/* Menu Button Styles */
.menu-buttons {
    margin-bottom: 30px;
}

.menu-buttons button {
    background-color: #4CAF50;
    color: #fff;
    padding: 12px 25px;
    font-size: 1.1rem;
    border: none;
    border-radius: 30px;
    margin: 0 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.menu-buttons button:hover {
    background-color: #45a049;
    transform: translateY(-3px);
}

/* Menu Styles */
.menu {
    display: none;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
}

.menu ul {
    list-style-type: none;
    padding-left: 0;
}

.menu ul li {
    margin: 12px 0;
    padding: 10px;
    background-color: #f0f4f7;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    transition: background-color 0.3s;
}

.menu ul li:hover {
    background-color: #e0e5ec;
}

.menu .description {
    font-size: 0.9rem;
    color: #777;
    margin-top: 5px;
    line-height: 1.5;
}

/* Active Menu Styles */
.menu.active {
    display: block;
    animation: fadeIn 0.5s ease-out;
}

/* Keyframes for fade-in effect */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Remove Button Styles */
.remove-btn {
    background-color: transparent;
    border: none;
    color: red;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 10px;
}

.remove-btn:hover {
    color: darkred;
}

.edit-btn {
    background-color: transparent;
    border: none;
    color: #333;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 10px;
}

/* Media Query for smaller screens */
@media (max-width: 600px) {
    .container {
        padding: 20px;
        width: 90%;
    }

    h1 {
        font-size: 2rem;
    }

    .menu-buttons button {
        padding: 10px 20px;
        font-size: 1rem;
    }
}
