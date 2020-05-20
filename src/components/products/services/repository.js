// Products repository service object
module.exports = (mongoose) => {

    // Set product model
    const Product = require('../models/product')(mongoose)

    return {

        // Clear the repository
        async clear() {
            await Product.deleteMany({});
        },

        // Seed the repository with sample products
        async seed() {
            const products = [
                { sku: '120P90', name: 'Google Home', price: 49.99, quantity: 10 },
                { sku: '43N23P', name: 'MacBook Pro', price: 5399.99, quantity: 5 },
                { sku: 'A304SD', name: 'Alexa Speaker', price: 109.50, quantity: 10 },
                { sku: '234234', name: 'Raspberry Pi B', price: 30.00, quantity: 2 },
            ];
            Product.insertMany(products, (error, docs) => {
                if (error) {
                    console.log(`MongoDB connection error: ${error}`);
                }
            });
        },

        // Reset the repository
        async reset() {
            this.clear().then(r => this.seed());
        },

        // Get products searching by given criteria
        async get(criteria = {}) {
            return await Product.find(criteria);
        },
    };
};