# Paradise Nursery - Online Plant Shopping Application

Welcome to **Paradise Nursery** — *"Where Green Meets Serenity"*. This modern, responsive e-commerce shopping cart web application was developed using **React**, **Redux Toolkit**, and **Vite**.

---

## 🌿 Project Overview

Paradise Nursery is designed to bring the tranquility and health benefits of indoor plants directly to plant lovers and urban dwellers. The application delivers an intuitive shopping experience where users can:
- Explore the nursery's background and values on the botanical landing page.
- Browse a curated inventory of plants organized into functional categories (*Air Purifying*, *Aromatic & Fragrant*, *Medicinal & Wellness*, and *Low Maintenance & Succulents*).
- Inspect plant details, including high-resolution imagery, descriptions, and pricing.
- Add plants to the shopping cart, with dynamic button states ("Add to Cart" → "Added to Cart").
- View a live cart badge counter in the top navigation bar updating instantly across the app.
- Manage cart items with full quantity controls (`+`, `-`, and delete), with automatic recalculation of item subtotals and grand totals.
- Inspect plants up close via an interactive Plant Image & Botanical Care preview modal.
- Checkout with multiple payment methods: **UPI Online Payment with Dynamic QR Code**, **Credit/Debit Card**, **Net Banking**, and **Cash on Delivery (COD)**.
- Generate an instant, printable order invoice receipt with Order ID, customer address, tracking status, and price breakdown.
- Seamlessly transition between the catalog and the cart with "Continue Shopping" and "Checkout" actions.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Typography & Styling**: Google Fonts (*Playfair Display* and *Plus Jakarta Sans*), Modern CSS3 with Flexbox, CSS Grid, and Glassmorphic aesthetics.

---

## 📂 Project Structure

```text
Paradise Nursery/
├── index.html              # HTML5 entrypoint with Google Fonts & botanical favicon
├── package.json            # Project dependencies and npm scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx            # Application mount point with Redux Provider
│   ├── store.js            # Redux store configuration
│   ├── CartSlice.jsx       # Redux slice with reducers (addItem, removeItem, updateQuantity)
│   ├── App.jsx             # Root component handling Landing Page & Product List views
│   ├── App.css             # Hero & global layout styles
│   ├── ProductList.jsx     # Navigation bar, plant catalog, categories & Add to Cart logic
│   ├── ProductList.css     # Styling for navigation, badges, and plant card grid
│   ├── CartItem.jsx        # Shopping cart view, quantity adjustments, item & total calculations
│   ├── CartItem.css        # Cart cards, controls, and checkout panel styles
│   ├── AboutUs.jsx         # Nursery background, mission, and benefits
│   └── AboutUs.css         # Card and highlight styling for About Us section
└── dist/                   # Production build output
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### Installation

Clone or open the project folder in your terminal:

```bash
cd "Paradise Nursery"
npm install
```

### Running Locally

To launch the local development server:

```bash
npm run dev
```

Open `http://localhost:3000` (or the port shown in your terminal) in your browser.

### Building for Production

To create an optimized production bundle:

```bash
npm run build
```

The output will be placed in the `dist/` directory.

---

## ✨ Features & Rubric Compliance

1. **Landing Page (`App.jsx` & `AboutUs.jsx`)**:
   - Botanical background with lush greenhouse imagery.
   - Prominent nursery title and tagline *"Where Green Meets Serenity"*.
   - Mission statement and key highlights (Quality, Air Purifying, Expert Guidance).
   - "Get Started" call-to-action button that transitions smoothly into the plant catalog.

2. **Product Catalog (`ProductList.jsx`)**:
   - Universal navigation bar containing company logo, name, tagline, "Plants" toggle, and cart icon with live badge counter.
   - 24 carefully curated plants across 4 categories:
     - Air Purifying Plants
     - Aromatic & Fragrant Plants
     - Medicinal & Wellness Plants
     - Low Maintenance & Succulents
   - Interactive plant cards with photos, descriptions, prices, and "Add to Cart" buttons.
   - Real-time button disabling and "Added to Cart" indicator when an item is already in the cart.

3. **Shopping Cart Management (`CartItem.jsx` & `CartSlice.jsx`)**:
   - Total items count and dynamic total cart cost display.
   - Individual item rows displaying plant image, name, unit cost, quantity controls (`-` and `+`), and computed subtotal.
   - Delete button to remove any plant directly from the cart.
   - Automatic removal if item quantity is decremented to zero.
   - "Continue Shopping" button returning the user to the product catalog with their cart state preserved.
   - "Checkout" button triggering a friendly user alert for future checkout processing.
