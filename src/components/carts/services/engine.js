// Carts engine service object
module.exports = (mongoose) => {

    // Load dependencies
    const productsRepo = require('../../products/services/repository')(mongoose);
    const uuid = require('uuid-random');

    return {

        // Appraise given cart
        async appraise(cart) {

            // Get included products
            const products = await productsRepo.get({sku: { $in: cart.items.map(i => i.sku) }});

            // Calculate totals/subtotals based on most current item prises and its quantities
            cart.subtotal = cart.items.reduce((subtotal, item) => {
                const product = products.find((prod) => prod.sku === item.sku);
                item.price = product.price;
                item.subtotal = (item.price * item.quantity);
                item.total = item.subtotal;
                return item.subtotal + subtotal;
            }, 0);
            cart.total = cart.subtotal;

            // Stamp appraisal moment and return cart
            cart.appraisedAt = Date.now();
            return cart;
        },

        // Checkout given cart by applying promotions
        async checkout(cart) {
            const cartSchema = require('../models/cart')(mongoose, this).schema;
            const Checkout = require('../models/checkout')(mongoose, cartSchema);

            // Build basic checkout using the appraised cart
            const checkout = new Checkout({
                code: uuid(),
                moment: Date.now(),
                cart: await cart.appraise(),
            });

            // Apply promotions
            const promoEngine = require('../../promotions/services/engine')(mongoose);
            await promoEngine.applyPromotions(checkout.cart);

            // Calculate grand totals
            this.calculateTotals(checkout.cart);
            checkout.subtotal = checkout.cart.subtotal;
            checkout.discount = checkout.cart.discount;
            checkout.total = checkout.cart.total;

            // Return checkout
            return checkout;
        },

        // Calculate totals on items and the cart
        calculateTotals(cart) {
            cart.total = cart.items.reduce((total, item) => {
                item.total = Number.parseFloat((item.subtotal - item.discount).toFixed(2));
                return item.total + total;
            }, 0);
            return cart;
        },
    };
};