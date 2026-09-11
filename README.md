# Multi-Tenant Stores Frontend

> **Modern multi-tenant commerce storefront built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and a .NET 10 backend.**







## Overview

**Multi-Tenant Stores Frontend** is a modern, responsive storefront application for a multi-tenant commerce platform.

Each tenant can expose its own storefront and shopping experience while sharing the same frontend architecture and backend infrastructure.

The application is built with **Next.js App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**, and communicates with a separate **.NET 10 Web API** responsible for domain logic, CQRS, persistence, authentication, and external service integrations.

The frontend is designed around a **feature-first architecture**, keeping domain-specific UI, API clients, types, constants, and utilities grouped together rather than coupling the application around pages.

---

## Local Development and CI

This repository is an npm-based Next.js 16 project. Use Node 22+ and install dependencies with npm.

```bash
npm install
cp .env.example .env.local
npm run lint
npm run typecheck
npm run build
```

Required environment variables for local development and CI builds:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

GitHub Actions runs the same quality gates on pushes and pull requests to `main`:

- `npm ci`
- `npm run lint -- --no-error-on-unmatched-pattern`
- `npm run typecheck`
- `npm run build`

There is no separate automated test runner in this repository yet, so CI currently validates linting, type safety, and production build health.

## What This Project Demonstrates

This project focuses on practical frontend engineering for a commerce application rather than simply building a collection of pages.

### Architecture

* Feature-first frontend organization
* Domain-oriented boundaries
* Public feature APIs
* Separation between UI, API access, types, and utilities
* Reusable section-based UI composition
* Clear loading and empty states

### User Experience

* Responsive, mobile-first storefront
* Arabic and English localization
* RTL and LTR layout support
* Locale switching
* Responsive catalog browsing
* Reusable loading states
* Empty-state handling
* Theme support

### Commerce

* Store discovery
* Product catalog
* Product details
* Search
* Shopping cart
* Favorites
* Address management
* Checkout flows

### Backend Integration

The frontend consumes the companion .NET backend through a typed API layer.

```text
Next.js Frontend
       │
       │ REST API
       ▼
.NET 10 Backend
       │
       ├── CQRS / MediatR
       ├── Domain
       ├── PostgreSQL
       ├── Redis
       ├── JWT
       ├── Stripe
       └── External Services
```

---

# Architecture

The application follows a **feature-first modular architecture** inspired by feature-sliced and domain-oriented design.

Instead of organizing the application primarily around technical concerns such as:

```text
components/
services/
hooks/
utils/
```

features own their related functionality:

```text
features/
├── products/
├── stores/
├── cart/
├── favorites/
├── addresses/
├── search/
└── home/
```

Each feature can contain its own:

```text
api/
components/
constants/
types/
lib/
```

This keeps domain-specific logic close to the UI that consumes it and makes features easier to evolve independently.

---

## Feature Boundary

A typical feature follows this structure:

```text
features/products/

├── api/
│   └── product.api.ts
│
├── components/
│   ├── ProductCard.tsx
│   ├── ProductDetails.tsx
│   └── sections/
│
├── constants/
│
├── types/
│   └── index.ts
│
└── lib/
```

The preferred consumption pattern is to expose functionality through a feature's **public API** rather than importing implementation details from deep inside another feature.

The architectural conventions are documented in:

```text
FEATURES_ARCHITECTURE.md
```

---

# Request & Rendering Flow

A typical storefront request follows this general flow:

```text
User
 │
 ▼
Next.js App Router
 │
 ▼
Feature UI
 │
 ▼
Feature API Client
 │
 ▼
Shared Fetch Layer
 │
 ▼
.NET 10 REST API
 │
 ▼
Application / CQRS
 │
 ▼
PostgreSQL / Redis / External Services
```

This separation keeps frontend presentation concerns independent from backend domain and persistence concerns.

---

# Core Features

## Multi-Tenant Storefront

The frontend is structured around tenant-aware commerce concepts including:

* Stores
* Modules
* Product catalogs
* Sections
* Banners
* Shopping carts
* Favorites
* Addresses
* Checkout

The frontend is designed to consume tenant/store data from the backend rather than embedding business rules directly into the UI.

---

## Product Discovery

