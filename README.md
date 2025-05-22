# 🚀 Live Site Preview

[![Live Preview](https://img.shields.io/badge/Live%20Site-lahiru.store-brightgreen?style=for-the-badge&logo=vercel)](https://lahiru.store)

> **Experience the application here:**  
> [https://lahiru.store](https://lahiru.store)

---

## ✨ Main Features

### 🔒 Advanced Role-Based Authentication

- **JWT authentication** using secure, httpOnly cookies
- Middleware enforces access: only authorized roles (Admin, Customer) can access sensitive routes
- Automatic route-based redirection for login and dashboard based on user role
- Passwords stored securely with bcrypt hashing

### 👥 User & Role Management

- Two main roles: **Admin** (full management access) and **Customer** (shopping and order access)
- Admin-only dashboard and management tools
- Customer-only account and order views

### 🛒 E-commerce Core

- Product, category, brand, size, and color CRUD (Create, Read, Update, Delete)
- Support for product variants and real-time stock management
- Shopping cart, fast add/remove, and streamlined checkout
- Order management with status tracking, invoice numbers, and notifications

### 💳 Payment Integration

- **Stripe** integration for secure payment processing
- Supports partial and final payments, plus webhook handling

### 🏪 Multi-Branch & Inventory

- Branch management: assign users to branches
- Track inventory per branch and manage stock levels

### 📦 File/Image Management

- Upload and manage product images with **Cloudinary**
- Fast, mobile-optimized image delivery using next-cloudinary

### 📊 Expense & Financial Management

- Expense category and subcategory CRUD
- Daily summaries, reports, and analytics for admins

### 🖥️ Modern Frontend & UX/UI

- Built with **Next.js 15** and **React 19** for speed and scalability
- Beautiful UI using **shadcn/ui**, **Tailwind CSS**, and **Radix UI** primitives
- Hero section carousel, product galleries, and responsive layouts

### ✅ Form & Data Validation

- **React Hook Form** for type-safe forms
- **Zod** for schema validation and error handling

### 🛡️ Security & Best Practices

- All tokens httpOnly (never exposed to JS), protecting against XSS
- Strict role and authentication checks in every sensitive route
- Uses latest TypeScript, ESLint, and dependency management

### 🛠️ Dev Experience

- Clean, modular codebase
- Modern scripts (`createsuperuser`, lint, build, dev)
- Easy to extend with your own features

---

**Recruiter highlights:**

- Advanced JWT auth & route middleware
- Stripe payment & webhook integration
- Cloudinary image/file management
- Modern, accessible UI with shadcn/ui & Tailwind CSS
- Robust e-commerce, branch, and inventory logic
- TypeScript, Next.js, Prisma, and MySQL expertise
