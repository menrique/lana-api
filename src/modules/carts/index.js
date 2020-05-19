// Module initializer
module.exports = async (app, express, mongoose) => {

    // Create the module router
    const router = express.Router();

    // Load services
    const engine = require('./services/engine')(mongoose);
    const repository = require('./services/repository')(mongoose, engine);

    // Reset the repository with fresh data
    repository.reset().then(r => console.log('Carts available.'));

    // *** Routes ***

    // Get all carts
    router.get('/', (req, res) => {
        repository.get().then(carts => res.json(carts).status(200));
    });

    // Get given cart
    router.get('/:code', (req, res) => {
        repository.find(req.params.code).then(
            cart => cart.toJSONAsync().then(
                json => res.send(json).status(200)
            )
        );
    });

    // Checkout given cart
    router.get('/:code/checkout', (req, res) => {
        repository.find(req.params.code).then(
            cart => engine.checkout(cart).then(
                json => res.send(json).status(200)
            )
        );
    });

    // Register the router
    app.use('/carts', router);
}