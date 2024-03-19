export interface ICartItems {
  items: ICartProps[];
}

export interface IPlusMinus {
  quantity: number;
  // onClick: () => void;
}

export interface ICartProps {
  id?: string;
  src: string;
  description: string;
  title: string;
  price: number;
  quantity: number;
}

export interface IInventory {
  id: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  imgSrc: string;
}
