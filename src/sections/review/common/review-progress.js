import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';

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
    <RadioGroup>
      <Stack spacing={2} {...other}>
        <ReviewProgressItem
          rating={{ number: totals, value: 0 }}
          star={star}
          setStar={setStar}
          index={0}
          name="Tất cả"
        />
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
    </RadioGroup>
  );
}

ReviewProgress.propTypes = {
  star: PropTypes.number,
  setStar: PropTypes.func,
  ratings: PropTypes.array.isRequired,
};
