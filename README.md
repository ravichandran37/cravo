# Cravo Kitchen & Bar - Fullstack Restaurant Ordering System

A modern, responsive, and fullstack food ordering website and admin management platform for **Cravo Kitchen & Bar**, built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MySQL**, utilizing design DNA and assets exported from **Google Stitch AI**.

---

## 🍽️ Key Features

### Customer Website
1. **Home Page (`/`)**:
   - Modern responsive navigation bar with logo, menu links, search, cart badge, and staff portal link.
   - Hero banner with appetizing food imagery, restaurant name, tagline, and "Order Now" call to action.
   - Category shortcuts (Burgers, Pizza, Chicken, Snacks, Drinks, Desserts).
   - "Popular Dishes This Week" and "Featured Highlights" sections with instant "Add to Cart" capability.
   - "Our Culinary Story" section featuring Executive Chef Elena Rostova.
   - Ambience & evening dining section.
   - Detailed bistro footer with hours, address, direct lines, and service links.

2. **Menu / Products Page (`/menu`)**:
   - Responsive cards with food image, category badge, name, description, price, and Add to Cart action.
   - Real-time search bar that filters products by name or description.
   - Category filtering pill buttons (All, Burgers, Pizza, Chicken, Snacks, Drinks, Desserts).
   - Sorting by Featured, Popular / Chef's Pick, Price: Low to High, and Price: High to Low.

3. **Product Details Page (`/product/:id`)**:
   - High-resolution food presentation image with thumbnail gallery previews.
   - Title, category tag, price, and culinary preparation notes.
   - Interactive quantity selector (`-` / `+`).
   - "Add to Cart" button with instant visual confirmation and toast alerts.
   - "You May Also Savor" recommendations section.

4. **Cart & Checkout (`/cart`)**:
   - Interactive cart item management: increase/decrease quantities, remove dishes, or clear cart.
   - Transparent order pricing breakdown: Subtotal, Free Delivery calculation (free over $40), Estimated Tax (8.25%), and Total Amount.
   - Streamlined delivery details form: Full Name, Phone Number, Delivery Address, and Special Delivery Notes.
   - "Place Order Now" action with automatic order creation, order ID confirmation, and delivery time estimate.

5. **Contact Page (`/contact`)**:
   - Physical address: *482 Artisan Boulevard, Suite 100, Culinary Arts District, NY 10012*.
   - Direct telephone line and table concierge email links.
   - Complete weekly operating and service hours schedule.
   - Interactive simulated GPS map and directions card.
   - Customer inquiry contact form with instant submission feedback.

---

### Admin Management System
Accessible at: **`/admin/login`**

- **Admin Login (`/admin/login`)**:
  - Secure login with Email / Username & Password.
  - JWT token generation and storage in `localStorage`.
  - Default demo credentials:
    - **Username:** `admin` (or `admin@cravo.com`)
    - **Password:** `admin123`

- **Admin Dashboard (`/admin/dashboard`)**:
  - Live metric cards: **Total Products**, **Total Orders**, **Pending Orders**, and **Completed Orders**.
  - Recent live kitchen tickets table with real-time status badges.
  - Quick shortcuts to manage menu products and orders.

- **Product Management (`/admin/products`)**:
  - Full product list with thumbnails, categories, pricing, and availability status.
  - **Add Product:** Modal to add new dishes with name, description, price, category, image URL or Stitch preset picker.
  - **Edit Product:** Update dish details, descriptions, or prices.
  - **Delete Product:** Remove dishes with prompt confirmation.
  - **In-Stock Toggle:** One-click instant stock availability toggle ("In Stock" / "Out of Stock").

- **Order Management (`/admin/orders`)**:
  - Real-time kitchen tickets with Order ID, customer name, phone, address, ordered dishes with quantities, and total amount.
  - Filter tabs: `All`, `Pending`, `Preparing`, `Ready`, `Delivered`, `Cancelled`.
  - Order status dropdown allowing staff to update stages from `Pending` through `Delivered`.

---

## 💻 Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, React Router DOM v7, Lucide React Icons.
- **Backend:** Node.js, Express.js, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS, Dotenv.
- **Database:** MySQL (`mysql2/promise`) with automatic schema initialization and auto-detecting embedded memory/file development mode.
- **Design System:** Warm Epicurean from Google Stitch AI (Epilogue & Plus Jakarta Sans typography, Terracotta `#a33900`, Saffron Amber `#855300`, Fresh Sage `#00685f`, Cream `#fcfbf9`).

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18 or newer recommended, v24 confirmed working)
- **MySQL** (Optional: the backend automatically connects to MySQL if running, or runs in seamless development mode if offline)

