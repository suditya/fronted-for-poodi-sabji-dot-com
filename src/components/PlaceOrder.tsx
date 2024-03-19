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
          <h2>Order Summary</h2>
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
                  <td><span>&#8377;</span> {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: <span>&#8377;</span> {getTotalPrice()}</p>
          <button
            // disabled={cartItems.length <= 0}
            onClick={() => handlePlaceOrder()}
          >
            Place Order
          </button>
        </div>
      </div>
      {orderPlaced && <OrderConfirmation />}
    </>
  );
};

export default PlaceOrder;
