import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';

import ReviewProgressItem from './review-progress-item';

// ----------------------------------------------------------------------

const RATINGS = [
  { value: '5start', number: 5212 },
  { value: '4start', number: 2442 },
  { value: '3start', number: 523 },
  { value: '2start', number: 423 },
  { value: '1start', number: 80 },
];

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
