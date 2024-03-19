import "../styles/CartBox.css";
import { ICartProps } from "../utility/interfaces";
import PlusMinus from "./PlusMinus";

const CartBox = (props: ICartProps) => {
  console.log(props, "props in CartBox");
  return (
    <div className="cart-box-container">
      <div className="food-description">
        <div className="food">
          <img
            src={props.src}
            alt=""
            style={{
              width: "100px",
              objectFit: "fill",
              flex: "1 1 0%",
              display: "flex",
              height: "4.2rem",
              position: "relative",
            }}
          />
        </div>
        <div
          className="description"
          style={{
            flex: "3 1 0%",
            display: "flex",
            flexDirection: "column",
            marginLeft: "1rem",
          }}
        >
          <div className="title">
            <p style={{ fontSize: "18px", fontWeight: "600" }}>{props.title}</p>
            {/* <p>{props.description}</p> */}
            {/* <p>Medium | New Hard Tossed</p> */}
          </div>
        </div>
      </div>
      <div className="quantity-price-container">
        <div className="quantity">
          <PlusMinus
            src={props.src}
            id={props.id}
            title={props.title}
            price={props.price}
            description={props.description}
            quantity={props.quantity}
          ></PlusMinus>
        </div>
        <div className="total-price">
          <span>&#8377;</span> {props.quantity * Number(props.price)}
        </div>
      </div>
    </div>
  );
};

export default CartBox;
