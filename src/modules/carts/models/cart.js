// Cart model definition
module.exports = (mongoose, engine) => {

    // Define cart item schema
    const itemSchema = new mongoose.Schema({
        sku: String,
        name: String,
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

    // Define cart schema
    const cartSchema = new mongoose.Schema({
        code: String,
        items: [itemSchema]
    }, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        }
    });

    // Appraise cart using given engine
    cartSchema.methods.appraise = async function (appraisal = engine) {
        return await appraisal.appraise(this);
    };

    // Convert to JSON async
    cartSchema.methods.toJSONAsync = async function () {
        const ret = this.toJSON();
        ret.amount = await this.appraise();
        return ret;
    };

    // Return model
    const {Cart} = mongoose.models;
    return Cart || mongoose.model('Cart', cartSchema);
}