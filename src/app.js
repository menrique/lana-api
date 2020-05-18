// Dependencies
const express = require("express");
const init = require('./initializers');
const config = require('./config');

// Application starter
async function startApp() {

    // Initialize the application
    const app = await init(express, config);

    // Serve the app using the configured port
    app.listen(config.port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server listening on port ${config.port} (${config.environment})`);
    });
}
startApp().then(r => console.log('Application started!'));