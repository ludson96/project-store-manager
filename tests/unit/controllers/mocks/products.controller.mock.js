const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const expected = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const nameProduct = {
  "name": "ProdutoX"
}

const expectedInsert = {
  "id": 4,
  "name": "ProdutoX"
};

const payload = 1;

const nameUpdate = {
  "name": "Martelo do Batman"
}

const expectedUpdate = {
  "id": 1,
  "name": "Martelo do Batman"
}

module.exports = {
  allProducts,
  payload,
  expected,
  nameProduct,
  expectedInsert,
  nameUpdate,
  expectedUpdate,
}