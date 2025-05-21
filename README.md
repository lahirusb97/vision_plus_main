VisionPlus Frontend
Professional medical industry web-based solution for optical clinics and vision care centers.

🚀 Features
Role-based Authentication

Secure login (JWT/cookies, API-based)

Admin, SuperAdmin, Branch User access control

Branch Management

Create, update, delete, and list branches

Assign users to branches

Channeling & Appointment System

Doctor management, including schedules and absence handling

Appointment booking, editing, transfer, reschedule

Channel invoice and payment management (partial/final payments)

Patient records integration

Channel claim, doctor claim, and reporting

Refraction & Patient Records

Full patient/refraction registration and history

Multiple prescription types: internal, vision plus, external

Inventory Management

Frames, lenses, coatings, colors, and powers CRUD

Frame/lens/cleaner/other-item stock management, per-branch

Barcode & search for fast item selection

Order & Invoice Processing

Factory and manual orders (including frame-only/external lenses)

Discount handling, order on-hold, progress tracking, WhatsApp status

Bulk update for status and notifications

Auto-increment and branch-prefixed invoice numbers

Soft-delete for data compliance

Expense & Finance Management

Expense categories/subcategories

Daily financial summaries, expense reporting

Safe and bank deposit tracking

Other income, bank account, and cash/bank/safe source tracking

Reporting & Analytics

Daily/periodic summaries (sales, invoices, stock, expenses)

Frame and invoice reporting

Channel/appointment analytics

Export and printable reports (with react-to-print)

User Management

CRUD for users/admins with branch assignment

Secure password handling (no plain text, API validation)

Role/permission check endpoints

Comprehensive Search

Patient, doctor, item, order, and invoice search

System & Bus Management

Bus system settings for accounting and custom business logic

Modern UI/UX

Built with Material UI (MUI) and Framer Motion for modern, responsive experience

Data grid tables (material-react-table, MUI DataGrid)

Toast notifications (react-hot-toast)

Form validation (zod, yup, react-hook-form)

Professional accessibility and mobile-first design

Testing & Dev Tools

Unit/UI tests (Vitest, Testing Library)

Linting (ESLint)

Hot reload, code splitting (Vite)

🏗️ Main App Structure
Core Routes
Path	Description
/	Refraction dashboard (protected)
/transaction	Order, payment, and invoice management
/channel	Doctor, channel, schedule, claim, and payment flows
/search	Global search (patients, orders, invoices, etc.)
/checkin	Check-in system for appointments/refractions
/stock	Stock management for all optical items
/account	Account and user profile management
/reports	Reports dashboard (finance, inventory, appointments, etc)
/user	User/admin management
/logs	System logs
/branch_selection	Select active branch (multi-branch support)
/login	Login/register (public)

All major routes use ProtectedChildRoute or LoginProtectedRoute to enforce security.

Dynamic & Nested Routing
Modular route files per feature (channel.route, transaction.route, etc.)

Nested routes for doctor/appointment editing, invoice viewing, etc.

Suspense fallback for async code splitting and loading UX

