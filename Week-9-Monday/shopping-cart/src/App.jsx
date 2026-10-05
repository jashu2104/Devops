import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Summary from './components/Summary';
import ProductDetailModal from './components/ProductDetailModal';
import { CheckoutModal, ClearCartModal } from './components/Modal';
import { INITIAL_PRODUCTS } from './data/products';
import { ShoppingBag, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

/**
 * App Component - Root Parent Component
 * 
 * Course: DEVOPS AND FULLSTACK
 * Assignment: 9.1 - Online Shopping Cart Management
 * 
 * Demonstrates:
 * 1. Single Source of Truth for State Management (`useState`)
 * 2. Parent-to-Child Data Flow via Props
 * 3. Child-to-Parent Event Handling via Callback Functions
 * 4. Dynamic Bill & Quantity Calculations using Array methods (.reduce, .map, .filter)
 * 5. Conditional Rendering for UI states (empty cart, search results, product detail modal)
 */
function App() {
  // -------------------------------------------------------------
  // STATE MANAGEMENT (useState)
  // -------------------------------------------------------------
  
  // Shopping Cart state - stores array of cart items { id, name, price, quantity, image }
  const [cart, setCart] = useState([]);

  // Search filter query string
  const [searchTerm, setSearchTerm] = useState('');

  // Category filter selection state
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Product Detail Quick View modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Interactive UI Modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Temporary notification toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  // -------------------------------------------------------------
  // DYNAMIC CATEGORY COMPUTATION
  // -------------------------------------------------------------
  // Extract unique categories from dataset dynamically
  const categories = ['All', ...new Set(INITIAL_PRODUCTS.map((p) => p.category))];

  // -------------------------------------------------------------
  // SEARCH & CATEGORY FILTERING LOGIC
  // -------------------------------------------------------------
  // Filter products based on search term (Name, Category, ID) AND category pill selection
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      term === '' ||
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.id.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  // -------------------------------------------------------------
  // EVENT HANDLER FUNCTIONS (Passed down as props)
  // -------------------------------------------------------------

  /**
   * Select a Product to inspect full details in modal
   */
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  /**
   * Add Product to Cart
   * If product already exists, increment its quantity by 1.
   * If product is new, append it to cart with quantity = 1.
   */
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Increment quantity for existing item
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with initial quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Show temporary feedback toast
    triggerToast(`Added "${product.name}" to your cart`);
  };

  /**
   * Increase Quantity of a Cart Item by 1
   */
  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /**
   * Decrease Quantity of a Cart Item by 1
   * If quantity === 1, remove item from cart
   */
  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const targetItem = prevCart.find((item) => item.id === productId);

      if (targetItem && targetItem.quantity === 1) {
        // Remove product when quantity drops below 1
        return prevCart.filter((item) => item.id !== productId);
      }

      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  /**
   * Remove Item completely from Cart
   */
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    triggerToast('Item removed from cart');
  };

  /**
   * Clear all items from cart
   */
  const handleClearCart = () => {
    setCart([]);
    setIsClearModalOpen(false);
    triggerToast('Cart cleared');
  };

  /**
   * Reset Search and Category filters
   */
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  /**
   * Trigger Notification Toast
   */
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  /**
   * Smooth scroll to Cart section on mobile/desktop header button click
   */
  const scrollToCart = () => {
    const cartElement = document.getElementById('cart-section');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Smooth scroll to Products list
   */
  const scrollToProducts = () => {
    const productsElement = document.getElementById('products-section');
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // -------------------------------------------------------------
  // DYNAMIC BILL CALCULATIONS (Derived State using .reduce)
  // -------------------------------------------------------------

  // Total Item Count (Sum of quantities of all items in cart)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal (Sum of price * quantity for all items)
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Bonus Discount: 10% of subtotal if subtotal > ₹5,000, else ₹0
  const discount = subtotal > 5000 ? subtotal * 0.1 : 0;

  // Free Delivery: ₹0 if subtotal > ₹2,000, else ₹100 (₹0 when cart is empty)
  const delivery = cart.length === 0 ? 0 : subtotal > 2000 ? 0 : 100;

  // Final Net Payable Total Bill
  const total = subtotal - discount + delivery;

  return (
    <div className="app-root">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER COMPONENT (Receives cartCount via prop) */}
      <Header cartCount={totalItems} onCartClick={scrollToCart} />

      {/* HERO / WELCOME BANNER SECTION */}
      <section className="hero-banner">
        <div className="hero-container">
          <h1 className="hero-title">Online Shopping Cart</h1>
          <p className="hero-description">
            Explore premium gadgets and tech accessories. Click any product card to view detailed specifications, unlock discount perks, and enjoy dynamic bill calculation.
          </p>

          {/* Quick Stats Banner */}
          <div className="hero-stats-row">
            <div className="stat-pill">
              <span className="stat-value">{INITIAL_PRODUCTS.length}</span>
              <span className="stat-label">Available Products</span>
            </div>
            <div className="stat-pill">
              <span className="stat-value">10% OFF</span>
              <span className="stat-label">Orders over ₹5,000</span>
            </div>
            <div className="stat-pill">
              <span className="stat-value">FREE Delivery</span>
              <span className="stat-label">Orders over ₹2,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN APPLICATION CONTAINER */}
      <main className="main-content-container">
        {/* SEARCH & FILTER CONTROLS SECTION */}
        <section className="controls-section">
          <div className="controls-card">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </section>

        {/* TWO COLUMN GRID LAYOUT (Products & Cart/Summary) */}
        <div className="app-layout-grid">
          {/* LEFT COLUMN: AVAILABLE PRODUCTS */}
          <section className="products-column" id="products-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Available Products</h2>
                <p className="section-subtitle">
                  Showing {filteredProducts.length} of {INITIAL_PRODUCTS.length} products
                  {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
                </p>
              </div>
              {searchTerm && (
                <span className="search-active-pill">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>

            {/* PRODUCT LIST COMPONENT */}
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
              onResetFilters={handleResetFilters}
            />
          </section>

          {/* RIGHT COLUMN: SHOPPING CART & SUMMARY */}
          <aside className="cart-summary-column">
            <div className="sticky-sidebar">
              {/* SHOPPING CART COMPONENT */}
              <Cart
                cart={cart}
                totalItems={totalItems}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={() => setIsClearModalOpen(true)}
                onStartShopping={scrollToProducts}
              />

              {/* ORDER SUMMARY COMPONENT */}
              <Summary
                totalItems={totalItems}
                subtotal={subtotal}
                discount={discount}
                delivery={delivery}
                total={total}
                onCheckout={() => setIsCheckoutOpen(true)}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <ShoppingBag size={20} />
              <span>Online Shopping Cart</span>
            </div>
            <p>B.Tech DevOps & Fullstack Course — Assignment 9.1</p>
          </div>
          <div className="footer-features">
            <span><ShieldCheck size={14} /> Immutable State Updates</span>
            <span><Sparkles size={14} /> Dynamic Bill Calculation</span>
            <span><HeartHandshake size={14} /> Props Data Flow</span>
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* CHECKOUT DEMO MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={total}
        totalItems={totalItems}
        onConfirmOrder={() => {
          setIsCheckoutOpen(false);
          setCart([]);
          triggerToast('🎉 Purchase Demo complete! Cart reset.');
        }}
      />

      {/* CLEAR CART CONFIRMATION MODAL */}
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
      />
    </div>
  );
}

export default App;
