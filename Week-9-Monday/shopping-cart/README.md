# Online Shopping Cart Management

**Course:** DEVOPS AND FULLSTACK  
**Assignment:** 9.1  
**Scenario:** Online Shopping Cart Management Application  

---

## 📌 Description

This project is a modern, production-quality React application created for college assignment evaluation. It demonstrates essential React frontend software engineering principles, including:

- Component-Based Architecture
- Parent-to-Child Data Flow via **Props**
- Child-to-Parent Event Handling via **Callback Functions**
- State Management using **`useState()`**
- Dynamic Bill Calculation using Array **`.reduce()`**
- Live Search & Multi-category Filtering using **`.filter()`**
- List Rendering using **`.map()`**
- Conditional Rendering for Empty Cart, Product Details Modal, and Interactive Dialogs

---

## ✨ Features

- **Product Catalog (22 Items)**: Expanded dataset covering Electronics, Accessories, Audio, Wearables, Furniture, and Lighting categories with ratings and detailed technical specifications.
- **Product Details Quick View Modal**: Clicking any product card opens a dedicated detail view modal displaying:
  - High-res Product Media & Category Chips
  - Full Product Description & Customer Ratings ⭐
  - Technical Specifications Bullet List
  - Quantity Multiplier Selector inside Modal
  - Direct "Add to Cart" CTA button
- **Search & Category Filter**: Simultaneous, real-time filtering by product name, category, or ID (e.g., `Laptop`, `P101`, `Electronics`).
- **Dynamic Cart Management**:
  - **Add to Cart**: Adds new products or increments quantity if item already exists.
  - **Quantity Adjustments**: Increment (`+`) or decrement (`-`) quantities dynamically. Decreasing quantity to `0` removes the item.
  - **Remove Item**: Instant trash button to remove specific products.
  - **Clear Cart**: Complete cart wipe with confirmation dialog.
- **Dynamic Bill & Total Calculation**:
  - **Total Items**: Sum of all quantities in cart.
  - **Subtotal**: Sum of `(price × quantity)` across all items.
  - **Discount Perk (10%)**: Unlocked automatically when subtotal exceeds **₹5,000**. Dynamic progress bar prompts the user if they are below the threshold.
  - **Free Delivery Perk**: Delivery fee is **FREE** when subtotal exceeds **₹2,000**, otherwise **₹100**.
  - **Final Total**: `Subtotal - Discount + Delivery`.
- **Responsive & Accessible Design**: Optimized for Desktop, Tablet, and Mobile screens with accessible button labels and clean color contrast.

---

## 🛠️ Technologies Used

- **React 19**
- **Vite** (Build Tool & Dev Server)
- **JavaScript (ES6+)**
- **Vanilla CSS3** (Custom Design System with CSS variables)
- **Lucide React** (Lightweight SVG Icon Library)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** (v18+) installed on your machine.

### 2. Installation & Launch Commands

```bash
# Navigate to project root directory
cd shopping-cart

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🏗️ Component Architecture

```text
shopping-cart/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx              # App title, branding, dynamic cart badge
│   │   ├── SearchBar.jsx           # Controlled search input component
│   │   ├── CategoryFilter.jsx      # Category filter pills navigation
│   │   ├── ProductList.jsx         # Maps over products array to render ProductCard grid
│   │   ├── ProductCard.jsx         # Product card & click handler for details view
│   │   ├── ProductDetailModal.jsx  # Detailed product quick view modal with specs
│   │   ├── Cart.jsx                # Cart container, list items or empty state
│   │   ├── CartItem.jsx            # Individual cart entry with quantity controls
│   │   ├── Summary.jsx             # Order summary bill breakdown & offers progress
│   │   ├── EmptyCart.jsx           # Empty state graphic & CTA button
│   │   └── Modal.jsx               # Checkout Demo and Clear Cart dialogs
│   │
│   ├── data/
│   │   └── products.js             # Initial 22-product dataset & formatCurrency utility
│   │
│   ├── App.jsx                     # Central Parent component managing state & business logic
│   ├── main.jsx                    # React DOM root renderer
│   └── index.css                   # Global responsive CSS design system
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔄 React Data & State Flow

```text
                                  App Component (Parent)
                             [useState: cart, selectedProduct]
                                            │
        ┌───────────────────┬───────────────┼───────────────┬───────────────────┐
        ▼                   ▼               ▼               ▼                   ▼
    Header.jsx       ProductList.jsx   ProductDetail.jsx  Cart.jsx           Summary.jsx
   (cartCount)     (products, onAdd)   (product, onAdd) (cart, handlers)   (subtotal, total)
                            │
                            ▼
                     ProductCard.jsx
```

---

## 🧪 Verification & Test Cases

| Test Case | Scenario / Action | Expected Result | Status |
|---|---|---|---|
| **Test 1** | Click any Product Card | Product Details Modal opens showing full specs, customer rating, description, and quantity selector. | ✅ Passed |
| **Test 2** | Add **Laptop × 1** (₹60,000) | Subtotal: ₹60,000 \| Discount: ₹6,000 (10%) \| Delivery: FREE \| Total: **₹54,000** | ✅ Passed |
| **Test 3** | Add **Headphones × 2** (₹2,000 ea) | Subtotal: ₹64,000 \| Discount: ₹6,400 \| Delivery: FREE \| Total: **₹57,600** | ✅ Passed |
| **Test 4** | Search `vertical mouse` | Only matching Ergonomic Vertical Mouse product displays. | ✅ Passed |
| **Test 5** | Category Filter `Audio` | Displays Headphones, Speaker, Earbuds, Studio Headphones, and Desktop Soundbar. | ✅ Passed |
| **Test 6** | Clear Cart | Confirmation modal pops up, clicking confirm resets cart to EmptyCart state. | ✅ Passed |
