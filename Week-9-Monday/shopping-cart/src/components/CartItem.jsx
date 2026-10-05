import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../data/products';

/**
 * CartItem Component
 * Demonstrates: Child component rendering individual cart entry and firing parent callbacks.
 * 
 * @param {Object} props
 * @param {string} props.id - Product ID
 * @param {string} props.name - Product Name
 * @param {number} props.price - Price per unit
 * @param {number} props.quantity - Current item quantity in cart
 * @param {string} props.image - Product image URL
 * @param {Function} props.onIncrease - Callback function to increment quantity
 * @param {Function} props.onDecrease - Callback function to decrement quantity
 * @param {Function} props.onRemove - Callback function to delete item from cart
 */
const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const [imageError, setImageError] = useState(false);

  // Dynamic calculation for item subtotal
  const itemSubtotal = price * quantity;

  return (
    <div className="cart-item-card">
      {/* Product Image Thumbnail */}
      <div className="cart-item-image-wrapper">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="cart-item-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="cart-item-image-fallback">
            <ShoppingBag size={20} />
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h4 className="cart-item-title">{name}</h4>
          <span className="cart-item-id">ID: {id}</span>
        </div>
        <div className="cart-item-unit-price">
          {formatCurrency(price)} each
        </div>
      </div>

      {/* Quantity Control Buttons */}
      <div className="cart-item-quantity-controls">
        <button
          type="button"
          className="qty-btn qty-decrease"
          onClick={onDecrease}
          aria-label={`Decrease quantity of ${name}`}
          title={quantity === 1 ? "Remove item" : "Decrease quantity"}
        >
          {quantity === 1 ? <Trash2 size={14} className="danger-icon" /> : <Minus size={14} />}
        </button>

        <span className="qty-display" aria-label={`Quantity: ${quantity}`}>
          {quantity}
        </span>

        <button
          type="button"
          className="qty-btn qty-increase"
          onClick={onIncrease}
          aria-label={`Increase quantity of ${name}`}
          title="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Item Subtotal & Remove Action */}
      <div className="cart-item-subtotal-column">
        <span className="subtotal-label">Subtotal</span>
        <span className="cart-item-subtotal-price">
          {formatCurrency(itemSubtotal)}
        </span>
        <button
          type="button"
          className="remove-item-btn"
          onClick={onRemove}
          aria-label={`Remove ${name} from cart`}
          title="Remove item"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