* Product browsing
* Product details
* Store catalogs
* Store sections
* Module-based discovery
* Search flows
* Responsive catalog presentation

---

## Shopping Experience

* Shopping cart
* Cart item management
* Favorites
* Address management
* Checkout flow
* Loading states
* Empty states

---

## Internationalization

The application provides first-class support for:

* 🇬🇧 English (`en`)
* 🇸🇦 Arabic (`ar`)

Internationalization is implemented using `next-intl`.

The application supports both:

```text
LTR → English
RTL → Arabic
```

Locale information is resolved through the application's internationalization layer, and the root layout updates the document language and direction accordingly.

### Translation Structure

```text
messages/
├── en.json
└── ar.json
```

### Locale Switching

The shared layout includes a `LocaleSwitcher` that allows users to change the active language at runtime.

Adding another locale generally involves:

1. Adding a new translation file.
2. Updating the locale switcher configuration.
3. Ensuring localized backend content is available.
4. Verifying RTL/LTR behavior where applicable.

---

# Responsive UI

The storefront is designed with a **mobile-first approach**.

The UI is structured around reusable sections rather than large page-specific components.

This allows common patterns such as:

```text
Section
├── Header
├── Content
├── Loading State
└── Empty State
```

to be reused across different storefront experiences.

The goal is to keep the visual layer composable while avoiding large page-coupled components.

---

# Tech Stack

| Technology                      | Purpose                                 |
| ------------------------------- | --------------------------------------- |
| **Next.js 16**                  | React framework and application routing |
| **React 19**                    | UI rendering                            |
| **TypeScript**                  | Static typing                           |
| **Tailwind CSS 4**              | Styling and responsive UI               |
| **next-intl**                   | Internationalization                    |
| **Swiper**                      | Carousel and browsing experiences       |
| **react-hook-form**             | Form management                         |
| **clsx**                        | Conditional class composition           |
| **tailwind-merge**              | Tailwind class conflict resolution      |
| **Cloudflare / Vinext tooling** | Alternative deployment workflow         |

---

# Project Structure

```text
.
├── messages/
│   ├── ar.json
│   └── en.json
│
├── src/
│   │
│   ├── app/
│   │   ├── (main)/
│   │   └── globals.css
│   │
│   ├── features/
│   │   ├── addresses/
│   │   ├── cart/
│   │   ├── favorites/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── modules/
│   │   ├── products/
│   │   ├── search/
│   │   └── stores/
│   │
│   ├── i18n/
│   │   └── request.ts
│   │
│   └── shared/
│       ├── config/
│       └── lib/
│
├── FEATURES_ARCHITECTURE.md
├── next.config.ts
├── package.json
├── tsconfig.json
├── wrangler.jsonc
└── README.md
```

---

# Feature Organization

The current feature boundaries are:

| Feature       | Responsibility                                     |
| ------------- | -------------------------------------------------- |
| **home**      | Homepage content, banners and storefront sections  |
| **stores**    | Store discovery and store-specific content         |
| **modules**   | Module-based catalog/discovery flows               |
| **products**  | Product data and product presentation              |
| **cart**      | Shopping cart operations and UI                    |
| **favorites** | Favorite products/stores                           |
| **addresses** | Customer address management                        |
| **search**    | Product/store discovery and search                 |
| **layout**    | Shared application layout and global storefront UI |

This organization allows each domain area to evolve without turning the application into a large collection of unrelated shared components.

---

# Getting Started

## Prerequisites

Make sure you have:

* Node.js 20+
* npm, pnpm, yarn, or bun
* A running instance of the companion .NET backend for real API data

---

## Installation

Clone the repository:

```bash
git clone https://github.com/RashedKlo/multi-tenant-stores-frontend.git

cd multi-tenant-stores-frontend
```

Install dependencies:

```bash
npm install
```

---

# Environment Configuration

The frontend requires the backend API base URL.

Create:

```text
.env.local
```

and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The shared fetch layer reads this value when making API requests.

Update the URL according to your backend environment.

> For UI development and screens that use static/mock data, some parts of the application can still be explored without a connected backend.

---

# Development

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

# Cloudflare / Vinext

The repository also provides an alternative deployment workflow using Vinext/Cloudflare tooling.

### Development

```bash
npm run dev:vinext
```

### Build

```bash
npm run build:vinext
```

