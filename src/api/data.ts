import usersFromServer from './users';
import productsFromServer from './products';
import categoriesFromServer from './categories';

import { Category, Product } from '../types/Type';

const getOwner = (id: number) => {
  return usersFromServer.find((user) => user.id === id);
};

const categories: Array<Category> = categoriesFromServer.map((category) => ({
  ...category,
  owner: getOwner(category.ownerId),
}));

const getCategory = (id: number) => {
  return categories.find((item) => item.id === id);
};

export const products: Array<Product> = productsFromServer.map((product) => ({
  ...product,
  category: getCategory(product.categoryId),
}));
