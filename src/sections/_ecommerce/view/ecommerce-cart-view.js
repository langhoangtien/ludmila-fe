'use client';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { useCartContext } from 'src/components/cart';

import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';

// ----------------------------------------------------------------------

export default function EcommerceCartView() {
  const cart = useCartContext();
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Giỏ hàng
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        {cart.totalProduct === 0 ? (
          <Grid xs={12}>
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
              {' '}
              <CartEmpty />
              <Typography variant="h6" sx={{ mt: 5 }}>
                Không có sản phẩm nào trong giỏ hàng
              </Typography>
              <Button
                component={RouterLink}
                href={paths.products}
                variant="contained"
                color="primary"
              >
                Mua hàng
              </Button>
            </Stack>
          </Grid>
        ) : (
          <>
            {' '}
            <Grid xs={12} md={8}>
              <EcommerceCartList products={cart.products} />
            </Grid>
            <Grid xs={12} md={4}>
              <EcommerceCartSummary
                tax={7}
                total={cart.totalPrice}
                subtotal={cart.subTotal}
                shipping={cart.shippingPrice}
                discount={0}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Button
        component={RouterLink}
        href={paths.products}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 3, textTransform: 'none' }}
      >
        Quay lại
      </Button>
    </Container>
  );
}

const CartEmpty = () => <Iconify icon="carbon:shopping-cart" width={240} />;
