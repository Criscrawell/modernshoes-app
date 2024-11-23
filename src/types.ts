export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women';
  type: 'formal' | 'casual' | 'sport';
  image: string;
  description: string;
  sizes: number[];
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}