const allSales = [
  {
    "saleId": 1,
    "date": "2022-11-16T21:09:57.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-16T21:09:57.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-16T21:09:57.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const payload = 1;

const update = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const expectedUpdate = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const bodySale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const expectNewSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const productIdSaleWrong = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 999,
    "quantity": 5
  }
];

module.exports = {
  allSales,
  payload,
  expectedUpdate,
  update,
  bodySale,
  expectNewSale,
  productIdSaleWrong,
}