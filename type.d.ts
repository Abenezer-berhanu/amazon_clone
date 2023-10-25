export interface ProductProps {
  _id: string
  title: string;
  description: string;
  oldPrice?: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
}
