// Promotions engine service object
module.exports = (mongoose) => {

    // Load dependencies
    const promotionsRepo = require('../../promotions/services/repository')(mongoose);

    return {

        // Apply
        async applyPromotions(cart) {

            // Get line items
            const items = cart.items;

            // Get available promos
            const promotions = await promotionsRepo.get({
                'target.sku': {$in: items.map(i => i.sku)}
            });

            // Apply to items
            promotions.forEach(promotion => {
                const prize_item = items.find((i) => i.sku === promotion.prize.sku);
                if (prize_item !== undefined) {
                    this.rules[promotion.type](prize_item, promotion);
                }
            });

            // Set discounts
            cart.discount = cart.items.reduce((total, item) => {
                return item.discount + total;
            }, 0);

            return cart;
        },

        // Promo rules
        rules: {
            // Match rule
            match(prize_item, promotion) {
                const result = prize_item.sku === promotion.prize.sku;
                if (result) {
                    prize_item.promotions.push({
                        code: promotion.code,
                        description: promotion.description,
                    });
                }
                return result;
            },

            // Buy a product to get free items
            buyGetFree(prize_item, promotion) {
                if (this.match(prize_item, promotion)) {
                    prize_item.discount += prize_item.price * promotion.prize.quantity;
                }
            },

            // Buy a product to get a discount in some items
            buyGetDiscount(prize_item, promotion) {
                if (this.match(prize_item, promotion)) {
                    const prizeDiscount = this.helpers.prizeDiscount(prize_item, promotion),
                        prizeQuantity = this.helpers.prizeQuantity(prize_item, promotion)
                    prize_item.discount += Number.parseFloat((prizeDiscount * prizeQuantity).toFixed(2));
                }
            },

            helpers: {
                // Calculate discount (percent vs fixed price)
                prizeDiscount(prize_item, promotion) {
                    const discount = promotion.prize.discount,
                        percent = promotion.prize.percent,
                        price = prize_item.price;
                    return percent ? (price / 100 * discount) : price - discount;
                },

                // Calculate quantity
                prizeQuantity(prize_item, promotion) {
                    const quantity = promotion.prize.quantity;
                    return quantity === null ? prize_item.quantity : quantity;
                },
            },
        }
    };
};