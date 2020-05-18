const logger = require('morgan');
const bodyParser = require('body-parser');
const modulesInit = require('./modules')

// Express initializer
module.exports = async (express) => {

    // Create express application
    const app = express();

    // Set logger
    app.use(logger('tiny'));

    // Allow rich objects and arrays to be encoded in the URL
    app.use(bodyParser.urlencoded({ extended: true }));

    // Load application modules
    await modulesInit(app, express);

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
}