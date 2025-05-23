# BiteIt - Canteen Management System 🍽️

[![Live Demo](https://img.shields.io/badge/Demo-Live-green)](https://biteit.onrender.com/)

**BiteIt** is a comprehensive web application designed to digitize and streamline the operations of a canteen. It modernizes how users interact with canteen services and how administrators manage orders, menu items, and sales.

---

## 📝 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔎 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [🪪 License](#-license)

---

## ✨ Features

**User Functions** 👤  
- 🧾 View menu and item details  
- 🛒 Add items to cart  
- 💳 Checkout with secure Stripe payments  
- 🔐 Authentication with JWT tokens  

**Admin Functions** 👑  
- 📊 Dashboard for order management  
- ✏️ CRUD operations for menu items and orders  
- 📈 Sales tracking and analytics  

**General**  
- 🎨 Responsive, modern UI with React and Tailwind CSS  
- ⚡ Efficient backend with Node.js, Express.js, and MongoDB  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Payments:** Stripe
- **Other:** REST API, Responsive Design

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later) 🟢
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) 📦
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas) 🍃
- [Stripe](https://stripe.com/) account for payments 💳

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharth9300/BiteIt.git
   cd BiteIt
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables:**  
   Create `.env` files in both `server` and `client` directories as per the provided `.env.example` or documentation.

4. **Start the development servers:**
   ```bash
   # In the backend/server directory
   npm run dev

   # In the frontend/client directory
   npm run dev
   ```

---

## 📁 Project Structure

```
BiteIt/
├── client/      # Frontend (React, Vite)
│   └── ...
├── server/      # Backend (Node.js, Express, MongoDB)
│   └── ...
├── README.md
├── package.json
└── ...
```

- `client/` – Contains all frontend source code and assets
- `server/` – Contains all backend source code, API routes, controllers, models, and configuration

---

## 🔎 Usage

- **User:** Register/login, browse menu, add to cart, and checkout securely
- **Admin:** Login to dashboard, manage menu items, view and update orders, analyze sales

🌐 Visit the live app: [https://biteit.onrender.com/](https://biteit.onrender.com/)

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests to propose improvements or report bugs.

1. Fork the repository 🍴
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request 🚀

---

## 🪪 License

This project is currently unlicensed. Please add a license if you plan to share or use this code publicly.

---

*For questions or support, please open an issue or contact the repository owner.* 🙋
