// Cart model definition
module.exports = (mongoose, engine) => {

    // Set applied promotion schema
    const appliedPromoSchema = new mongoose.Schema({
        code: String,
        description: String,
    }, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    });

    // Set cart item schema
    const itemSchema = new mongoose.Schema({
        sku: String,
        name: String,
        price: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        promotions: [appliedPromoSchema],

        subtotal: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    }, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    });

    // Set cart schema
    const cartSchema = new mongoose.Schema({
        code: String,
        items: [itemSchema],
        appraisedAt: Date,

        subtotal: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    }, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret._id;
                delete ret.__v;
                delete ret.appraisedAt;
                return ret;
            },
        }
    });

    // Set appraise method using given engine
    cartSchema.methods.appraise = async function (appraisal = engine) {
        return await appraisal.appraise(this);
    };

    // Convert to JSON async to include prices and owed amounts
    cartSchema.methods.toJSONAsync = async function () {
        await this.appraise();
        return this.toJSON();
    };

    // Return model
    const {Cart} = mongoose.models;
    return Cart || mongoose.model('Cart', cartSchema);
};