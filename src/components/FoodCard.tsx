import Card from "react-bootstrap/Card";
import PlusMinus from "./PlusMinus";

interface IProps {
  id: string;
  price: number;
  src: string;
  description: string;
  title: string;
  addToCart: (item: IProps) => void;
  quantity: number;
}

const FoodCard = (props: IProps) => {
  return (
    <Card style={{ width: "18rem", height: "24rem", marginTop: "5px" }}>
      <Card.Img
        style={{
          height: "8.5rem",
          width: "100%",
          borderRadius: "3px 3px 0px 0px",
          objectFit: "cover",
        }}
        variant="top"
        src={props.src}
      />
      <Card.Body>
        <Card.Title>
          {props.title} ₹{props.price ?? 0}
        </Card.Title>
        <Card.Text className="overflow-hidden">{props.description}</Card.Text>
        <PlusMinus
          src={props.src}
          id={props.id}
          title={props.title}
          price={props.price}
          description={props.description}
          quantity={props.quantity}
        />
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
