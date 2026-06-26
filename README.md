<div align="center">

<img src="frontend/src/img/nexvolt_logo.svg" alt="NexVolt" height="60"/>

# NexVolt — E-commerce Fullstack

Aplicação de e-commerce de eletrônicos desenvolvida como projeto de estágio,  
com Vue.js no front-end, Laravel no back-end e MySQL como banco de dados,  
orquestrada inteiramente via Docker Compose.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## Sumário

- [Visão geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Endpoints da API](#endpoints-da-api)
- [Banco de dados](#banco-de-dados)
- [Comandos úteis](#comandos-úteis)

---

## Visão geral

O NexVolt é um sistema de e-commerce fullstack com as seguintes funcionalidades:

- Vitrine de produtos com listagem, busca e filtro por categoria
- Página de detalhes do produto
- Carrinho de compras com atualização em tempo real
- Área administrativa para cadastro e gerenciamento de produtos
- Cadastro de clientes
- API RESTful em Laravel consumida pelo front-end Vue.js
- Persistência de dados em MySQL
- Ambiente de desenvolvimento 100% containerizado com Docker

---

## Tecnologias

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Front-end | Vue.js + TypeScript + Vite | 3.x / 5.x |
| Estilização | Tailwind CSS + PrimeVue | 4.x |
| Estado global | Pinia | 2.x |
| Back-end | PHP + Laravel | 8.2 / 11.x |
| Banco de dados | MySQL | 8.0 |
| Infraestrutura | Docker + Docker Compose | — |

---

## Estrutura do projeto

```
ecommerce-project/
├── docker-compose.yml          # orquestração dos serviços
├── README.md
│
├── frontend/                   # aplicação Vue.js + TypeScript
│   ├── src/
│   │   ├── assets/             # CSS global e tokens de tema
│   │   ├── data/
│   │   │   ├── api.ts          # funções de comunicação com a API Laravel
│   │   │   └── catalog.ts      # tipos TypeScript (Product, Client)
│   │   ├── router/
│   │   │   └── index.ts        # definição das rotas da aplicação
│   │   ├── views/              # páginas da aplicação
│   │   │   ├── home.vue
│   │   │   ├── listagem.vue
│   │   │   ├── detalhes.vue
│   │   │   ├── carrinho.vue
│   │   │   ├── adminProdutos.vue
│   │   │   ├── login.vue
│   │   │   └── novoClientes.vue
│   │   ├── App.vue
│   │   └── main.ts
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                    # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── ProductController.php
│   │   │   └── ClientController.php
│   │   └── Models/
│   │       ├── Product.php
│   │       └── Client.php
│   ├── database/
│   │   ├── migrations/         # criação das tabelas via artisan
│   │   └── seeders/
│   │       └── DatabaseSeeder.php
│   ├── routes/
│   │   └── api.php             # rotas da API REST
│   ├── Dockerfile
│   └── composer.json
│
└── BD/
    └── init.sql                # script SQL alternativo (referência)
```

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started) `>= 24.x`
- [Docker Compose](https://docs.docker.com/compose/) `>= 2.x`
- [Git](https://git-scm.com/)

> Não é necessário ter PHP, Node.js ou MySQL instalados localmente.  
> Tudo roda dentro dos containers Docker.

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/MarinaPrivado/ecommerce-project.git
cd ecommerce-project
```

### 2. Suba os containers

```bash
docker compose up --build
```

> Na primeira execução o Docker vai baixar as imagens e instalar as dependências.  
> Isso pode levar alguns minutos.

### 3. Execute as migrations

Com os containers já rodando, abra outro terminal e execute:

```bash
docker compose exec backend php artisan migrate
```

### 4. Popule o banco com dados iniciais (opcional)

```bash
docker compose exec backend php artisan db:seed
```

### 5. Acesse a aplicação

| Serviço | URL |
|---------|-----|
| Front-end (Vue.js) | http://localhost:5173 |
| API (Laravel) | http://localhost:8081/api |
| Banco de dados (MySQL) | `localhost:3306` |

---

## Variáveis de ambiente

As variáveis já estão configuradas diretamente no `docker-compose.yml` para facilitar a execução em ambiente de desenvolvimento.

### Back-end (`backend/.env`)

```env
APP_NAME=NexVolt
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8081

DB_CONNECTION=mysql
DB_HOST=BD          # nome do serviço no docker-compose — não use localhost
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=ecommerce_user
DB_PASSWORD=senha123
```

> **Atenção:** `DB_HOST` deve ser `BD` (nome do serviço Docker), não `localhost`.  
> Dentro da rede Docker, os serviços se comunicam pelo nome definido no `docker-compose.yml`.

### Front-end (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8081/api
```
---
Usuários teste:
Email: cliente@nexvolt.com
senha: 123456
 ou
Email: admin@nexvolt.com
senha: 123456
---

## Endpoints da API

Todos os endpoints seguem o padrão REST e retornam JSON.  
A base da URL é `http://localhost:8081/api`.

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/products` | Lista todos os produtos |
| `GET` | `/api/products/{id}` | Retorna um produto pelo ID |
| `POST` | `/api/products` | Cadastra um novo produto |
| `PUT` | `/api/products/{id}` | Atualiza um produto existente |
| `DELETE` | `/api/products/{id}` | Remove um produto |

### Clientes

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/clients` | Lista todos os clientes |
| `GET` | `/api/clients/{id}` | Retorna um cliente pelo ID |
| `POST` | `/api/clients` | Cadastra um novo cliente |
| `PUT` | `/api/clients/{id}` | Atualiza um cliente existente |
| `DELETE` | `/api/clients/{id}` | Remove um cliente |

### Exemplo de corpo para `POST /api/products`

```json
{
  "name": "Notebook Aurora X14",
  "brand": "NexVolt",
  "category": "Notebooks",
  "price": 4599.90,
  "old_price": 5299.90,
  "stock": 12,
  "badge": "Oferta",
  "icon": "pi-desktop",
  "description": "Notebook leve para estudos e desenvolvimento."
}
```

---

## Banco de dados

As tabelas são criadas pelo Laravel via migrations, que ficam em `backend/database/migrations/`.

### Tabela `products`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `BIGINT` | Chave primária |
| `name` | `VARCHAR(150)` | Nome do produto |
| `brand` | `VARCHAR(80)` | Marca |
| `category` | `VARCHAR(80)` | Categoria |
| `price` | `DECIMAL(10,2)` | Preço atual |
| `old_price` | `DECIMAL(10,2)` | Preço anterior (opcional) |
| `stock` | `INT` | Quantidade em estoque |
| `badge` | `VARCHAR(40)` | Etiqueta (ex: "Oferta", "Novo") |
| `icon` | `VARCHAR(80)` | Ícone PrimeIcons |
| `description` | `TEXT` | Descrição do produto |
| `created_at` / `updated_at` | `TIMESTAMP` | Gerenciados pelo Laravel |

### Tabela `clients`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `BIGINT` | Chave primária |
| `name` | `VARCHAR(150)` | Nome completo |
| `email` | `VARCHAR(150)` | E-mail (único) |
| `phone` | `VARCHAR(30)` | Telefone |
| `document` | `VARCHAR(30)` | CPF ou CNPJ |
| `city` | `VARCHAR(100)` | Cidade |
| `address` | `VARCHAR(255)` | Endereço |
| `status` | `ENUM` | `Ativo` ou `Inativo` |
| `created_at` / `updated_at` | `TIMESTAMP` | Gerenciados pelo Laravel |

---

## Comandos úteis

```bash
# Subir os containers em segundo plano
docker compose up -d

# Parar todos os containers
docker compose down

# Ver logs de um serviço específico
docker compose logs -f backend
docker compose logs -f frontend

# Acessar o terminal de um container
docker compose exec backend bash
docker compose exec frontend sh

# Migrations
docker compose exec backend php artisan migrate          # executa todas as migrations pendentes
docker compose exec backend php artisan migrate:rollback # desfaz a última migration
docker compose exec backend php artisan migrate:fresh    # recria todas as tabelas do zero

# Popular o banco com dados iniciais
docker compose exec backend php artisan db:seed

# Limpar cache do Laravel
docker compose exec backend php artisan cache:clear
docker compose exec backend php artisan config:clear

# Acessar o MySQL pelo terminal
docker compose exec BD mysql -u ecommerce_user -p ecommerce

# Instalar dependência no front-end
docker compose exec frontend npm install <pacote>

# Instalar dependência no back-end
docker compose exec backend composer require <pacote>
```

---

<div align="center">
  <sub>Projeto de estágio — Desenvolvimento de Software</sub>
</div>