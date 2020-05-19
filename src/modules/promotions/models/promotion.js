// Product model definition
module.exports = (mongoose) => {

    // Define schema
    const schema = new mongoose.Schema({
        code: String,
        description: String,
        type: String,
        rule: {
            target: {
                sku: String,
                quantity: Number,
            },
            bonus: {
                sku: String,
                quantity: Number,
                price: Number,
                percent: Boolean,
            },
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
}