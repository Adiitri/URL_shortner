# URL Shortener

A full-stack, full-featured URL shortening application built with Node.js, Express, PostgreSQL, Drizzle ORM, React, and Vite.

---

## 🚀 Features

- **User Authentication**: Secure signup, login, and JWT-based session authorization.
- **URL Shortening**: Generate custom short URLs for long links.
- **Redirection Engine**: Fast redirection to original destinations via unique short codes.
- **Link Management Dashboard**: View, track, and manage all your shortened links.
- **Clean Architecture**: Structured monorepo separating backend services and frontend components.

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Zod / Request Schema Validation
- **Package Manager**: pnpm

### Frontend
- **Library**: React
- **Build Tool**: Vite
- **Styling**: CSS
- **HTTP Client**: Native Fetch API (`fetch`)

---

## 📁 Repository Structure

```text
URL_shortner-main/
├── Backend/
│   ├── db/                 # Database connection and Drizzle instance setup
│   ├── middlewares/        # JWT auth and validation middlewares
│   ├── models/             # Drizzle schemas (Users, URLs)
│   ├── routes/             # Express routes (Auth, URL CRUD, Redirection)
│   ├── services/           # Core business logic handlers
│   ├── utils/              # Hash and JWT helpers
│   ├── validation/         # Input sanitization schemas
│   ├── drizzle.config.js   # Drizzle ORM configuration
│   └── index.js            # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── api/            # API client and endpoints wrapper
    │   ├── components/     # UI components (LoginForm, ShortenForm, UrlList)
    │   ├── context/        # AuthContext state management
    │   ├── App.jsx         # Main React app container
    │   └── main.jsx        # React entry point
    └── vite.config.js      # Vite build configuration
