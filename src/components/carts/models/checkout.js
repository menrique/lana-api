// Checkout model definition
module.exports = (mongoose, cartSchema) => {

    // Define checkout schema
    const checkoutSchema = new mongoose.Schema({
        code: String,
        moment: Date,
        cart: cartSchema,

        // Other fields we would need at checkout
        // - billingAddress
        // - shippingAddress
        // - shippingMethod
        // - shippingCost
        // - subTotal
        // - taxes

        subtotal: { type: Number, default: 0 },
        discount:{ type: Number, default: 0 },
        total:{ type: Number, default: 0 },
    }, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        }
    });

    // Return model
    const {Checkout} = mongoose.models;
    return Checkout || mongoose.model('Checkout', checkoutSchema);
};