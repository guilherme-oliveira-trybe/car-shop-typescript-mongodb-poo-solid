# Car Shop API 🚘🏍

Consiste em uma `API` com `CRUD` para gerenciar uma concessionária de veículos utilizando o banco de dados `MongoDB`, aplicando os princípios de Programação Orientada a Objetos (`POO`) e `SOLID`

* Construída com Node.js, Express, TypeScript, Mongoose com MongoDB, Docker e ZOD.
* Utilizando as práticas do REST
* Aplicada Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores
* Testes unitários criados utilizando Mocha, Chai e Sinon


## Instruções

### Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:guilherme-oliveira-trybe/car-shop-typescript-mongodb-poo-solid.git
```

Entre no diretório do projeto

```bash
  cd car-shop-typescript-mongodb-poo-solid
```

Utilize os comandos a seguir para inicializar o Docker e instalar as dependências:

```bash
docker-compose up -d
docker exec -it car_shop bash
npm install // para instalar as dependências
docker-compose down // para parar completamente a aplicação
```

Utilize o comando a seguir para executar a aplicação:

```bash
npm run dev // para iniciar a aplicação
```

### Endpoints


#### Carros


| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma listagem de todos os carros cadastrados | http://localhost:3001/cars |
| `GET` | Retorna um carro específico | http://localhost:3001/cars/:id |
| `POST` | Realiza o cadastro de um carro | http://localhost:3001/cars |
| `PUT` | Atualiza os campos de um carro específico | http://localhost:3001/cars/:id |
| `DELETE` | Apaga os dados de um carro específico | http://localhost:3001/cars/:id |

Nas requisições POST e PUT é necessário informar o seguinte JSON:

```
{
  "model": "Palio",
  "year": 2011,
  "color": "Preto",
  "status": true, // campo opcional
  "buyValue": 1000,
  "doorsQty": 4,
  "seatsQty": 5
}
```

#### Motos


| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma listagem de todos as motos cadastradas | http://localhost:3001/motorcycles |
| `GET` | Retorna uma moto específica | http://localhost:3001/motorcycles/:id |
| `POST` | Realiza o cadastro de uma moto | http://localhost:3001/motorcycles |
| `PUT` | Atualiza os campos de uma moto específica | http://localhost:3001/motorcycles/:id |
| `DELETE` | Apaga os dados de uma moto específica | http://localhost:3001/motorcycles/:id |


Na requisição POST, é necessário informar a os dados o usuário no formato a seguir:

```
{
  "model": "Kawasaki Ninja",
  "year": 2022,
  "color": "Verde Bandeira",
  "status": true, // campo opcional
  "buyValue": 60000,
  "category": "Street",
  "engineCapacity": 2500,
}
```