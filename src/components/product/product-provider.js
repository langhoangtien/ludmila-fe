'use client';

import PropTypes from 'prop-types';
import React, { useMemo, useReducer, useCallback } from 'react';

import { ProductContext } from './product-context';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ATTRIBUTES':
      return { ...state, attributesSelect: action.payload };
    case 'SET_VARIANT':
      return {
        ...state,
        currentVariant: action.payload.currentVariant,
        slideIndex: action.payload.slideIndex,
      };
    default:
      throw new Error();
  }
}

export function ProductProvider({ product, children }) {
  const initAttributesSelect = useMemo(
    () =>
      product.attributes.map((attr) => ({
        name: attr.name,
        value: null,
      })),
    [product.attributes]
  );

  const initialState = {
    currentVariant: product.variants.length === 1 ? product.variants[0] : null,
    slideIndex: null,
    attributesSelect: initAttributesSelect,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setAttribute = useCallback(
    (index, value) => {
      const newAttributes = [...state.attributesSelect];
      newAttributes[index].value = value;

      dispatch({ type: 'SET_ATTRIBUTES', payload: newAttributes });
      const variantSelect = product.variants.find(
        (variant) =>
          variant.attributes
            .sort((a, b) => a.name < b.name)
            .map((attribute) => attribute.value)
            .toString() ===
          newAttributes
            .sort((a, b) => a.name < b.name)
            .map((attr) => attr.value)
            .toString()
      );

      if (variantSelect) {
        const slideIndex = product.images.indexOf(variantSelect.image);
        dispatch({
          type: 'SET_VARIANT',
          payload: {
            currentVariant: variantSelect,
            slideIndex: slideIndex === -1 ? null : slideIndex,
          },
        });
      }
    },
    [state.attributesSelect, product.variants, product.images]
  );

  const contextValue = useMemo(
    () => ({ ...state, setAttribute, product }),
    [state, setAttribute, product]
  );

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}

ProductProvider.propTypes = {
  product: PropTypes.object,
  children: PropTypes.node,
};
