const routes = require('./routes')

// Module initializer
module.exports = async (app, express) => {

    // Register routes
    app.use('/promotions', routes(express));
}