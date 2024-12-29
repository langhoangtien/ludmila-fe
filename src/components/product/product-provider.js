'use client';

import PropTypes from 'prop-types';
import React, { useMemo, useReducer, useCallback } from 'react';

import { stringifyArray } from 'src/utils/common';

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
        attributesSelect: action.payload.attributesSelect,
      };
    default:
      throw new Error();
  }
}

export function ProductProvider({ product, children }) {
  const initialState = {
    currentVariant: product.variants[0],
    slideIndex: null,
    attributesSelect: product.variants[0].attributes,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSelectVariant = useCallback(
    (name, value) => {
      const newAtts = state.attributesSelect.map((item) => {
        if (item.name === name) return { ...item, value };
        return item;
      });

      const newAttsString = stringifyArray(newAtts);

      const newVariant = product.variants.find(
        (item) => stringifyArray(item.attributes) === newAttsString
      );

      const slideIndex = product.images.indexOf(newVariant.image);
      dispatch({
        type: 'SET_VARIANT',
        payload: {
          currentVariant: newVariant,
          slideIndex: slideIndex === -1 ? null : slideIndex,
          attributesSelect: newAtts,
        },
      });
    },
    [product.images, product.variants, state.attributesSelect]
  );

  const contextValue = useMemo(
    () => ({ ...state, product, handleSelectVariant }),
    [state, product, handleSelectVariant]
  );

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}

ProductProvider.propTypes = {
  product: PropTypes.shape({
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        attributes: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ).isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  children: PropTypes.node,
};
