# Repositório do projeto Store Manager

 ## Módulo: BACK-END
 
  Repositório possui projeto desenvolvido no período que estive na <b>Trybe</b>, abordando os conceitos de <b>RESTFul API</b> com CRUD completo utilizando arquitetura Model-Service-Controller (MSC)
  
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

---

## Variáveis de Ambiente

Para rodar esse projeto, atente-se as variáveis de ambiente no seu .env

---

### Instruções para instalar e rodar

1. Clone o repo:
```
  git clone git@github.com:Ludson96/project-store-manager.git
```
2. Já existe um arquivo docker-compose.yml (Disponibilizado pela Trybe). Bastando usar o comando docker-compose up para rodar o MySQL e o Node pelo docker. Execute os services do docker: `node` e `db` 
```
  docker-compose up -d
```
3. Os arquivos para criação das tabelas e de seed se encontram nos arquivos migration.sql e seed.sql respectivamente. E podem ser utilizados em alguma ferramenta de gerenciamento de bancos de dados (como DBeaver, Extensão no VSCode MySQL ou MySQL Workbench). Entre no container node (renomeado para store_manager):
```
  docker exec -it store_manager bash
```
4. Instale as suas dependencias:
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

<i> Imagem disponibilizada pela Trybe </i>

---

> Primeiro projeto usando a arquitetura MSC e testes com `mocha`, `chai` e `sinon`
