// Module initializer
module.exports = async (app, express, mongoose) => {

    // Create the module router
    const router = express.Router();

    // Load services
    const repository = require('./services/repository')(mongoose);

    // Reset the repository with fresh data
    repository.reset().then(r => console.log('Promotions available.'));

    // *** Routes ***

    // Get all promotions
    router.get('/', (req, res) => {
        repository.get().then(promotions => res.json(promotions).status(200))
    })

    // Register the router
    app.use('/promotions', router);
}