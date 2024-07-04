import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import ReviewItem from './review-item';
import ReviewItemSkeleton from './review-item-skeleton';

// ----------------------------------------------------------------------

export default function ReviewList({ loading, reviews, count, handleChange, page }) {
  return (
    <Box sx={{ pt: 5 }}>
      {(loading ? [...Array(5)] : reviews).map((review) =>
        review ? (
          <ReviewItem
            key={review._id}
            fullName={
              review.user ? `${review.user.firstName} ${review.user.lastName}` : review.fullName
            }
            avatarUrl={review.avatarUrl}
            createdAt={review.createdAt}
            content={review.content}
            rating={review.rating}
            helpful={review.helpful}
          />
        ) : (
          <ReviewItemSkeleton />
        )
      )}

      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{
          mt: 5,
          mb: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </Box>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.array,
};
