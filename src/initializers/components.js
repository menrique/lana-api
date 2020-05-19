// Initialize application components
module.exports = async (app, express, mongoose) => {
    await require('../components/products')(app, express, mongoose);
    await require('../components/promotions')(app, express, mongoose);
    await require('../components/carts')(app, express, mongoose);
};