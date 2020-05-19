// Product model definition
module.exports = (mongoose) => {

    // Set schema
    const schema = new mongoose.Schema({
        sku: String,
        name: String,
        price: Number,
        quantity: Number,
    }, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    });

    // Return model
    const {Product} = mongoose.models;
    return Product || mongoose.model('Product', schema);
};