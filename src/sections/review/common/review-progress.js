import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import ReviewProgressItem from './review-progress-item';

// ----------------------------------------------------------------------

export default function ReviewProgress({ star, setStar, ratings, ...other }) {
  const totals = ratings?.reduce((accumulator, curr) => accumulator + curr);
  const ratingsCaculated = ratings
    ?.map((rating, index) => ({
      value: 1 + index,
      number: rating,
    }))
    .reverse();

  return (
    <Stack direction="column" justifyContent="space-between" spacing={1} {...other}>
      {ratingsCaculated.map((rating, index) => (
        <ReviewProgressItem
          star={star}
          setStar={setStar}
          key={rating.value}
          rating={rating}
          index={5 - index}
          totals={totals}
        />
      ))}
    </Stack>
  );
}

ReviewProgress.propTypes = {
  star: PropTypes.number,
  setStar: PropTypes.func,
  ratings: PropTypes.array.isRequired,
};
