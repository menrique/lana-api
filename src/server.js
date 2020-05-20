// Application server
module.exports = async () => {

    // Load configuration
    const config = require('./config');

    // Initialize application
    const init = require('./initializers');
    const app = await init(config);

    // Serve the app using the configured port
    return app.listen(config.port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server listening on port ${config.port} (${config.environment})`);
    });
}