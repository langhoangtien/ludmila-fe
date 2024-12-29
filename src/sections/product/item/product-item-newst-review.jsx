import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function ProductItemNewstReviews({ review, ...other }) {
  return (
    <Link
      component={RouterLink}
      href={`/product/${review?.productId}#reviews`}
      color="inherit"
      underline="none"
    >
      <Stack
        spacing={1}
        direction="row"
        sx={{
          transition: (theme) =>
            theme.transitions.create('opacity', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': { opacity: 0.72 },
        }}
        {...other}
      >
        <Image
          src={review.coverUrl || '/logo/admin.png'}
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.25}>
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {review.fullName}
          </TextMaxLine>

          <TextMaxLine variant="caption" line={1} sx={{ color: 'text.secondary' }}>
            {review.content}
          </TextMaxLine>
        </Stack>
      </Stack>
    </Link>
  );
}

ProductItemNewstReviews.propTypes = {
  review: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    coverUrl: PropTypes.string,
  }).isRequired,
  product: PropTypes.shape({
    coverUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    sold: PropTypes.number,
    ratingNumber: PropTypes.number,
  }),
};
