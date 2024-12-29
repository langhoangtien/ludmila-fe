'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { HOST_API } from 'src/config-global';

import ProductItemNewstReviews from '../item/product-item-newst-review';

// ----------------------------------------------------------------------

export default function ProductListNewstReview() {
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
    <Stack spacing={1}>
      <Typography variant="h6">Bình luận mới nhất</Typography>

      {reviews.map((review) => (
        <ProductItemNewstReviews key={review._id} review={review} />
      ))}
    </Stack>
  );
}

ProductItemNewstReviews.propTypes = {
  reviews: PropTypes.array,
};
