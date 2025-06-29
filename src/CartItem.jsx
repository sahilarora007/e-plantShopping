import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Cost: {item.cost}</p>
                <div className="quantity-buttons">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <button onClick={() => handleRemove(item)} className="remove-button">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${calculateTotalAmount()}</h3>
            <button onClick={onContinueShopping} className="continue-button">
              Continue Shopping
            </button>
            <button onClick={handleCheckoutShopping} className="checkout-button">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;

  );
}

export default CartItem;



