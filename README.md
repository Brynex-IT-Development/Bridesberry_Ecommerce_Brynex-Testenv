# Brides Berry E-Commerce Platform

A premium, full-stack e-commerce platform built with a modern architecture, featuring a high-performance Next.js storefront and a robust NestJS backend.

## 🚀 Tech Stack

### Frontend (Storefront & Admin Console)
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management & Context:** React Context API (Auth, Cart)
- **Language:** TypeScript

### Backend (API Engine)
- **Framework:** [NestJS 11](https://nestjs.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (with `@prisma/adapter-pg`)
- **Authentication:** JWT (JSON Web Tokens) with Bcrypt password hashing
- **Cloud Services:** AWS S3 (Media Storage), AWS SES (Email Notifications)
- **Language:** TypeScript

## ✨ Key Features

### Storefront
- **Premium UI/UX:** Responsive, aesthetic design tailored for a luxury brand.
- **Product Discovery:** Seamless catalog browsing, categorized collections, and intelligent search.
- **Shopping Cart & Checkout:** Persistent local cart management and smooth checkout flow.
- **Customer Accounts:** Order history, saved addresses, and profile management.

### Management Console (Admin)
- **Secure Access:** Protected routes requiring `ADMIN` or `SUPER_ADMIN` privileges.
- **Order Management:** View, process, and track customer orders.
- **Logistics Integration:** Shiprocket API integration (AWB generation, pickups, and live tracking).
- **Inventory & Purchase Orders:** Advanced inventory tracking and supplier purchase order generation.
- **Product Management:** Add/edit products, manage variants, and control visibility.

## 📁 Project Structure

This repository is organized as a monorepo containing two main workspaces:

```text
Bridesberry_e_web_Brynex-Testenv/
├── frontend/                 # Next.js Application
│   ├── src/app/              # Next.js App Router pages (/, /shop, /admin, etc.)
│   ├── src/components/       # Reusable React components (UI, Layout, Admin, Home)
│   ├── src/context/          # React Context providers (AuthContext, CartContext)
│   ├── src/services/         # API integration services
│   └── public/               # Static assets
│
└── backend/                  # NestJS Application
    ├── src/                  # Controllers, Services, and Modules
    ├── prisma/               # Prisma schema and database seed scripts
    └── test/                 # E2E and Unit Tests
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- PostgreSQL database
- AWS Credentials (for S3 and SES)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure your environment variables
# Ensure you copy .env.example to .env and fill in your DATABASE_URL and AWS credentials
cp .env.example .env

# Run Prisma database migrations and generate the client
npx prisma migrate dev
npx prisma generate

# Seed the database with the initial Admin user and mock data
npx prisma db seed

# Start the NestJS development server
npm run start:dev
```

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure your environment variables (API Base URL, etc.)
cp .env.example .env

# Start the Next.js development server
npm run dev
```

The storefront will be available at `http://localhost:3000` and the backend API will run on `http://localhost:7001` (by default).

## 🔐 Default Credentials
If you have run the database seed script (`npx prisma db seed`), a default Super Admin account is provisioned for local development:

- **Admin URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@bridesberry.com`
- **Password:** `Admin@123`

## 📄 License
This project is proprietary and confidential.
