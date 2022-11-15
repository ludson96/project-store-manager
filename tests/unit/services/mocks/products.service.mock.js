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

const correctId = {
  insertId: 4
}

const nameProduct = {
  "name": "ProdutoX"
}

const expectedInsert = {
  "id": 4,
  "name": "ProdutoX"
};

const payload = 1;

module.exports = {
  allProducts,
  payload,
  expected,
  correctId,
  nameProduct,
  expectedInsert,
}