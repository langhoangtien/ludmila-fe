'use client';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Stack, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { useCartContext } from 'src/components/cart';

import CartList from '../cart/ecommerce-cart-list';
import CartSummary from '../cart/ecommerce-cart-summary';

// ----------------------------------------------------------------------

export default function CartView() {
  const cart = useCartContext();
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Giỏ hàng
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        {cart.totalProduct === 0 ? (
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                  {' '}
                  <CartEmpty />
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Chưa có sản phẩm nào trong giỏ
                  </Typography>
                  <Typography text="text.secondary" variant="caption">
                    Cùng khám phá hàng ngàn sản phẩm tại Ludmila nhé!
                  </Typography>
                  <Button component={RouterLink} href={paths.products} variant="contained">
                    Mua hàng
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <>
            {' '}
            <Grid xs={12} md={8}>
              <CartList products={cart.products} />
            </Grid>
            <Grid xs={12} md={4}>
              <CartSummary
                tax={7}
                total={cart.totalPrice}
                subtotal={cart.subTotal}
                shipping={cart.shippingFee}
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
        startIcon={<Iconify icon="fluent:chevron-left-20-regular" />}
        sx={{ mt: 3, textTransform: 'none' }}
      >
        Quay lại
      </Button>
    </Container>
  );
}

const CartEmpty = () => <Iconify icon="fluent:cart-20-filled" width={200} />;
