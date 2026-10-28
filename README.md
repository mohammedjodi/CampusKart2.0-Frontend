# .

# CampusKart 2.0 — Frontend

A modern campus marketplace built with **Vue.js** and JavaScript, designed to help students buy and sell products within their university communities.

CampusKart 2.0 is a rebuild of the original CampusKart project, with a more organized frontend architecture and a separate Laravel REST API backend.

## Project Overview

CampusKart provides a platform where students can discover products, list items for sale, and connect with other students within their campus community.

The frontend is being developed as a standalone Vue application that communicates with the Laravel API.

##  Tech Stack

- **Vue 3** — Frontend framework
- **JavaScript** — Application language
- **Vite** — Development server and build tool
- **Vue Router** — Client-side navigation
- **Pinia** — State management
- **Axios** — HTTP requests to the backend API
- **Lucide Vue Next** — Icons
- **Vitest** — Unit testing
- **ESLint** — Code linting
- **Prettier** — Code formatting

##  Project Structure

The project is organized to support reusable components, page-level views, client-side routing, and API integration as development progresses.

Key configuration files include:

- `package.json` — Project dependencies and scripts
- `vite.config.js` — Vite configuration
- `eslint.config.js` — ESLint configuration
- `index.html` — Application entry HTML
- `src/` — Vue application source code

The internal structure will evolve as features are implemented.

##  Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone git@github.com:mohammedjodi/CampusKart2.0-Frontend.git
cd CampusKart2.0-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in your terminal.

### 4. Build for production

```bash
npm run build
```

### 5. Run tests

```bash
npm run test:unit
```

Check the available scripts in `package.json` if a command differs from your installed project configuration.

## 🔗 Backend API

The frontend is designed to communicate with the separate **CampusKart 2.0 API**, built with Laravel.

The API will handle responsibilities such as:

- User authentication and authorization
- User profiles
- Product listings and categories
- Listing management
- Image uploads
- Validation and business logic

API integration and environment configuration will be added as the corresponding features are developed.

## Development Roadmap

- [x] Initialize the Vue project
- [x] Install frontend dependencies
- [x] Configure the initial development toolchain
- [ ] Organize reusable components and application layouts
- [ ] Configure Vue Router and application navigation
- [ ] Integrate the Laravel API
- [ ] Implement registration and login interfaces
- [ ] Implement user profiles and account settings
- [ ] Build marketplace browsing and product details
- [ ] Implement listing creation and management
- [ ] Add and expand automated tests
- [ ] Prepare for production deployment

##  Project Goal

The goal of CampusKart 2.0 is to build a maintainable, responsive, and production-minded campus marketplace using a separate Vue frontend and Laravel backend.

This project is also an opportunity to apply modern frontend architecture, API integration, authentication, testing, and deployment practices.

## 👨‍💻 Author

**Mohammed Jodi**

GitHub: [@mohammedjodi](https://github.com/mohammedjodi)

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
