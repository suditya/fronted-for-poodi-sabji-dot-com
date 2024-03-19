import { useNavigate } from "react-router-dom";
import foodItems from "../data/foodItems.json";
import Carousel from "./Carousel";
import Cart from "./Cart";
import FoodCard2 from "./FoodCard2";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";
import { ICartProps, IInventory } from "../utility/interfaces";
import "../styles/Home.css";
import { BACKEND_DEV_URL } from "../utility/common";
import axios from "axios";

const Home = () => {
  const cart = useContext(CartContext);
  const cartItems = (cart.cartItems ?? []) as ICartProps[];
  const [dishes, setDishes] = useState<IInventory[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(BACKEND_DEV_URL + "/inventory")
      .then((response) => {
        setDishes(response.data.inventory);
        // console.log(response.data.inventory);
      })
      .catch((error) => {
        console.log(error, "Failed to get inventory from server");
      });
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      {/* <Carousel />
       */}
      {/* <div className="image-container">
        <img src="https://youtu.be/-YuI-cQtasc" alt="" />
      </div> */}
      <div className="wrapper">
        <div className="food-container">
          {dishes.map((foodItem) => (
            <FoodCard2
              src={foodItem.imgSrc}
              description={foodItem.description}
              title={foodItem.productName}
              price={foodItem.price}
              quantity={foodItem.quantity}
              id={foodItem.id}
            />
          ))}
        </div>
      </div>
      {/* <div className="right"> */}
      <div className="cart">
        <Cart />
        <hr />
        {/* </div> */}
      </div>

      <button
        style={{ transition: "all 0.8s ease-out" }}
        className={
          "go-to-checkout button " + (cartItems.length > 0 ? "showCart" : "hideCart")
        }
        onClick={() => navigate("/checkout")}
      >
        Go To Checkout
      </button>
    </div>
    // </div>
  );
};

export default Home;
