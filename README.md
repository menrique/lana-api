# Backed Engineering Code Challenge

> ### Sample Node.js (Express + Mongoose) shopping cart API.

## Problem

### Shopping Cart API
Let’s imagine that we need to build a checkout system as a standalone NodeJS API for an ecommerce platform. This 
application will have to support different promotions within a given inventory.

#### Inventory
| SKU | Name | Price | Inventory Qty |
| --- | --- | --- | --- |
| 120P90 | Google Home | $49.99 | 10 |
| 43N23P | MacBook Pro | $5,399.99 | 5 |
| A304SD | Alexa Speaker | $109.50 | 10 |
| 234234 | Raspberry Pi B | $30.00 | 2 |

#### Promotions
- Each sale of a MacBook Pro comes with a free Raspberry Pi B.
- Buy 3 Google Homes for the price of 2.
- Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers.

#### Example Scenarios
- Scanned Items: MacBook Pro, Raspberry Pi B. (Total: $5,399.99).
- Scanned Items: Google Home, Google Home, Google Home. (Total: 99.98).
- Scanned Items: Alexa Speaker, Alexa Speaker, Alexa Speaker. (Total: $295.65).

## Getting Started

### Main Dependencies

- [Node.js](https://nodejs.dev/) - JavaScript run-time environment.
- [ExpressJS](https://github.com/expressjs/express) - Web framework for handling and routing HTTP requests.
- [MongoDB](https://docs.mongodb.com/manual/installation/#tutorials) - NoSQL database for persisting data models.
- [MongooseJS](https://github.com/Automattic/mongoose) - ODM (Object Document Mapper) for modeling and mapping data.

### Running the App

To get this application running locally:

* Clone the repo and navigate to its root folder.
* Install [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/#tutorials).
* [Start MongoDB](https://docs.mongodb.com/manual/reference/program/mongod/) using `mongod`.
* Execute `npm install` to install the required dependencies.
* Create an .env file in the project root folder, and then adapt the following configuration:
```dotenv
NODE_ENV=development
PORT=3000
DATABASE_URI=mongodb://127.0.0.1/lana_api
```
- To start the local server, run `node src/app.js`. If everything goes ok, we will see something like:
```
Products available.
Promotions available.
Carts available.
Application started!
Server listening on port 3000 (development)
```

## Application Structure
```
 src
 └── app.js................................ Application's entry point. It initializes the components and start the server.
 └── config/............................... Congiguration folder.
 │  └──── index.js.........................   Loads the .env file and setup the server environment, port, and database url.
 └── initializers/......................... Initialization routines.
 │  ├──── index.js.........................   Bootup process.
 │  └──── mongoose.js......................   Loads dMongoose ODM.
 │  ├──── express.js.......................   Loads the Express routes and middlewares.
 │  ├──── components.js....................   Loads the application components.
 └── components/........................... Application components representing different application domains.
 │  └──── products/........................   Products catalog existing in the inventory.
 │  │  └──── index.js......................     Products component loader and routes mounter.
 │  │  └──── models/.......................     Products data models.
 │  │  │  └──── product.js.................     Product model.
 │  │  └──── services/.....................     Product services.
 │  │  │  └──── repository.js..............     Repository fetching products.
 │  └──── promotions/......................  Existing promotions offering discounts.
 │  │  └──── index.js......................    Promotions component loader and routes mounter.
 │  │  └──── models/.......................    Promotions data models.
 │  │  │  └──── promotion.js...............    Promotion model.
 │  │  └──── services/.....................    Promotion services.
 │  │  │  └──── repository.js..............    Repository fetching promotions.
 │  │  │  ├──── engine.js..................    Promotions logic (rules engine).
 │  └──── carts/...........................  Shoping carts with product items for checkout.
 │  │  └──── index.js......................    Carts component loader and routes mounter.
 │  │  └──── models/.......................    Carts data models.
 │  │  │  ├──── cart.js....................    Cart model
 │  │  │  └──── checkout.js................    Checkout model (includes a cart with applied promotions)
 │  │  └──── services/.....................    Cart services.
 │  │  │  └──── repository.js..............    Repository fetching carts.
 │  │  │  ├──── engine.js..................    Cart and checkout logic (cart appraisal and promotions at checkout).
```
## Seed Data
We initialized the application with the following data:
```javascript
products = [
    { sku: '120P90', name: 'Google Home', price: 49.99, quantity: 10 },
    { sku: '43N23P', name: 'MacBook Pro', price: 5399.99, quantity: 5 },
    { sku: 'A304SD', name: 'Alexa Speaker', price: 109.50, quantity: 10 },
    { sku: '234234', name: 'Raspberry Pi B', price: 30.00, quantity: 2 },
];

promotions = [
    {
        code: '20P01',
        description: 'But 1 MacBook Pro and get a free Raspberry Pi B',
        type: 'buyGetFree',
        target: {
            sku: '43N23P',
            quantity: 1,
        },
        prize: {
            sku: '234234',
            quantity: 1,
            discount: null,
            percent: false,
        },
    },
    {
        code: '20P08',
        description: 'Buy 3 Google Homes for the price of 2',
        type: 'buyGetDiscount',
        target: {
            sku: '120P90',
            quantity: '3',
        },
        prize: {
            sku: '120P90',
            quantity: 1,
            discount: 100,
            percent: true,
        },
    },
    {
        code: '20P13',
        description: 'Buy more than 3 Alexa Speakers and get 10% discount on all Alexa speakers',
        type: 'buyGetDiscount',
            target: {
                sku: 'A304SD',
                quantity: 3,
            },
            prize: {
                sku: 'A304SD',
                quantity: null,
                discount: 10,
                percent: true,
            },
    },
];

carts = [
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
```
## Testing Scenarios

#### Considerations
* For this iteration, we only considered a few examples involving available resources listing, cart appraisal and applied
promotions at the checkout.
* There is no authentication/authorization yet applied.
* The modeled data only respond to the available inventory, promotions and cart example scenarios.

#### 1. Get available products

**Request:**
```http request
GET http://localhost:3000/products
Accept: application/json
```

**Response:**
```json
[
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
]
```

#### 2. Get available promotions

**Request:**
```http request
GET http://localhost:3000/promotions
Accept: application/json
```

**Response:**
```json
[
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
]
```

#### 3. Get available carts (No appraisal in the index)

**Request:**
```http request
GET http://localhost:3000/carts
Accept: application/json
```

**Response:**
```json
[
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
]
```

#### 4. Get cart with MacBook Pro, Raspberry Pi B (Total: $5,429.99)

**Request:**
```http request
GET http://localhost:3000/carts/f606c7c5-3f51-40b9-88cd-2cd7fc224898
Accept: application/json
```

**Response:**
```json
{
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
  "appraisedAt": "2020-05-19T22:33:34.731Z"
}
```

#### 5. Get cart with Google Home, Google Home, Google Home (Total: $149.97)

**Request:**
```http request
GET http://localhost:3000/carts/3185dcd8-2b87-4ce7-8cc3-5547a6a7558b
Accept: application/json
```

**Response:**
```json
{
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
  "appraisedAt": "2020-05-19T22:33:11.155Z"
}
```

#### 6. Get cart with Alexa Speaker, Alexa Speaker, Alexa Speaker (Total: $328.5)

**Request:**
```http request
GET http://localhost:3000/carts/3185dcd8-2b87-4ce7-8cc3-5547a6a7558b
Accept: application/json
```

**Response:**
```json
{
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
  "appraisedAt": "2020-05-19T22:32:39.064Z"
}
```

#### 7. Checkout cart with MacBook Pro, Raspberry Pi B (Total: $5,399.99)

**Request:**
```http request
GET http://localhost:3000/carts/f606c7c5-3f51-40b9-88cd-2cd7fc224898/checkout
Accept: application/json
```

**Response:**
```json
{
  "subtotal": 5429.99,
  "discount": 30,
  "total": 5399.99,
  "code": "eb32aa12-7606-4b1f-95e7-2998a5290a9d",
  "moment": "2020-05-19T22:29:07.939Z",
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
    "appraisedAt": "2020-05-19T22:29:07.942Z"
  }
}
```

#### 8. Checkout cart with Google Home, Google Home, Google Home (Total: $99.98)

**Request:**
```http request
GET http://localhost:3000/carts/3185dcd8-2b87-4ce7-8cc3-5547a6a7558b/checkout
Accept: application/json
```

**Response:**
```json
{
  "subtotal": 149.97,
  "discount": 49.99,
  "total": 99.98,
  "code": "fc3e5a8e-f42a-4f2e-942b-ce695ff84c30",
  "moment": "2020-05-19T22:28:22.024Z",
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
    "appraisedAt": "2020-05-19T22:28:22.026Z"
  }
}
```

#### 9. Checkout cart with Alexa Speaker, Alexa Speaker, Alexa Speaker (Total: $295.65)

**Request:**
```http request
GET http://localhost:3000/carts/2050ed8d-54f2-470a-ace4-1911df214409/checkout
Accept: application/json
```

**Response:**
```json
{
  "subtotal": 328.5,
  "discount": 32.85,
  "total": 295.65,
  "code": "f8d13f7f-a75a-42b8-a837-f35e061f49f2",
  "moment": "2020-05-19T22:27:17.646Z",
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
    "appraisedAt": "2020-05-19T22:27:17.654Z"
  }
}
```