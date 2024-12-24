import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

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
        py: { xs: 2, md: 3 },
      }}
    >
      <Container>
        <Typography variant="h4">Khách hàng nói về sản phẩm</Typography>
        <Grid container spacing={{ xs: 4, md: 3 }}>
          <Grid xs={12} md={4}>
            <Stack alignItems="center" justifyContent="center">
              {' '}
              <Stack alignItems="center" justifyContent="center">
                {' '}
                <Typography sx={{ lineHeight: 0.8 }} variant="h2">
                  {' '}
                  {product.ratingAverage}
                </Typography>
              </Stack>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ my: 1 }}>
                <Stack spacing={0.5}>
                  <Rating value={product.ratingAverage} readOnly precision={0.1} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {fShortenNumber(product.totalReviews)} lượt đánh giá
                  </Typography>
                </Stack>
              </Stack>
              <Button
                fullWidth
                size="medium"
                color="inherit"
                variant="contained"
                onClick={onOpenForm}
              >
                Đánh giá sản phẩm
              </Button>
            </Stack>
          </Grid>

          <Grid alignItems="center" alignContent="center" xs={12} md={8}>
            {' '}
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
