# CampusKart 2.0 – Frontend

CampusKart is a campus-focused marketplace designed to connect students within their university communities, making it easier to buy and sell products and services.

CampusKart 2.0 is a rebuild of the original project, with a more modern and scalable architecture using **Nuxt for the frontend and Laravel REST API for the backend**.

##  Project Overview

The goal of CampusKart is to provide students with a simple and accessible platform where they can discover products, list items for sale, and connect with other students within their campus community.

This repository contains the frontend application.

The backend API is maintained separately.

## Tech Stack

- **Nuxt 4** – Vue-based application framework.
- **Vue 3** – Frontend JavaScript framework.
- **JavaScript** – Application development language.
- **Tailwind CSS 4** – Utility-first CSS framework.
- **Pinia** – State management.
- **Axios** – HTTP client for API communication.
- **Lucide Vue Next** – Icons.
- **ESLint & Prettier** – Code quality and formatting.

## Architecture

CampusKart 2.0 follows a decoupled frontend/backend architecture.

```text
CampusKart 2.0
│
├── Frontend (Nuxt 4)
│      │
│      └── Axios / HTTP Requests
│                  │
│                  ▼
│
└── Backend (Laravel REST API)
               │
               ▼
            MySQL
```

The frontend communicates with the Laravel backend through RESTful API endpoints.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone 
```

### 2. Navigate into the project

```bash
cd CampusKart2.0-Frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
```

Update the API URL to match your Laravel backend configuration.

### 5. Start the development server

```bash
npm run dev
```
## Project Structure

The frontend follows Nuxt 4's application directory structure.

```text
CampusKart2.0-Frontend/
│
├── app/
│   ├── assets/
│   │   └── css/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── plugins/
│   └── stores/
│
├── public/
├── .env
├── nuxt.config.ts
├── package.json
└── README.md
```

**Note:** This is the intended application structure; folders will be populated as development progresses.

## Project Goals

- Build a responsive and user-friendly campus marketplace.
- Allow students to discover and list products.
- Organize listings by categories.
- Provide secure authentication and authorization.
- Connect the frontend to a Laravel REST API.
- Build reusable and maintainable Vue components.
- Support server-side rendering where appropriate.
- Develop an architecture that can grow with future features.

## Related Repository

- **Backend API:** CampusKart 2.0 – Laravel API .

## Project Status

Currently under development.

CampusKart 2.0 is being developed as a learning and portfolio project, with an emphasis on clean architecture, maintainability, and practical full-stack development.

## Author

Developed as a personal full-stack development project.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

