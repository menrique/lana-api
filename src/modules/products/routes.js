module.exports = (express) => {

    // Create the module router
    const router = express.Router();

    // Register verbs
    router.get('/', (req, res) => {
        return res.json({ response: 'Ok' }).status(200);
    })

    // Return router
    return router
}