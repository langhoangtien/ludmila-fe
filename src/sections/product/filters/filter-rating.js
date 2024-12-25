import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

// ----------------------------------------------------------------------

export default function FilterRating({ rating, setRating, ...other }) {
  return (
    <Stack {...other}>
      <Stack spacing={2} alignItems="flex-start">
        <Rating
          size="small"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{
            mr: 1,
          }}
        />
      </Stack>
    </Stack>
  );
}

FilterRating.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
};
