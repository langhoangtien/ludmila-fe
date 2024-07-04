'use client';

import { useContext } from 'react';

import { ProductContext } from './product-context';

// ----------------------------------------------------------------------

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error('useProductContext context must be use inside ProductProvider');

  return context;
};
