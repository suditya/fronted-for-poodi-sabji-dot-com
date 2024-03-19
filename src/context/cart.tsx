import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
  Dispatch,
} from "react";

import axios from "axios";
import { getEmailId, isLoggedIn } from "../services/users";
import { BACKEND_DEV_URL } from "../utility/common";

export const CartContext = createContext({
  cartItems: [],
  setCartItems: Dispatch<SetStateAction<never[]>>, // Provide a dummy function if needed
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        if (isLoggedIn()) {
          // means logged in
          const email = getEmailId();
          const response = await axios.get(BACKEND_DEV_URL + "/get-cart", {
            params: { email },
          });
          const data = await response.data;
          console.log(data, " from Backend cart");
          setCartItems(data.cartItems);
        }
      } catch (error) {
        console.error("Error fetching data from backend:", error);
        setCartItems([]);
      }
    };

    fetchDataFromBackend();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {props.children}
    </CartContext.Provider>
  );
};
