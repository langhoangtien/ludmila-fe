'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _products } from 'src/_mock';

import Iconify from 'src/components/iconify';

import CartList from '../cart/ecommerce-cart-list';

// ----------------------------------------------------------------------

export default function AccountWishlistView() {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Yêu thích
      </Typography>

      <CartList wishlist products={_products.slice(0, 4)} />

      <Stack alignItems={{ sm: 'flex-end' }} sx={{ mt: 3 }}>
        <Stack spacing={3} sx={{ minWidth: 240 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'h6' }}
          >
            <Box component="span"> Subtotal</Box>
            $58.07
          </Stack>

          <Button
            component={RouterLink}
            href={paths.cart}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="ion:bag-add-outline" />}
          >
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
