'use client';

import { useContext } from 'react';

import { CartContext } from './cart-context';

// import { AuthContext } from '../context/auth0/auth-context';
// import { AuthContext } from '../context/amplify/auth-context';
// import { AuthContext } from '../context/firebase/auth-context';
// import { AuthContext } from '../context/supabase/auth-context';

// ----------------------------------------------------------------------

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCartContext context must be use inside CartProvider');

  return context;
};
