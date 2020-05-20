const request = require('supertest');
const server = require('../src/server')

describe('Example Scenarios', () => {
    let testingServer;

    before(async () => {
        testingServer = await server();
    })

    after((done) => {
        testingServer.close(done);
    });

    describe('1. Get available products', () => {
        const route = '/products';
        const response = [
            {
                "sku": "120P90",
                "name": "Google Home",
                "price": 49.99,
                "quantity": 10
            },
            {
                "sku": "43N23P",
                "name": "MacBook Pro",
                "price": 5399.99,
                "quantity": 5
            },
            {
                "sku": "A304SD",
                "name": "Alexa Speaker",
                "price": 109.5,
                "quantity": 10
            },
            {
                "sku": "234234",
                "name": "Raspberry Pi B",
                "price": 30,
                "quantity": 2
            }
        ];

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('2. Get available promotions', () => {
        const route = '/promotions';
        const response = [
            {
                "target": {
                    "sku": "43N23P",
                    "quantity": 1
                },
                "prize": {
                    "sku": "234234",
                    "quantity": 1,
                    "discount": null,
                    "percent": false
                },
                "code": "20P01",
                "description": "But 1 MacBook Pro and get a free Raspberry Pi B",
                "type": "buyGetFree"
            },
            {
                "target": {
                    "sku": "120P90",
                    "quantity": 3
                },
                "prize": {
                    "sku": "120P90",
                    "quantity": 1,
                    "discount": 100,
                    "percent": true
                },
                "code": "20P08",
                "description": "Buy 3 Google Homes for the price of 2",
                "type": "buyGetDiscount"
            },
            {
                "target": {
                    "sku": "A304SD",
                    "quantity": 3
                },
                "prize": {
                    "sku": "A304SD",
                    "quantity": null,
                    "discount": 10,
                    "percent": true
                },
                "code": "20P13",
                "description": "Buy more than 3 Alexa Speakers and get 10% discount on all Alexa speakers",
                "type": "buyGetDiscount"
            }
        ];

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('3. Get available carts (No appraisal in the index)', () => {
        const route = '/carts';
        const response = [
            {
                "subtotal": 0,
                "discount": 0,
                "total": 0,
                "code": "f606c7c5-3f51-40b9-88cd-2cd7fc224898",
                "items": [
                    {
                        "price": 0,
                        "quantity": 1,
                        "subtotal": 0,
                        "discount": 0,
                        "total": 0,
                        "promotions": [],
                        "sku": "43N23P",
                        "name": "MacBook Pro"
                    },
                    {
                        "price": 0,
                        "quantity": 1,
                        "subtotal": 0,
                        "discount": 0,
                        "total": 0,
                        "promotions": [],
                        "sku": "234234",
                        "name": "Raspberry Pi B"
                    }
                ]
            },
            {
                "subtotal": 0,
                "discount": 0,
                "total": 0,
                "code": "3185dcd8-2b87-4ce7-8cc3-5547a6a7558b",
                "items": [
                    {
                        "price": 0,
                        "quantity": 3,
                        "subtotal": 0,
                        "discount": 0,
                        "total": 0,
                        "promotions": [],
                        "sku": "120P90",
                        "name": "Google Home"
                    }
                ]
            },
            {
                "subtotal": 0,
                "discount": 0,
                "total": 0,
                "code": "2050ed8d-54f2-470a-ace4-1911df214409",
                "items": [
                    {
                        "price": 0,
                        "quantity": 3,
                        "subtotal": 0,
                        "discount": 0,
                        "total": 0,
                        "promotions": [],
                        "sku": "A304SD",
                        "name": "Alexa Speaker"
                    }
                ]
            }
        ];

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('4. Get cart with MacBook Pro, Raspberry Pi B (Total: $5,429.99)', () => {
        const route = '/carts/f606c7c5-3f51-40b9-88cd-2cd7fc224898';
        const response = {
            "subtotal": 5429.99,
            "discount": 0,
            "total": 5429.99,
            "code": "f606c7c5-3f51-40b9-88cd-2cd7fc224898",
            "items": [
                {
                    "price": 5399.99,
                    "quantity": 1,
                    "subtotal": 5399.99,
                    "discount": 0,
                    "total": 5399.99,
                    "promotions": [],
                    "sku": "43N23P",
                    "name": "MacBook Pro"
                },
                {
                    "price": 30,
                    "quantity": 1,
                    "subtotal": 30,
                    "discount": 0,
                    "total": 30,
                    "promotions": [],
                    "sku": "234234",
                    "name": "Raspberry Pi B"
                }
            ],
        };

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('5. Get cart with Google Home, Google Home, Google Home (Total: $149.97)', () => {
        const route = '/carts/3185dcd8-2b87-4ce7-8cc3-5547a6a7558b';
        const response = {
            "subtotal": 149.97,
            "discount": 0,
            "total": 149.97,
            "code": "3185dcd8-2b87-4ce7-8cc3-5547a6a7558b",
            "items": [
                {
                    "price": 49.99,
                    "quantity": 3,
                    "subtotal": 149.97,
                    "discount": 0,
                    "total": 149.97,
                    "promotions": [],
                    "sku": "120P90",
                    "name": "Google Home"
                }
            ],
        };

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('6. Get cart with Alexa Speaker, Alexa Speaker, Alexa Speaker (Total: $328.5)', () => {
        const route = '/carts/2050ed8d-54f2-470a-ace4-1911df214409';
        const response = {
            "subtotal": 328.5,
            "discount": 0,
            "total": 328.5,
            "code": "2050ed8d-54f2-470a-ace4-1911df214409",
            "items": [
                {
                    "price": 109.5,
                    "quantity": 3,
                    "subtotal": 328.5,
                    "discount": 0,
                    "total": 328.5,
                    "promotions": [],
                    "sku": "A304SD",
                    "name": "Alexa Speaker"
                }
            ],
        };

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('7. Checkout cart with MacBook Pro, Raspberry Pi B (Total: $5,399.99)', () => {
        const route = '/carts/f606c7c5-3f51-40b9-88cd-2cd7fc224898/checkout';
        const response = {
            "subtotal": 5429.99,
            "discount": 30,
            "total": 5399.99,
            "cart": {
                "subtotal": 5429.99,
                "discount": 30,
                "total": 5399.99,
                "code": "f606c7c5-3f51-40b9-88cd-2cd7fc224898",
                "items": [
                    {
                        "price": 5399.99,
                        "quantity": 1,
                        "subtotal": 5399.99,
                        "discount": 0,
                        "total": 5399.99,
                        "promotions": [],
                        "sku": "43N23P",
                        "name": "MacBook Pro"
                    },
                    {
                        "price": 30,
                        "quantity": 1,
                        "subtotal": 30,
                        "discount": 30,
                        "total": 0,
                        "promotions": [
                            {
                                "code": "20P01",
                                "description": "But 1 MacBook Pro and get a free Raspberry Pi B"
                            }
                        ],
                        "sku": "234234",
                        "name": "Raspberry Pi B"
                    }
                ],
            }
        };

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('8. Checkout cart with Google Home, Google Home, Google Home (Total: $99.98)', () => {
        const route = '/carts/3185dcd8-2b87-4ce7-8cc3-5547a6a7558b/checkout';
        const response = {
            "subtotal": 149.97,
            "discount": 49.99,
            "total": 99.98,
            "cart": {
                "subtotal": 149.97,
                "discount": 49.99,
                "total": 99.98,
                "code": "3185dcd8-2b87-4ce7-8cc3-5547a6a7558b",
                "items": [
                    {
                        "price": 49.99,
                        "quantity": 3,
                        "subtotal": 149.97,
                        "discount": 49.99,
                        "total": 99.98,
                        "promotions": [
                            {
                                "code": "20P08",
                                "description": "Buy 3 Google Homes for the price of 2"
                            }
                        ],
                        "sku": "120P90",
                        "name": "Google Home"
                    }
                ],
            }
        };

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });

    describe('9. Checkout cart with Alexa Speaker, Alexa Speaker, Alexa Speaker (Total: $295.65)', () => {
        const route = '/carts/2050ed8d-54f2-470a-ace4-1911df214409/checkout';
        const response = {
            "subtotal": 328.5,
            "discount": 32.85,
            "total": 295.65,
            "cart": {
                "subtotal": 328.5,
                "discount": 32.85,
                "total": 295.65,
                "code": "2050ed8d-54f2-470a-ace4-1911df214409",
                "items": [
                    {
                        "price": 109.5,
                        "quantity": 3,
                        "subtotal": 328.5,
                        "discount": 32.85,
                        "total": 295.65,
                        "promotions": [
                            {
                                "code": "20P13",
                                "description": "Buy more than 3 Alexa Speakers and get 10% discount on all Alexa speakers"
                            }
                        ],
                        "sku": "A304SD",
                        "name": "Alexa Speaker"
                    }
                ],
            }
        };

        describe(route, () => {

            it('should respond with the proper JSON', (done) => {
                request(testingServer)
                    .get(route)
                    .expect('Content-Type', /json/)
                    .expect(200,
                        response,
                        done);
            });
        });
    });
});