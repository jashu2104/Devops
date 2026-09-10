import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { RestaurantList } from './components/RestaurantList';
import { FoodItem } from './components/FoodItem';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { CATEGORIES, RESTAURANTS, FOOD_ITEMS } from './data/mockData';
import { Utensils, Sparkles, SearchX } from 'lucide-react';

export default function App() {
  // Cart State (useState)
  const [cartItems, setCartItems] = useState([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Overlay / Modal Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart Management Handlers
  const handleAddToCart = (foodItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === foodItem.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === foodItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...foodItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Cart Total Count & Amount
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // Dynamic Filtering Logic
  const filteredFoodItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // 1. Search Query Filter (name, description, category, or restaurant name)
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        RESTAURANTS.find((r) => r.id === item.restaurantId)?.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // 3. Restaurant Filter
      const matchesRestaurant =
        !selectedRestaurantId || item.restaurantId === selectedRestaurantId;

      return matchesSearch && matchesCategory && matchesRestaurant;
    });
  }, [searchQuery, selectedCategory, selectedRestaurantId]);

  const activeRestaurantName = useMemo(() => {
    if (!selectedRestaurantId) return null;
    return RESTAURANTS.find((r) => r.id === selectedRestaurantId)?.name;
  }, [selectedRestaurantId]);

  return (
    <div className="app-container">
      {/* Top Navigation Bar Component */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-card">
          <div className="hero-text">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 82, 0, 0.2)',
                color: 'var(--primary)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: '700',
                marginBottom: '0.8rem'
              }}
            >
              <Sparkles size={14} /> 30 MIN EXPRESS DELIVERY
            </span>
            <h1>
              Gourmet Dishes Delivered <span>Hot & Fast</span>
            </h1>
            <p>
              Order from top rated local chef kitchens, artisanal bakeries, and woodfire pizzerias near you.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">50+</span>
                <span className="stat-label">Restaurants</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">250+</span>
                <span className="stat-label">Dishes Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.9 ★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Component */}
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Restaurants Component */}
        <RestaurantList
          restaurants={RESTAURANTS}
          selectedRestaurantId={selectedRestaurantId}
          onSelectRestaurant={(id) => setSelectedRestaurantId(id)}
        />

        {/* Food Items Section */}
        <section id="menu">
          <div className="section-title-wrap">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Utensils color="var(--primary)" size={24} />
                <h2 className="section-title">
                  {activeRestaurantName
                    ? `Menu from ${activeRestaurantName}`
                    : selectedCategory !== 'all'
                    ? `${CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Dishes'}`
                    : 'Explore All Dishes'}
                </h2>
              </div>
              <span className="section-subtitle">
                Showing {filteredFoodItems.length} delicious item{filteredFoodItems.length !== 1 ? 's' : ''}
              </span>
            </div>

            {(selectedCategory !== 'all' || searchQuery || selectedRestaurantId) && (
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSelectedRestaurantId(null);
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Dynamic Food Items Grid */}
          {filteredFoodItems.length > 0 ? (
            <div className="food-grid">
              {filteredFoodItems.map((food) => {
                const cartItem = cartItems.find((i) => i.id === food.id);
                const qty = cartItem ? cartItem.quantity : 0;
                return (
                  <FoodItem
                    key={food.id}
                    item={food}
                    cartQuantity={qty}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                );
              })}
            </div>
          ) : (
            /* Conditional Rendering: Empty Search Results State */
            <div className="empty-state">
              <SearchX size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-subtle)' }} />
              <h3>No dishes match your filter</h3>
              <p>Try searching for a different dish name, clearing your search query, or selecting another category.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRestaurantId(null);
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Cart Drawer Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal Component */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        grandTotal={cartSubtotal > 0 ? cartSubtotal * 1.08 + (cartSubtotal >= 35 ? 0 : 2.99) : 0}
        onOrderSuccess={() => {
          handleClearCart();
        }}
      />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
