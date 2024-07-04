'use client';

import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { CartContext } from './cart-context';

export const SHIPPING_THRESHOLD = 500000;
export const SHIPPING_FEE = 30000;
const INITIAL_STATE = {
  products: [],
  totalPrice: 0,
  subTotal: 0,
  totalItems: 0,
  totalProduct: 0,
  shake: false,
  shippingFee: SHIPPING_FEE,
};

const getInitialStateFromLocalStorage = () => {
  const storedState = localStorage.getItem('cartState');

  if (!storedState) return INITIAL_STATE;
  return JSON.parse(storedState);
};
const saveStateToLocalStorage = (state) => {
  localStorage.setItem('cartState', JSON.stringify(state));
};
const caculateTotal = (products) => {
  const totalProduct = products.length;
  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);
  const subTotal = products.reduce(
    (acc, item) => acc + item.price * (1 - item.discount / 100) * item.quantity,
    0
  );
  const shippingFee = subTotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const totalPrice = subTotal + shippingFee;
  return { totalItems, totalPrice, totalProduct, subTotal, shippingFee };
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_CART':
      newState = {
        ...state,
        ...caculateTotal(action.payload.products),
        products: action.payload.products,
      };
      saveStateToLocalStorage(newState);
      return newState;
    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        ...caculateTotal(action.payload.products),
        products: action.payload.products,
      };
      saveStateToLocalStorage(newState);
      return newState;

    case 'ORDER_COMPLETED':
      newState = INITIAL_STATE;
      saveStateToLocalStorage(newState);
      return newState;
    case 'INITIALIZE_FROM_LOCAL_STORAGE':
      return { ...action.payload };
    case 'SET_SHAKE':
      return { ...state, shake: action.payload };
    default:
      return state;
  }
};
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const initialState = getInitialStateFromLocalStorage();

    dispatch({ type: 'INITIALIZE_FROM_LOCAL_STORAGE', payload: initialState });
  }, []);
  const addToCart = useCallback(
    (product, quantity) => {
      const productInCart = state.products.find((item) => item._id === product._id);
      const products = productInCart
        ? state.products.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
          )
        : [...state.products, { ...product, quantity }];

      dispatch({
        type: 'ADD_TO_CART',
        payload: { products },
      });
      setShake();
    },

    [state.products]
  );

  const setShake = () => {
    dispatch({
      type: 'SET_SHAKE',
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_SHAKE',
        payload: false,
      });
    }, 1000);
  };
  const changeQuantity = useCallback(
    (id, quantity) => {
      const productInCart = state.products.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );
      dispatch({
        type: 'ADD_TO_CART',
        payload: { products: productInCart },
      });
    },
    [state.products]
  );
  const removeFromCart = useCallback(
    (id) => {
      const productInCart = state.products.filter((item) => item._id !== id);
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { products: productInCart },
      });
    },
    [state.products]
  );

  const orderCompleted = (products) => {
    dispatch({
      type: 'ORDER_COMPLETED',
      payload: { products },
    });
  };

  const contextValue = useMemo(
    () => ({ ...state, addToCart, removeFromCart, orderCompleted, changeQuantity }),
    [addToCart, changeQuantity, removeFromCart, state]
  );
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = { children: PropTypes.node.isRequired };
