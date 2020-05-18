const productsInit = require('../modules/products')
const promotionsInit = require('../modules/promotions')
const checkoutInit = require('../modules/checkout')

// Initialize application modules
module.exports = async (app, express) => {
    await productsInit(app, express);
    await promotionsInit(app, express);
    await checkoutInit(app, express)
}