import React from 'react';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { ShoppingBag, Trash2 } from 'lucide-react';

/**
 * Cart Component
 * Demonstrates: Conditional Rendering & Container for Cart List items
 * 
 * @param {Object} props
 * @param {Array<Object>} props.cart - Array of active items in the user's cart
 * @param {number} props.totalItems - Dynamically calculated sum of quantities
 * @param {Function} props.onIncreaseQuantity - Callback to increase item quantity
 * @param {Function} props.onDecreaseQuantity - Callback to decrease item quantity
 * @param {Function} props.onRemoveFromCart - Callback to remove item from cart
 * @param {Function} props.onClearCart - Callback to reset/empty cart
 * @param {Function} props.onStartShopping - Callback to scroll to product list
 */
const Cart = ({
  cart,
  totalItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onClearCart,
  onStartShopping
}) => {
  return (
    <div className="cart-container" id="cart-section">
      <div className="cart-header">
        <div className="cart-header-title">
          <ShoppingBag size={20} />
          <h2>Your Cart</h2>
          <span className="cart-item-badge">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>

        {cart.length > 0 && (
          <button
            type="button"
            className="clear-cart-btn"
            onClick={onClearCart}
            title="Remove all items from cart"
          >
            <Trash2 size={14} />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Conditional Rendering based on Cart state */}
      {cart.length === 0 ? (
        <EmptyCart onStartShopping={onStartShopping} />
      ) : (
        <div className="cart-items-list">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              onIncrease={() => onIncreaseQuantity(item.id)}
              onDecrease={() => onDecreaseQuantity(item.id)}
              onRemove={() => onRemoveFromCart(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