⚙️ Tech Stack
React 18 (






You said:
README.md gihub format


ChatGPT said:
Absolutely! Here’s a README.md formatted for GitHub, with a clean structure and markdown features (badges, collapsible sections, code examples, etc.), reflecting your frontend architecture, feature set, and best practices. This is professional and ready for open-source/enterprise repository use:

VisionPlus Frontend






Enterprise-grade, secure, and user-friendly frontend for a medical/optical management system.
Connects seamlessly with Django REST API.

Table of Contents
Features

Tech Stack

Getting Started

Routing Structure

UI & UX Principles

Security & Compliance

Testing

Contributing

License

Features
Secure Authentication & Authorization

JWT/session-based login

Public & protected routes (with role-based protection)

User registration, role assignment (Admin, SuperAdmin, Staff, etc.)

Multi-Branch & User Management

Create, update, and assign users and branches

Branch selection per session

Channeling & Doctor Appointments

Doctor CRUD, scheduling, absence/rescheduling, and transfer

Patient check-in, appointment booking, channel claims, and repayments

Optical Transactions

Full order flow for lenses, frames, cleaners, and accessories

Frame and lens stock management (multi-branch)

Factory orders, normal orders, frame-only, external lens, and repayments

Inventory & Stock

Real-time stock levels per branch for frames, lenses, cleaners, and accessories

Soft deletion and audit trail for inventory changes

Finance & Reporting

Invoice management (factory/manual), daily summaries, and reporting

Expense and income tracking, categorized

Safe/bank transactions, balances, deposits

Extensive Search & Logging

Search for orders, invoices, stock, patients, and logs for actions

Modern UI/UX

Responsive MUI/Material-UI + Framer Motion animations

Consistent dark/light mode (if implemented)

Professional accessibility and usability

Robust API Integration

Powered by Django REST Framework (see backend repo for API docs)

Tech Stack
React 18 + Vite (for fast dev/build)

Material-UI (MUI) + Custom Theming

Redux Toolkit for state management

React-Router v7 (modular route composition)

React Hook Form (with Yup/Zod validation)

Axios (API integration)

Day.js (date/time manipulation)

Vitest (unit and UI tests)

Firebase (optional, for auth/deployment)

TypeScript (strict types)

See package.json for full dependency list.

Getting Started
Prerequisites
Node.js 18+

Yarn or npm

Backend API server running (see backend repo)

Installation
bash
Copy
Edit
# Clone this repository
git clone https://github.com/your-org/visionplus-frontend.git
cd visionplus-frontend

# Install dependencies
npm install

# Set up environment variables (if needed)
# cp .env.example .env

# Start local dev server
npm run dev
Routing Structure
<details> <summary><strong>Click to expand route structure</strong></summary>
/login — Public login page

/register — Public registration

/branch_selection — Select working branch (multi-branch support)

/ — Protected home/dashboard (requires login)

/user — User management (CRUD)

/account — User profile/account settings

/channel — Doctor channeling (includes doctor management, claims, payments)

/transaction

/factory_order — Create/view factory orders

/normal_order — Create/view normal orders

/frame_only_order — Frame-only sales

/repayment — Order repayment/partial payment

/bus — Bus title management (e.g., for mobile clinics)

/doctor_claim_invoice — Doctor claim invoices

/refraction — Patient refraction management

/stock — Inventory/stock management (frames, lenses, accessories)

/reports — Financial and business reports

/search — Global search (orders, invoices, patients, etc.)

/logs — Activity logs

/messenger — (Coming soon)

</details>
UI & UX Principles
Accessibility: All interactive elements are keyboard accessible and screen reader friendly.

Consistency: MUI theming and layout components for predictable, professional UI.

Responsiveness: Optimized for desktop and tablet, with mobile-first layouts.

Feedback: Loading states, error boundaries, toast notifications (via react-hot-toast).

Security: All sensitive actions require auth; sensitive data never cached client-side.

Security & Compliance
Authentication & Route Guarding:

Uses <LoginProtectedRoute /> and <ProtectedChildRoute /> for all sensitive routes.

No direct access to protected pages without valid login/session.

Role Checks:

UI elements and API actions are hidden or blocked based on user role (front and backend).

Medical Data Privacy:

No sensitive PII or medical data stored on the client; always fetched fresh from secure API.

All API calls proxied through /api with CORS and HTTPS enforced.

Testing
Unit/Component Tests:

Written with Vitest + @testing-library/react

Run all tests:

bash
Copy
Edit
npm run test
# or for UI test runner:
npm run test:ui
CI-ready:

Lint and test before deploy:

bash
Copy
Edit
npm run lint
npm run test
Contributing
Pull requests are welcome! Please see our CONTRIBUTING.md for workflow and code style guidelines.

License
Distributed under the MIT License.

Maintainers
Your Name

Your Organization

⚠️ Real-world & Edge Case Considerations
Medical/Healthcare: Always validate patient identifiers (NIC, phone, etc.) before submission.

Multi-branch: All branch-specific operations must validate session/branch selection.

Concurrency: Always check for stale data on update (e.g., double submit or browser tab issues).

User Actions: Guard against accidental deletion (soft-delete everywhere possible)