### 2. Install Dependencies

You can install all dependencies from the root directory:
```bash
# In the project root (cravo/):
npm run install:all
```

Or install separately in `client` and `server`:
```bash
# Install frontend dependencies:
cd client
npm install

# Install backend dependencies:
cd ../server
npm install
```

---

## 🗄️ MySQL Database Setup

### Option A: Using the Automated Script
Make sure your MySQL server is running (e.g., via MySQL Workbench, XAMPP, Docker, or native Windows service), then run:

```bash
cd server
npm run db:init
```
This automatically connects to MySQL, creates the `cravo_db` database, creates the tables (`admins`, `products`, `orders`, `order_items`), and seeds the admin user and all 12 dishes.

### Option B: Using the SQL Scripts Manually
1. Open MySQL Command Line or MySQL Workbench.
2. Run the schema creation script located at:
   `server/database/schema.sql`
3. Run the seed data script located at:
   `server/database/seeds.sql`

### Option C: Embedded Zero-Config Mode
If MySQL is not installed or currently offline, simply start the backend (`npm start`). The system automatically detects this and provides an embedded database so you can immediately test all ordering, admin, and menu operations without any configuration!

---

## ▶️ Running the Application

### 1. Start the Backend API Server
```bash
cd server
npm start
```
- API Server runs at: **`http://localhost:5000`**
- Health endpoint: **`http://localhost:5000/api/health`**

### 2. Start the Frontend Vite Dev Server
```bash
cd client
npm run dev
```
- Frontend application runs at: **`http://localhost:5173`**
- Customer Storefront: **`http://localhost:5173/`**
- Admin Portal: **`http://localhost:5173/admin/login`**

---

## 🌐 REST API Endpoints

### Products
- `GET /api/products` - List products (optional query: `?category=...&search=...`)
- `GET /api/products/:id` - Get dish details
- `POST /api/products` - Create new dish *(Protected: Admin JWT)*
- `PUT /api/products/:id` - Update dish *(Protected: Admin JWT)*
- `DELETE /api/products/:id` - Delete dish *(Protected: Admin JWT)*

### Orders
- `POST /api/orders` - Place customer order (creates order and item records)
- `GET /api/orders` - List all orders *(Protected: Admin JWT)*
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (`Pending`, `Preparing`, `Ready`, `Delivered`, `Cancelled`) *(Protected: Admin JWT)*

### Authentication & Stats
- `POST /api/admin/login` - Admin authentication (returns JWT token and admin info)
- `GET /api/admin/me` - Validate current token *(Protected: Admin JWT)*
- `GET /api/admin/stats` - Dashboard metrics *(Protected: Admin JWT)*

---

## 🎨 Stitch AI Assets
All 28 authentic food images, logos, chef headshots, and screen designs were extracted and downloaded directly from Google Stitch using `curl -L` and are housed under `client/public/images/`.

---

## 🔒 Production Deployment & Security Guide

### 1. Environment Secrets & Variables
Never commit `.env` files to source control. The repository includes pre-configured `.gitignore` files at the root, `client/`, and `server/` levels.

Generate a strong cryptographic secret for `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Configure the following variables in your hosting provider's dashboard:

| Variable | Description | Example (Production) |
| :--- | :--- | :--- |
| `NODE_ENV` | Application environment | `production` |
| `PORT` | Backend listening port | `5000` (or assigned by host) |
| `DB_HOST` | MySQL hostname | `aws-rds-mysql.xxx.com` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL user | `cravo_user` |
| `DB_PASSWORD` | MySQL password | *Your strong DB password* |
| `DB_NAME` | MySQL database | `cravo_db` |
| `JWT_SECRET` | 256-bit token secret | *64-character hex string* |
| `CLIENT_URL` | Allowed frontend origin(s) | `https://cravo-restaurant.vercel.app` |

On the frontend (`client`):
| Variable | Description | Example (Production) |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL to your deployed API | `https://cravo-api.onrender.com/api` |

### 2. Built-in Security Protections
- **Strict JWT Verification:** Token expiration enforced; mock development tokens are completely disabled in production.
- **Brute-Force Rate Limiting:** Login attempts are rate-limited to 5 consecutive attempts per IP with an automated 15-minute lockout period.
- **Security Headers:** Automatic inclusion of `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, and `Referrer-Policy`.
- **Server Identity Masking:** `X-Powered-By: Express` disabled.
- **Request Size Limiting:** JSON payloads constrained to 1MB to guard against DoS attacks.
- **CORS Domain Restrictions:** Strict origin checks against `CLIENT_URL` in production mode.
- **Parameterized SQL:** All database reads and writes use prepared parameters (`?`) preventing SQL injection.

