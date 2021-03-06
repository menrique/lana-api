// Express initializer
module.exports = async (express, mongoose) => {

    // Create express application
    const app = express();

    // Set logger
    const logger = require('morgan');
    app.use(logger('tiny'));

    // Allow rich objects and arrays to be encoded in the URL
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

    // Load application components
    const modulesInit = require('./components')
    await modulesInit(app, express, mongoose);

    // Handle missing routes
    app.use((req, res, next) => {
        const err = new Error(`${req.method} ${req.url} Not Found`);
        err.status = 404;
        next(err);
    });

    // Handle errors
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
            },
        });
    });

    // Return the express app
    return app;
};