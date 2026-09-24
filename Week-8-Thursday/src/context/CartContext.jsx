import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Cart Context
export const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'booknest_cart_v1';

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage with safe error handling
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
    }
    return [];
  });

  // Notification Toast state
  const [toast, setToast] = useState(null);

  // Helper to trigger toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  // Add book to cart or increase quantity
  const addToCart = (book, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.book.id === book.id);

      if (existingItemIndex > -1) {
        // Book exists, update quantity
        const updatedCart = [...prevCart];
        const newQty = updatedCart[existingItemIndex].quantity + quantityToAdd;
        
        // Enforce max stock limit if available
        const finalQty = book.stock ? Math.min(newQty, book.stock) : newQty;

        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: finalQty
        };
        return updatedCart;
      } else {
        // New item in cart
        return [...prevCart, { book, quantity: Math.min(quantityToAdd, book.stock || 99) }];
      }
    });

    const shortTitle = book.title.length > 28 ? `${book.title.substring(0, 28)}...` : book.title;
    showToast(`Added "${shortTitle}" to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId));
    showToast('Removed book from cart', 'info');
  };

  // Update item quantity directly
  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.book.id === bookId) {
          const maxStock = item.book.stock || 99;
          const clampedQty = Math.min(newQuantity, maxStock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  // Clear all cart items
  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  // Total item count in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Subtotal in Rupees
  const subtotal = cart.reduce((total, item) => total + item.book.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        toast,
        hideToast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
