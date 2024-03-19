import { useContext, useEffect } from "react";
import { CartContext } from "../context/cart";
import axios from "axios";
import { BACKEND_DEV_URL, isNullOrUndefined } from "../utility/common";
import { isLoggedIn } from "../services/users";
import { ICartProps } from "../utility/interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlusMinus = (props: ICartProps) => {
  const cart = useContext(CartContext);
  const cartItems = cart.cartItems as ICartProps[];
  const email = localStorage.getItem("LoggedInEmail");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn() && cartItems && cartItems.length > 0) {
      console.log("sending request to backend", cartItems);
      axios
        .post(BACKEND_DEV_URL + "/add-to-cart", {
          cartItems,
          email,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("backend error: " + err);
        });
      // console.log(response, "after updating cart");
    }
  }, [cart.cartItems, cartItems, email]);

  const addToCart = async () => {
    // if not logged in redirect to login page
    if (!isLoggedIn()) {
      setTimeout(() => {
        toast.info(`Login yourself to add to cart`, {
          position: "top-center",
        });
        navigate("/login");
      });
      return;
    }
    const item = props;
    let updatedItems = [...(cart.cartItems ?? [])] as ICartProps[];
    let existingItemIndex = -1;

    if (updatedItems.length > 0) {
      existingItemIndex = updatedItems.findIndex((it) => it.id === item.id);
    }

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
      };
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      // If the item is not in the cart, add it with quantity 1
      updatedItems.push({ ...item, quantity: 1 });
    }

    // Remove items with quantity 0 or less
    updatedItems = updatedItems.filter((item) => item.quantity > 0);

    cart.setCartItems(updatedItems);
    console.log(updatedItems); // Use updatedItems instead of cartItems
  };

  const incrementQuantity = () => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === props.id) {
        item.quantity += 1;
      }
      return item;
    });

    cart.setCartItems(updatedCartItems);
    console.log(cartItems);
  };

  const decrementQuantity = () => {
    if (
      cart.cartItems === undefined ||
      cart.cartItems.length === 0 ||
      cart.cartItems === null
    ) {
      cart.cartItems = [];
    }
    let updatedCartItems =
      cartItems.map((item) => {
        if (item.id === props.id) {
          item.quantity -= 1;
        }
        return item;
      }) ?? [];
    updatedCartItems = updatedCartItems.filter((item) => item.quantity > 0);
    cart.setCartItems(updatedCartItems);
    console.log(cartItems);
  };

  const getQuantityFromCartItems = () => {
    if (
      isNullOrUndefined(cart) ||
      isNullOrUndefined(cart.cartItems) ||
      cart.cartItems.length == 0
    )
      return 0;
    const item = cartItems.find((it) => it.id === props.id);
    return item ? item.quantity : 0;
  };

  return (
    <div
      className="plus-minus-container"
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      {getQuantityFromCartItems() > 0 ? (
        <>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            className="plus-minus-buttons"
            onClick={() => decrementQuantity()}
          >
            ➖
          </button>
          <button
            style={{
              backgroundColor: "#f0f0f0",
              border: "none",
              padding: "8px 12px",
              cursor: "default",
              color: "black",
            }}
            className="quantity"
          >
            {getQuantityFromCartItems()}
          </button>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            className="plus-minus-buttons"
            onClick={() => incrementQuantity()}
          >
            ➕
          </button>
        </>
      ) : (
        <button
          style={{
            backgroundColor: "rgb(76, 175, 80)",
            color: "white",
            padding: "1rem 1rem",
            borderRadius: "13px",
            fontFamily: "monospace",
            border:"none"
          }}
          onClick={() => addToCart()}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default PlusMinus;
