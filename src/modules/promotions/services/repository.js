// Promotions repository service object
module.exports = (mongoose) => {

    // Set promotion model
    const Promotion = require('../models/promotion')(mongoose)

    return {

        // Clear the repository
        async clear() {
            await Promotion.deleteMany({});
        },

        // Seed the repository with sample promotions
        async seed() {
            const promotions = [
                {
                    code: '20P01',
                    description: 'But 1 MacBook Pro and get a free Raspberry Pi B',
                    type: 'BuyGetFree',
                    rule: {
                        target: {
                            sku: '43N23P',
                            quantity: 1,
                        },
                        bonus: {
                            sku: '234234',
                            quantity: 1,
                            price: 0,
                            percent: false,
                        },
                    }
                },
                {
                    code: '20P08',
                    description: 'Buy 3 Google Homes for the price of 2',
                    type: 'BuyGetDiscount',
                    rule: {
                        target: {
                            sku: '120P90',
                            quantity: '3',
                        },
                        bonus: {
                            sku: '120P90',
                            quantity: 1,
                            price: 0,
                            percent: false,
                        },
                    },
                },
                {
                    code: '20P13',
                    description: 'Buy more than 3 Alexa Speakers and get 10% discount on all Alexa speakers',
                    type: 'BuyGetDiscount',
                    rule: {
                        target: {
                            sku: 'A304SD',
                            quantity: 3,
                        },
                        bonus: {
                            sku: 'A304SD',
                            quantity: null,
                            price: 10,
                            percent: true,
                        },
                    },
                },
            ];
            Promotion.insertMany(promotions, (error, docs) => {
                if (error) {
                    console.log(`MongoDB connection error: ${error}`);
                }
            });
        },

        // Reset the repository
        async reset() {
            this.clear().then(r => this.seed());
        },

        // Get promotions searching by given criteria
        async get(criteria = {}) {
            return await Promotion.find(criteria);
        }
    }
}