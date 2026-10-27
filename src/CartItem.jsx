import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to extract numeric value from cost string (e.g., "$15" -> 15)
  const parseCost = (cost) => {
    if (typeof cost === 'number') return cost;
    return parseFloat(cost.toString().replace(/[^0-9.-]+/g, '')) || 0;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemCost = parseCost(item.cost);
      total += itemCost * item.quantity;
    });
    return total.toFixed(2);
  };

  // Calculate total quantity of all items in cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total cost based on quantity for a specific item
  const calculateTotalCost = (item) => {
    const itemCost = parseCost(item.cost);
    return (itemCost * item.quantity).toFixed(2);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue shopping button click handler
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Checkout button click handler
  const handleCheckoutShopping = () => {
    alert('Thank you for shopping at Paradise Nursery! Checkout functionality will be added in a future update.');
  };

  const totalAmount = calculateTotalAmount();
  const totalQuantity = calculateTotalQuantity();

  return (
    <div className="cart-container">
      <div className="cart-header-section">
        <h2 className="cart-main-title">Your Shopping Cart</h2>
        <div className="cart-summary-badge">
          <span>Total Plants: <strong>{totalQuantity}</strong></span>
          <span className="summary-divider">•</span>
          <span>Total Amount: <strong>${totalAmount}</strong></span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>You haven't added any serene plants to your cart yet.</p>
          <button 
            type="button" 
            className="continue-btn empty-cart-btn"
            onClick={handleContinueShopping}
          >
            Explore Plant Catalog
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div className="cart-item-card" key={item.name}>
                <div className="cart-item-image-wrapper">
                  <img 
                    className="cart-item-image" 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy"
                  />
                </div>

                <div className="cart-item-details">
                  <div className="cart-item-info-top">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-cost">Unit Price: {item.cost}</p>
                  </div>

                  <div className="cart-item-controls-row">
                    <div className="quantity-controller" role="group" aria-label={`Quantity controls for ${item.name}`}>
                      <button
                        type="button"
                        className="quantity-btn decrement-btn"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        &minus;
                      </button>
                      <span className="quantity-value" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="quantity-btn increment-btn"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        &#43;
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      <span className="subtotal-label">Subtotal:</span>
                      <span className="subtotal-amount">${calculateTotalCost(item)}</span>
                    </div>

                    <button
                      type="button"
                      className="cart-item-delete-btn"
                      onClick={() => handleRemove(item)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer-panel">
            <div className="cart-total-display">
              <span className="cart-total-label">Total Cart Amount:</span>
              <span className="cart-total-value">${totalAmount}</span>
            </div>

            <div className="cart-actions-group">
              <button
                type="button"
                className="cart-action-btn continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                &larr; Continue Shopping
              </button>
              <button
                type="button"
                className="cart-action-btn checkout-btn"
                onClick={handleCheckoutShopping}
              >
                Proceed to Checkout &rarr;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
