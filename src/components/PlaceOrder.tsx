// PlaceOrder.jsx
import { useContext, useState } from "react";
import OrderConfirmation from "./OrderConfirmation";
import { CartContext } from "../context/cart";
import "../styles/PlaceOrder.css"; // Import the CSS file
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ICartProps } from "../utility/interfaces";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cart = useContext(CartContext);
  const cartItems = (cart.cartItems ?? []) as unknown as ICartProps[];

  const handlePlaceOrder = () => {
    // Perform order placement logic (API calls, updates, etc.)
    if (cartItems.length <= 0) {
      toast.error("Cart can not be empty for placing order", {
        position: "top-center",
      });
      return;
    }
    // Set the orderPlaced state to true when the order is successfully placed.
    setOrderPlaced(true);
    // setTimeout(() => {
    // cart.setCartItems([]);
    navigate("/payment");
    // }, 0);
  };

  const handleEditBackOrder = () => {
    navigate("/checkout");
  };

  const getTotalPrice = () => {
    let sum = 0;
    for (const item of cartItems) {
      sum += item.price * item.quantity;
    }
    return sum;
  };

  return (
    <>
      <Navbar />
      <div className="place-order-container">
        <div className="order-summary">
          <h2 className="order-summary-heading">Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span>&#8377; {item.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-price">
            Total: <span>&#8377; {getTotalPrice()}</span>
          </p>
          <div className="place-order-buttons-container">
            <button
              className="back-btn"
              // disabled={cartItems.length <= 0}
              onClick={() => handleEditBackOrder()}
            >
              Back to Edit Order
            </button>
            <button
              className="place-order-btn"
              // disabled={cartItems.length <= 0}
              onClick={() => handlePlaceOrder()}
            >
              Confirm and Place Order
            </button>
          </div>
        </div>
      </div>
      {orderPlaced && <OrderConfirmation />}
    </>
  );
};

export default PlaceOrder;
