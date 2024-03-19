import { ICartProps } from "../utility/interfaces";
import PlusMinus from "./PlusMinus";

const FoodCard2 = (props: ICartProps) => {
  return (
    <div
      className="food-card"
      style={{
        boxShadow: "9px 6px 17px 4px #3d3c3b33",
        position: "relative",
      }}
    >
      <img src={props.src} alt={props.title} className="food-image" />
      <div className="food-details">
        <h3 className="food-title">{props.title}</h3>
        <h3 className="food-title">
          Price: <span>&#8377;</span>
          {props.price}
        </h3>
        {/* <div className="food-description">
          <p>{props.description}</p>
        </div> */}
      </div>
      <hr className="" />
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "0.3rem",
        }}
      >
        <PlusMinus
          src={props.src}
          id={props.id}
          title={props.title}
          price={props.price}
          description={props.description}
          quantity={props.quantity}
        />
      </div>
    </div>
  );
};

export default FoodCard2;
