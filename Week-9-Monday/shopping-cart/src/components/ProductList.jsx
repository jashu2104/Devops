import React from 'react';
import ProductCard from './ProductCard';
import { SearchX, RefreshCw } from 'lucide-react';

/**
 * ProductList Component
 * Demonstrates: Array Mapping (.map()), List Rendering, & Child-to-Parent Event Propagation
 * 
 * @param {Object} props
 * @param {Array<Object>} props.products - Array of filtered product objects to display
 * @param {Function} props.onAddToCart - Event handler callback function to add item to cart
 * @param {Function} props.onSelectProduct - Callback function to view detailed product modal
 * @param {Function} props.onResetFilters - Reset search and category filter state
 */
const ProductList = ({ products, onAddToCart, onSelectProduct, onResetFilters }) => {
  // Empty state when search or filter returns zero matches
  if (!products || products.length === 0) {
    return (
      <div className="no-products-container">
        <div className="no-products-card">
          <SearchX size={48} className="no-products-icon" />
          <h3 className="no-products-title">No products found</h3>
          <p className="no-products-subtitle">
            We couldn't find any items matching your search criteria or selected category filter.
          </p>
          <button 
            type="button" 
            className="reset-filters-btn"
            onClick={onResetFilters}
          >
            <RefreshCw size={16} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-wrapper">
      <div className="product-grid">
        {/* Dynamic Mapping over products array */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            badge={product.badge}
            description={product.description}
            rating={product.rating}
            onAdd={() => onAddToCart(product)}
            onSelectProduct={() => onSelectProduct(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
