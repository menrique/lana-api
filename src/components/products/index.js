// Module initializer
module.exports = async (app, express, mongoose) => {

    // Create the module router
    const router = express.Router();

    // Load services
    const repository = require('./services/repository')(mongoose);

    // Reset the repository with fresh data
    repository.reset().then(r => console.log('Products available.'));

    // *** Routes ***

    // Get all products
    router.get('/', (req, res) => {
        repository.get().then(products => res.json(products).status(200))
    })

    // Register the router
    app.use('/products', router);
};