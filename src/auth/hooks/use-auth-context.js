'use client';

import { useContext } from 'react';

import { AuthContext } from '../context/jwt/auth-context';
// import { AuthContext } from '../context/auth0/auth-context';
// import { AuthContext } from '../context/amplify/auth-context';
import { AuthContext as FirebaseAuthContext } from '../context/firebase/auth-context';
// import { AuthContext } from '../context/supabase/auth-context';

// ----------------------------------------------------------------------

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
export const useFirebaseContext = () => {
  const context = useContext(FirebaseAuthContext);

  if (!context)
    throw new Error('useFirebaseContext context must be use inside FirebaseAuthProvider');

  return context;
};
