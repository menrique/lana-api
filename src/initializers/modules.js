// Initialize application modules
module.exports = async (app, express, mongoose) => {
    await require('../modules/products')(app, express, mongoose);
    await require('../modules/promotions')(app, express, mongoose);
    await require('../modules/carts')(app, express, mongoose);
}