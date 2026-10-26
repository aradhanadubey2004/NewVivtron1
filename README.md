# Vivtron Unified Platform (EV + EVCS)

A modern, responsive full-stack platform for **Vivtron (A Unit of Vivan Group)** combining two distinct divisions:
1. **EV (Electric Vehicles)**: Indigenous electric scooters, commercial cargo vehicles, and passenger auto-rickshaws carrying the spirit of Bharat.
2. **EVCS (Electric Vehicle Charging Solutions)**: Mission-critical EV charging infrastructure with turnkey EPC, cloud NOC telemetry, and role-based operational dashboards.

---

## 🚀 Key Features

### 1. Main Unified Landing Page (`/`)
- Brand identity with official Vivtron logo and **"Ride the Spirit of Bharat"** tagline.
- Two interactive cards navigating independently to the **EV** and **EVCS** divisions.
- Ecosystem synergy overview detailing vehicle interoperability and smart charging.

### 2. EV Division (`/ev/*`)
- **Distinct Navigation & Footer**: Home, About Us, EV Products, Our Solutions, Services, Contact Us, and Back to Main Home.
- **Authentic Vivtron Model Catalog**:
  - **ROVER**: 1000W 30H Magnet Motor, 60V/72V dual controller, 175kg payload, 180mm front disc, hydraulic telescopic suspension.
  - **COOPER**: Urban executive electric scooter with long-life battery and aerodynamic curves.
  - **PLUTO / PULTO**: Agile sport electric commuter with instantaneous torque.
  - **EVOQUE**: Luxury electric tourer with digital instrumentation and premium finish.
  - **COUPE**: Compact urban styling with smooth progressive acceleration.
  - **MARTIN**: Rugged everyday electric scooter with reverse maneuver assist.
  - **LOADEX**: Heavy-duty commercial cargo vehicle with 250+ kg payload capacity.
  - **NEXO AUTO**: Fully automatic electric passenger auto-rickshaw (e-rickshaw).
- **Genuine OEM Powertrain Components**: Smart Battery Management System (BMS), Intelligent Fast Chargers, and BLDC Motors.
- **Corporate Heritage**: Unit of Vivan Group (Est. 2016), Noida Corporate Headquarters details, phone hotlines, and test ride / dealership inquiry portal.

### 3. EVCS Division (`/evcs/*`)
- **Dedicated Public Pages**: Home, About Us, Charging Solutions, Products, Services, Contact Us, Login, and Back to Main Home.
- **Live Network Telemetry**: Managed hubs, 99.85% uptime SLA, total energy delivered, and live session counts.
- **Interactive Charging Calculator**: Dynamic simulator calculating 10% to 80% charge times based on battery capacity (kWh) and dispenser power rating (22kW to 360kW).
- **Public Station Locator**: Live status distribution (Online, In Use, Maintenance).
- **Hardware Catalog**: HyperCharge 360, RapidPulse 180, UrbanFleet 60, ProWall 22, MegaDepot Pantograph 600.

### 4. EVCS Dedicated Authentication System (`/evcs/login`)
- Authenticates against the Node.js Express backend with **Bcrypt** password hashing.
- Supports login by **Email** or **Employee ID** (e.g. `VIV-ADM-001`).
- Interactive **Show/Hide Password** toggle, **Remember Me**, and **Forgot Password** reset modal.
- One-click **Quick Demo Fill** buttons for immediate testing.
- Cryptographically signed JWT tokens with role-based clearance.

### 5. Admin Dashboard (`/evcs/admin/*`)
- Redirect target for users with the `Admin` role.
- **Overview Cards**: Total Employees, Total Charging Stations, Total Products, Energy Dispensed (kWh), and Recent Activities.
- **Employee Management** (`/evcs/admin/employees`): Add new staff, edit details, toggle active/inactive access status, and assign roles.
- **Charging Stations** (`/evcs/admin/stations`): Commission new stations, monitor power output, connectors, and uptime metrics.
- **EVCS Product Catalog** (`/evcs/admin/products`): Full CRUD control over equipment SKUs, pricing, and technical parameters.
- **Reports & Analytics** (`/evcs/admin/analytics`): Daily power consumption bars, revenue estimation, and protocol share.
- **System Settings** (`/evcs/admin/settings`): Security policies, token expiration, password change, and database health.

### 6. Employee Dashboard (`/evcs/employee/*`)
- Redirect target for users with the `Employee` role.
- **Role Clearance**: Protected routes block employees from accessing Admin-only configuration.
- **Work Summary**: Visual counters for assigned, in-progress, pending, and completed tasks.
- **Assigned Tasks** (`/evcs/employee/tasks`): Interactive status updates (Pending → In Progress → Completed) with resolution notes.
- **Station Telemetry & Fault Reporting** (`/evcs/employee/stations`): Inspect stations and submit maintenance fault reports directly into the NOC queue.
- **Equipment Reference** (`/evcs/employee/products`): Access technical field manuals, wiring diagrams, and operating parameters.
- **Profile & Security** (`/evcs/employee/profile`): Update contact numbers and change operator passwords.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7, Lucide Icons |
| **Backend** | Node.js v24, Express, Built-in `node:sqlite` in WAL mode |
| **Security** | JSON Web Tokens (JWT), Bcrypt password hashing (10 salt rounds), RBAC middleware |
| **Database** | Relational SQLite (`vivtron.db`) with full transactional integrity and seed automation |

---

## 🔑 Pre-Configured Demo Credentials

| Role | Email / Identifier | Password | Access Clearance |
|---|---|---|---|
| **Super Admin** | `admin@vivtron.com`<br>*(or `VIV-ADM-001`)* | `Admin@Vivtron2026` | Full administrative access to `/evcs/admin/*` |
| **Field Employee** | `employee@vivtron.com`<br>*(or `VIV-EMP-101`)* | `Employee@Vivtron2026` | Field operations access to `/evcs/employee/*` |
| **Field Engineer** | `sarah.field@vivtron.com`<br>*(or `VIV-EMP-102`)* | `FieldTech@2026` | Hardware maintenance specialist |
| **Grid Engineer** | `dev.patel@vivtron.com`<br>*(or `VIV-EMP-103`)* | `GridTech@2026` | Power systems & grid integration |

---

## 💻 Quick Start & Running Locally

### 1. Prerequisites
- **Node.js** v20+ or v24+
- **npm** v10+

### 2. Install Dependencies
```bash
# In the project root:
npm install

# In the server directory:
cd server && npm install

# In the client directory:
cd ../client && npm install
```

### 3. Initialize & Seed Database
```bash
# From the root directory:
npm run seed
```
This initializes `server/src/db/vivtron.db` with sample employees, charging stations, products, tasks, and inquiries.

### 4. Run Both Client & Server Concurrently
```bash
# From the root directory:
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

*(Alternatively, run them separately in two terminals: `npm run dev:server` and `npm run dev:client`)*

---

## 🧪 Automated Integration Tests

To run the automated backend test suite verifying authentication, RBAC, stations, and inquiries:
```bash
cd server
node src/test-api.js
```

---

## 🏢 Corporate Contact Information

- **Company**: Vivtron (A Unit of Vivan Group)
- **Head Office**: G-71, Sector-63, Noida, Uttar Pradesh - 201301, India
- **Phone**: 0120-4144584 / +91 8929933680
- **Email**: info@vivtron.in
- **Web**: [vivtron.in](https://vivtron.in/)
