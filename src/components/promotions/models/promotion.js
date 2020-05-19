// Product model definition
module.exports = (mongoose) => {

    // Set schema
    const schema = new mongoose.Schema({
        code: String,
        description: String,
        type: String,
        target: {
            sku: String,
            quantity: Number,
        },
        prize: {
            sku: String,
            quantity: Number,
            discount: Number,
            percent: Boolean,
        },
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
    const {Promotion} = mongoose.models;
    return Promotion || mongoose.model('Promotion', schema);
};