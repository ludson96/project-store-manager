# Repositório do projeto Store Manager
 ## Módulo: BACK-END
 
  Repositório possui projeto desenvolvido no período que estive na <b>Trybe</b>, abordando os conceitos de <b>RESTFul API</b> com CRUD completo utilizando arquitetura Model-Service-Controller (MSC)
  
---
## Informações de aprendizados

- Este é um projeto desenvolvido para me ajudar a aprender os principais conceitos de `arquitetura MSC` e testes com `mocha`, `chai` e `sinon`;
- Meu primeiro projeto arquitetura MSC` e testes com `mocha`, `chai` e `sinon`;
- Utilizei o Cliente Rest `Thunder Client`, como extensão, para visualizar o retorno do meu acesso.
---
## Linguagens usadas

[![JavaScript][JavaScript-logo]][JavaScript-url]
[![NodeJS][NodeJS-logo]][NodeJS-url]
[![Express][Express-logo]][Express-url]
[![MySQL][MySQL-logo]][MySQL-url]
[![Mocha][Mocha-logo]][Mocha-url]
[![Chai][Chai-logo]][Chai-url]
[![Docker][Docker-logo]][Docker-url]
[![Nodemon][Nodemon-logo]][Nodemon-url]
[![ESLint][ESLint-logo]][ESLint-url]

---

## Habilidades

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

---
## O que foi desenvolvido

Uma API Rest trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.
> Arquivos `migration.sql`, `seed.sql` e `docker-compose.yml` fornecidos pela Trybe.
---
## Variáveis de Ambiente

Para rodar esse projeto, atente-se as variáveis de ambiente no seu .env. Existe um arquivo `.env.example` com as instruções de configurações.

---
## Instruções para instalar e rodar

1. Clone o repo:
```
  git clone git@github.com:Ludson96/project-store-manager.git
```
2. Já existe um arquivo docker-compose.yml. Bastando usar o comando docker-compose up para rodar o MySQL e o Node pelo docker. Execute os services do docker: `node` e `db` 
```
  docker-compose up -d
```
3. Os arquivos para criação das tabelas e de seed se encontram nos arquivos migration.sql e seed.sql respectivamente. E podem ser utilizados em alguma ferramenta de gerenciamento de bancos de dados (como DBeaver, Extensão no VSCode MySQL ou MySQL Workbench). Entre no container node (renomeado para store_manager):
```
  docker exec -it store_manager bash
```
4. Instale as suas dependências:
```
  npm install
```
5. Execute o servidor:

```
  npm start
```
Outra forma de executar é utilizando o `nodemom` (permite fazer alteração em tempo real sem precisar derrubar o servidor e iniciá-lo novamente):
```
  npm run debug
```
6. Utilizar alguma Plataforma de API para acessar os endpoints e fazer seus devidos experimentos. Exemplos: Postman e Insomnia.

---

## Diagrama

![Diagrama de relacionamentos das tabelas](diagrama.png)

> _Imagem disponibilizada pela Trybe_

---
## Usage

Since this is a simple back-end project, there's no front-end.
Using `StoreManager` DB (`migration.sql` and `seed.sql`).

<details>

### Products Route

#### GET `/products`
- Lists all products in the format:
```json
[
  {
    "id": 1,
    "name": "Thor's Hammer"
  },
  {
    "id": 2,
    "name": "Ion Cannon"
  }
  /* ... */
]
```

#### GET `/products/:id`
- Takes a number parameter, and, if the id is an existing product, will return the info:
```json
{
  "id": 1,
  "name": "Thor's Hammer"
}
```

#### GET `/products/search`
- The query param should follow the format:
```
  /products/search?q=hammer
```
- If there's a corresponding item, the response will be like:
```json
[
  {
    "id": 1,
    "name": "Thor's Hammer"
  }
]
```
- If there's no parameter, the response will return all of the products:
```json
[
  {
    "id": 1,
    "name": "Thor's Hammer"
  },
  {
    "id": 2,
    "name": "Ion Cannon"
  }
  /* ... */
]
```

#### POST `/products`
- Creates a new product.
- The product name must have at least 5 characters and the body should have the following format:
```json
{
  "name": "Product Name"
}
```
- If the product is successfully created, the response should be like:
```json
{
  "id": 4,
  "name": "Product Name"
}
```

#### PUT `/products/:id`
- Takes a number parameter, and updates the product, if it exists
- The body should follow the format:
```json
{
  "name": "Loki's Hammer"
}
```
- When successfully updating, the response should be like:
```json
{
  "id": 1,
  "name": "Loki's Hammer"
}
```

#### DELETE `/products/:id`
- Takes a number parameter, and deletes the product, if it exists
- Will return a HTTP `204` status if the product is deleted.

### Sales Route

#### GET `/sales`
- Lists all sales in the format:
```json
[
  {
    "saleId": 1,
    "date": "2022-11-11T04:54:29.000Z",
    "productId": 1,
    "quantity": 10
  },
  {
    "saleId": 1,
    "date": "2022-11-11T04:54:54.000Z",
    "productId": 2,
    "quantity": 10
  }
  /* ... */
]
```

#### GET `/sales/:id`
- Takes a number parameter, and, if the id is an existing sale, will return the info:
```json
[
  {
    "date": "2022-11-11T04:54:29.000Z",
    "productId": 1,
    "quantity": 10
  },
  {
    "date": "2022-11-11T04:54:54.000Z",
    "productId": 2,
    "quantity": 10
  }
  /* ... */
]
```

#### POST `/sales`
- Creates a new sale
- The body should have the following format:
```json
[
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 1
  }
]
```
- If the sale is successfully created, the response should be like:
```json
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

#### PUT `/sales/:id`
- Takes a number parameter, and updates the sale, if it exists
- The body should follow the format:
```json
[
  {
    "productId": 1,
    "quantity": 5
  },
  {
    "productId": 2,
    "quantity": 3
  }
]
```
- When successfully updating, the response should be like:
```json
{
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 5
    },
    {
      "productId": 2,
      "quantity": 3
    }
  ]
}
```

#### DELETE `/sales/:id`
- Takes a number parameter, and deletes the sale, if it exists
- Will return a HTTP `204` status if the sale is successfully deleted.
 </details>

[JavaScript-logo]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[Docker-logo]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
[MySQL-logo]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com
[Express-logo]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com
[Mocha-logo]: https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white
[Mocha-url]: https://mochajs.org
[Nodemon-logo]: https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge
[Nodemon-url]: https://www.npmjs.com/package/nodemon
[ESLint-logo]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Chai-logo]: https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=fff&style=for-the-badge
[Chai-url]: https://www.chaijs.com