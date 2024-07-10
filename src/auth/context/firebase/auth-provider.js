'use client';

import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { doc, getDoc, setDoc, collection, getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { endpoints } from 'src/utils/fetch';

import { firebaseApp } from './lib';
import { setSession } from '../jwt/utils';
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          if (user.emailVerified) {
            const userProfile = doc(DB, 'users', user.uid);

            const docSnap = await getDoc(userProfile);

            const profile = docSnap.data();

            dispatch({
              type: 'INITIAL',
              payload: {
                user: {
                  ...user,
                  ...profile,
                  id: user.uid,
                  role: 'admin',
                },
              },
            });
          } else {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  /*
   * (1) If skip emailVerified
   * Remove the condition (if/else) : user.emailVerified
   */
  /*
  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userProfile = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userProfile);

          const profile = docSnap.data();

          dispatch({
            type: Types.INITIAL,
            payload: {
              user: {
                ...user,
                ...profile,
                id: user.uid,
                role: 'admin',
              },
            },
          });
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);
*/

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async ({ email, password, providerLogin = 'email' }) => {
    let data = {};
    if (providerLogin === 'google') {
      const provider = new GoogleAuthProvider();
      const dataResponse = await signInWithPopup(AUTH, provider);
      const idToken = await dataResponse.user.getIdToken();

      data = { idToken };
    }
    console.log('data', data);
    const response = await fetch(endpoints.auth[providerLogin], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { token, user } = response;
    if (!token) return;
    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
          token,
        },
      },
    });
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    const user = await signInWithPopup(AUTH, provider);
    const idToken = await user.user.getIdToken();
    console.log('idToken', idToken);
  }, []);
  const loginWithFacebook = useCallback(async () => {
    const provider = new FacebookAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);
  const loginWithGithub = useCallback(async () => {
    const provider = new GithubAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithTwitter = useCallback(async () => {
    const provider = new TwitterAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const newUser = await createUserWithEmailAndPassword(AUTH, email, password);

    /*
     * (1) If skip emailVerified
     * Remove : await sendEmailVerification(newUser.user);
     */
    await sendEmailVerification(newUser.user);

    const userProfile = doc(collection(DB, 'users'), newUser.user?.uid);

    await setDoc(userProfile, {
      uid: newUser.user?.uid,
      email,
      displayName: `${firstName} ${lastName}`,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(AUTH, email);
  }, []);

  // ----------------------------------------------------------------------

  /*
   * (1) If skip emailVerified
   * const checkAuthenticated = state.user?.emailVerified ? 'authenticated' : 'unauthenticated';
   */
  const checkAuthenticated = state.user?.emailVerified ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithFacebook,
      loginWithGithub,
      loginWithTwitter,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGithub,
      loginWithGoogle,
      loginWithFacebook,
      loginWithTwitter,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
