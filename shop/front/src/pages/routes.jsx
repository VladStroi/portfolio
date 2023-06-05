import * as React from 'react';
import { GroupsContainer } from './groups';
import { CategoryContainer } from './category';
import { ProductsContainer } from './products';
import TypographyTheme from './home/home';
import { CurrenciesTable } from './currency/currency-container';

export const homePage = {
  path: '/',
  name: 'Home',
  content: <TypographyTheme/>
};

export const routes = [
  homePage,
  {
    path: '/groups',
    name: 'Groups',
    content: <GroupsContainer />,
  },
  {
    path: '/products',
    name: 'Products',
    content: <ProductsContainer />,
  },
  {
    name: 'Category',
    path: '/categories',
    content: <CategoryContainer />,
  },
  {
    name: 'Currency',
    path: '/currency',
    content: <CurrenciesTable />,
  },
];
