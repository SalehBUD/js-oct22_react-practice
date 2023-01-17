export interface User {
  id: number;
  name: string;
  sex: string;
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  ownerId: number;
  owner: User | undefined;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  category: Category | undefined;
}
