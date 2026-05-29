<div align="center">

# 🛒 E-commerce Fullstack

Aplicação de e-commerce desenvolvida com Vue.js, Laravel e MySQL,  
orquestrada via Docker Compose.

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
- [Comandos úteis](#comandos-úteis)

---

## Visão geral

Sistema de e-commerce fullstack com as seguintes funcionalidades:

- Vitrine de produtos com listagem e detalhes
- Carrinho de compras com atualização em tempo real
- API RESTful em Laravel consumida pelo frontend Vue.js
- Persistência de dados em MySQL
- Ambiente de desenvolvimento 100% containerizado com Docker

---

## Tecnologias

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Frontend | Vue.js + TypeScript + Vite | 3.x / 5.x |
| Backend | PHP + Laravel | 8.2 / 11.x |
| Banco de dados | MySQL | 8.0 |
| Infraestrutura | Docker + Docker Compose | — |

---

## Estrutura do projeto

```
ecommerce/
├── docker-compose.yml        # orquestração dos serviços
├── .gitignore
├── README.md
│
├── frontend/                 # aplicação Vue.js + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── main.ts
│   ├── .env
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── backend/                  # API Laravel
│   ├── app/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   ├── .env
│   ├── composer.json
│   └── Dockerfile
│
└── BD/                    # scripts de inicialização do banco
    └── init.sql
```

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started) `>= 24.x`
- [Docker Compose](https://docs.docker.com/compose/) `>= 2.x`
- [Git](https://git-scm.com/)

> Não é necessário ter PHP, Node.js ou MySQL instalados localmente — tudo pode rodar dentro dos containers.

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd ecommerce
```

### 2. Configure as variáveis de ambiente

**Backend:**
```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env` e ajuste as credenciais do banco (veja a seção [Variáveis de ambiente](#variáveis-de-ambiente)).

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```

### 3. Suba os containers

```bash
docker compose up --build
```

> Na primeira execução, o Docker vai baixar as imagens e instalar as dependências. Pode levar alguns minutos.

### 4. Execute as migrations

Com os containers já rodando, abra outro terminal e execute:

```bash
docker compose exec backend php artisan migrate
```

Opcionalmente, para popular o banco com dados de exemplo:

```bash
docker compose exec backend php artisan db:seed
```

### 5. Acesse a aplicação

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API (Laravel) | http://localhost:8000/api |
| Banco de dados | `localhost:3306` |

---

## Variáveis de ambiente

### `backend/.env`

```env
APP_NAME=Ecommerce
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=banco          # nome do serviço no docker-compose
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=ecommerce_user
DB_PASSWORD=senha123
```

> **Atenção:** `DB_HOST` deve ser `banco` (nome do serviço Docker), não `localhost`.

### `frontend/.env`

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/produtos` | Lista todos os produtos |
| `GET` | `/api/produtos/{id}` | Detalhe de um produto |
| `POST` | `/api/pedidos` | Registra um novo pedido |
| `GET` | `/api/pedidos/{id}` | Detalhe de um pedido |

> A documentação completa da API será atualizada conforme o desenvolvimento avança.

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

# Rodar migrations
docker compose exec backend php artisan migrate

# Reverter a última migration
docker compose exec backend php artisan migrate:rollback

# Limpar cache do Laravel
docker compose exec backend php artisan cache:clear
docker compose exec backend php artisan config:clear

# Instalar nova dependência no frontend
docker compose exec frontend npm install <pacote>

# Instalar nova dependência no backend
docker compose exec backend composer require <pacote>
```





<div align="center">
  <sub>Projeto de estágio — Desenvolvimento de Software</sub>
</div>