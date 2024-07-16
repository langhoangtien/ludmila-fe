import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import { useProductContext } from 'src/components/product/use-product-contex';

import ReviewProgress from '../common/review-progress';

// ----------------------------------------------------------------------

export default function ReviewSummary({ star, onOpenForm, setStar }) {
  const { product } = useProductContext();
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 10 },
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid xs={12} md={4}>
            <Typography variant="h3">Đánh giá</Typography>

            <Stack spacing={2} direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography variant="h2"> {product.ratingAverage}</Typography>

              <Stack spacing={0.5}>
                <Rating
                  value={product.ratingAverage}
                  readOnly
                  precision={0.1}
                  // sx={{
                  //   '& svg': {
                  //     color: 'text.primary',
                  //   },
                  // }}
                />
                <Typography variant="body2">
                  {fShortenNumber(product.totalReviews)} đánh giá
                </Typography>
              </Stack>
            </Stack>

            <Button
              size="large"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:edit" />}
              onClick={onOpenForm}
            >
              Viết đánh giá
            </Button>
          </Grid>

          <Grid xs={12} md={4}>
            <ReviewProgress star={star} setStar={setStar} ratings={product.ratings} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ReviewSummary.propTypes = {
  onOpenForm: PropTypes.func,
  star: PropTypes.number,
  setStar: PropTypes.func,
};
