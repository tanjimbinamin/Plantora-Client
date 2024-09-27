export interface IInStock {
  quantity: number;
  status: string;
}

export interface IProduct {
  _id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  availability: IInStock;
  rating: string;
}
