'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { HOST_API } from 'src/config-global';

import EcommerceProductItemNewstReviews from '../item/ecommerce-product-item-newst-review';

// ----------------------------------------------------------------------

export default function EcommerceProductListBestSellers() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataJson = await fetch(`${HOST_API}/comments?limit=5&skip=0`);
        if (!dataJson.ok) return;

        const data = await dataJson.json();
        setReviews(data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Bình luận mới nhất</Typography>

      {reviews.map((review) => (
        <EcommerceProductItemNewstReviews key={review.id} review={review} />
      ))}
    </Stack>
  );
}

EcommerceProductItemNewstReviews.propTypes = {
  reviews: PropTypes.array,
};
