'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _products } from 'src/_mock';

import Iconify from 'src/components/iconify';

import CartList from '../cart/ecommerce-cart-list';

// ----------------------------------------------------------------------

export default function WishlistView() {
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Wishlist
      </Typography>

      <CartList wishlist products={_products.slice(0, 4)} />

      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent={{ sm: 'space-between' }}
        sx={{ mt: 3 }}
      >
        <Button
          component={RouterLink}
          href={paths.product}
          color="inherit"
          startIcon={<Iconify icon="fluent:chevron-left-20-regular" />}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>

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
    </Container>
  );
}