### Start

```bash
npm run start:vinext
```

### Deploy

```bash
npm run deploy:vinext
```

---

# Available Scripts

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start Next.js development server              |
| `npm run build`         | Create production build                       |
| `npm run start`         | Start production server                       |
| `npm run lint`          | Run ESLint                                    |
| `npm run dev:vinext`    | Start Vinext development environment          |
| `npm run build:vinext`  | Build using Vinext                            |
| `npm run start:vinext`  | Start the Vinext/Cloudflare runtime           |
| `npm run deploy:vinext` | Deploy through the Vinext Cloudflare workflow |

---

# Development Guidelines

New features should follow the existing feature-first architecture.

### 1. Keep domain logic inside its feature

Prefer:

```text
features/products/
```

over scattering product-related code across unrelated global directories.

### 2. Use public feature APIs

Prefer importing from a feature's public entry point rather than:

```text
features/products/components/internal/...
```

This reduces coupling to implementation details.

### 3. Keep types close to their domain

Feature-specific types should live inside:

```text
features/<feature>/types/
```

and should be re-exported through:

```text
types/index.ts
```

### 4. Use consistent component naming

The project uses conventions such as:

```text
FeatureShell
SomethingClient
skeleton.tsx
empty.tsx
```

Interactive components should use the appropriate `Client` convention where required by the rendering boundary.

### 5. Build composable sections

Prefer:

```text
Reusable Section
      │
      ├── Loading
      ├── Empty
      └── Content
```

over large page-specific components containing multiple unrelated responsibilities.

---

# Backend Integration

This frontend is designed to work with the companion backend:

**Multi-Tenant Stores Backend**

The backend is responsible for:

* Domain logic
* CQRS
* Authentication
* Persistence
* PostgreSQL
* Redis
* Stripe
* Google authentication
* Email workflows
* API validation

The frontend focuses on:

* Rendering
* User interaction
* Storefront navigation
* Client-side feature composition
* Localization
* Responsive UX
* API consumption

This creates a clear separation between **frontend presentation** and **backend domain/business logic**.

---

# Related Repository

### Backend

https://github.com/RashedKlo/multi-tenant-stores-backend

### Frontend

https://github.com/RashedKlo/multi-tenant-stores-frontend

Together, these repositories form the frontend and backend components of the multi-tenant commerce platform.

---

# Project Status

The frontend currently provides the core storefront experience around:

* Store discovery
* Catalog browsing
* Products
* Search
* Cart
* Favorites
* Addresses
* Checkout
* Localization
* Responsive layouts

The architecture is intentionally structured to allow additional commerce features to be introduced without breaking existing feature boundaries.

---

# Roadmap

Potential future improvements include:

* [ ] Automated component tests
* [ ] End-to-end testing
* [ ] Expanded accessibility coverage
* [ ] Performance monitoring
* [ ] Advanced storefront personalization
* [ ] Expanded tenant-specific theming
* [ ] SEO enhancements
* [ ] Progressive Web App capabilities
* [ ] Advanced caching strategies

---

# License

This project is intended to be distributed under the **MIT License**.

If the repository does not yet contain a `LICENSE` file, add one before relying on this statement as the project's formal license.

---

# Author

**Rashed Klo**

GitHub: https://github.com/RashedKlo

---

# Portfolio Highlights

This project demonstrates experience with:

**Frontend Architecture**

Feature-first design · Modular boundaries · Public APIs · Component composition

**Modern React**

Next.js App Router · React 19 · Server/Client boundaries · TypeScript

**Commerce UX**

Catalogs · Storefronts · Search · Cart · Favorites · Addresses · Checkout

**Internationalization**

English · Arabic · RTL · LTR · Runtime locale switching

**UI Engineering**

Tailwind CSS · Responsive design · Loading states · Empty states · Reusable sections

**Backend Integration**

REST APIs · Typed API boundaries · .NET 10 · CQRS · PostgreSQL · Redis · Stripe

**Deployment**

Next.js production builds · Cloudflare/Vinext workflow

---

## Built With

**Next.js · React · TypeScript · Tailwind CSS · next-intl · .NET · PostgreSQL · Redis · Stripe**

A full-stack multi-tenant commerce platform designed with **modularity, maintainability, and real-world product workflows** in mind.
