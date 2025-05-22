# VisionPlus Frontend

**Professional medical industry web-based solution for optical clinics and vision care centers.**

---

## 🚀 Features

- **Role-based Authentication**
  - Secure login (JWT/cookies, API-based)
  - Admin, SuperAdmin, Branch User access control

- **Branch Management**
  - Create, update, delete, and list branches
  - Assign users to branches

- **Channeling & Appointment System**
  - Doctor management, including schedules and absence handling
  - Appointment booking, editing, transfer, reschedule
  - Channel invoice and payment management (partial/final payments)
  - Patient records integration
  - Channel claim, doctor claim, and reporting

- **Refraction & Patient Records**
  - Full patient/refraction registration and history
  - Multiple prescription types: internal, vision plus, external

- **Inventory Management**
  - Frames, lenses, coatings, colors, and powers CRUD
  - Frame/lens/cleaner/other-item stock management, per-branch
  - Barcode & search for fast item selection

- **Order & Invoice Processing**
  - Factory and manual orders (including frame-only/external lenses)
  - Discount handling, order on-hold, progress tracking, WhatsApp status
  - Bulk update for status and notifications
  - Auto-increment and branch-prefixed invoice numbers
  - Soft-delete for data compliance

- **Expense & Finance Management**
  - Expense categories/subcategories
  - Daily financial summaries, expense reporting
  - Safe and bank deposit tracking
  - Other income, bank account, and cash/bank/safe source tracking

- **Reporting & Analytics**
  - Daily/periodic summaries (sales, invoices, stock, expenses)
  - Frame and invoice reporting
  - Channel/appointment analytics
  - Export and printable reports (with react-to-print)

- **User Management**
  - CRUD for users/admins with branch assignment
  - Secure password handling (no plain text, API validation)
  - Role/permission check endpoints

- **Comprehensive Search**
  - Patient, doctor, item, order, and invoice search

- **System & Bus Management**
  - Bus system settings for accounting and custom business logic

- **Modern UI/UX**
  - Built with Material UI (MUI) and Framer Motion for modern, responsive experience
  - Data grid tables (material-react-table, MUI DataGrid)
  - Toast notifications (react-hot-toast)
  - Form validation (zod, yup, react-hook-form)
  - Professional accessibility and mobile-first design

- **Testing & Dev Tools**
  - Unit/UI tests (Vitest, Testing Library)
  - Linting (ESLint)
  - Hot reload, code splitting (Vite)

---

## 🏗️ Main App Structure

### Core Routes

| Path                | Description                                             |
|---------------------|--------------------------------------------------------|
| `/`                 | Refraction dashboard (protected)                       |
| `/transaction`      | Order, payment, and invoice management                 |
| `/channel`          | Doctor, channel, schedule, claim, and payment flows    |
| `/search`           | Global search (patients, orders, invoices, etc.)       |
| `/checkin`          | Check-in system for appointments/refractions           |
| `/stock`            | Stock management for all optical items                 |
| `/account`          | Account and user profile management                    |
| `/reports`          | Reports dashboard (finance, inventory, appointments)   |
| `/user`             | User/admin management                                  |
| `/logs`             | System logs                                            |
| `/branch_selection` | Select active branch (multi-branch support)            |
| `/login`            | Login/register (public)                                |

_All major routes use `ProtectedChildRoute` or `LoginProtectedRoute` to enforce security._

### Dynamic & Nested Routing

- Modular route files per feature (`channel.route`, `transaction.route`, etc.)
- Nested routes for doctor/appointment editing, invoice viewing, etc.
- Suspense fallback for async code splitting and loading UX

---

## ⚙️ Tech Stack

- **React 18**
- **Vite**
- **Material UI (MUI)**
- **Redux Toolkit**
- **React Router v7**
- **React Hook Form** (with Zod/Yup validation)
- **Axios**
- **Day.js**
- **Vitest** (unit and UI tests)
- **TypeScript**
- **Firebase** (optional, for auth/deployment)

See [`package.json`](./package.json) for the complete dependency list.

---

## 🔒 Security & Compliance

- All sensitive routes protected by authentication and role checks.
- Patient and order data is never cached or stored insecurely on the client.
- All API calls use secure HTTPS and backend CORS rules.
- Soft-delete and audit trails for all critical data.

---

## 🧪 Testing & Quality

- Unit and UI tests with [Vitest](https://vitest.dev/) and Testing Library
- Linting with [ESLint](https://eslint.org/)
- Pre-deploy and CI test scripts included

---

## 📝 Real-world & Edge Case Considerations

- Medical/Healthcare: Validate all patient identifiers (NIC, phone, etc.) before submission.
- Multi-branch: All branch-specific operations validate session/branch selection.
- Concurrency: Always check for stale data on update (e.g., double submit, browser tab issues).
- User Actions: Guard against accidental deletion (soft-delete everywhere possible).

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Running backend API server

### Installation

```bash
git clone https://github.com/your-org/visionplus-frontend.git
cd visionplus-frontend
npm install
# or
yarn install

# Start local development server
npm run dev
# or
yarn dev
