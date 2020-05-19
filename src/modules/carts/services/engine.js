// Carts repository service object
module.exports = (mongoose) => {

    // Set cart model
    const productsRepo = require('../../products/services/repository')(mongoose);
    const promotionsRepo = require('../../promotions/services/repository')(mongoose);

    return {

        // Appraise given cart
        async appraise(cart) {
            const products = await productsRepo.get({sku: { $in: cart.items.map(i => i.sku) }});
            return cart.items.reduce((total, item) => {
                const product = products.find((prod) => prod.sku === item.sku);
                return (product.price * item.quantity) + total;
            }, 0);
        },

        // Checkout given cart by applying promotions
        async checkout(cart) {
            return {}
        },
    }
}