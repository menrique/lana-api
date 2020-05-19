// Carts repository service object
module.exports = (mongoose, engine) => {

    // Set cart model
    const Cart = require('../models/cart')(mongoose, engine)

    return {

        // Clear the repository
        async clear() {
            await Cart.deleteMany({});
        },

        // Seed the repository with sample carts
        async seed() {
            const carts = [
                {
                    code: 'f606c7c5-3f51-40b9-88cd-2cd7fc224898',
                    items: [
                        {
                            sku: '43N23P',
                            name: 'MacBook Pro',
                            quantity: 1
                        },
                        {
                            sku: '234234',
                            name: 'Raspberry Pi B',
                            quantity: 1
                        },
                    ],
                },
                {
                    code: '3185dcd8-2b87-4ce7-8cc3-5547a6a7558b',
                    items: [
                        {
                            sku: '120P90',
                            name: 'Google Home',
                            quantity: 3
                        },
                    ],
                },
                {
                    code: '2050ed8d-54f2-470a-ace4-1911df214409',
                    items: [
                        {
                            sku: 'A304SD',
                            name: 'Alexa Speaker',
                            quantity: 3
                        },
                    ],
                },
            ];
            Cart.insertMany(carts, (error, docs) => {
                if (error) {
                    console.log(`MongoDB connection error: ${error}`);
                }
            });
        },

        // Reset the repository
        async reset() {
            this.clear().then(r => this.seed());
        },

        // Get carts searching by given criteria
        async get(criteria = {}) {
            return await Cart.find(criteria);
        },

        // Find cart by code
        async find(code) {
            return Cart.findOne({code: code});
        }
    };
};