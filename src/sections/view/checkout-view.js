'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Button, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { endpoints, fetchData, fetchDataWithToken } from 'src/utils/fetch';

import { useAuthContext } from 'src/auth/hooks';
import { CART_MESSAGES } from 'src/constants/notifications';

import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';
import { useCartContext } from 'src/components/cart';
import { useSnackbar } from 'src/components/snackbar';

import CheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import CheckoutPaymentMethod from '../checkout/ecommerce-checkout-payment-method';
import CheckoutPersonalDetails from '../checkout/ecommerce-checkout-personal-details';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    label: 'Ship COD',
    value: 'cod',
    description: 'Thanh toán khi nhận hàng',
    icon: 'fluent:money-hand-20-regular',
  },
  // {
  //   label: 'Chuyển khoản',
  //   value: 'banking',
  //   description: 'Không hoạt động',
  //   icon: 'fluent:building-bank-20-regular',
  //   disabled: true,
  // },
];
const DELIVERY_OPTIONS = [
  {
    label: 'Toàn quốc',
    value: 'fast',
    description: '2-4 ngày làm việc',
    icon: 'fluent:vehicle-truck-profile-20-regular',
  },
  {
    label: 'Hỏa tốc',
    value: 'express',
    description: '2-4h (Nội thành Hà Nội, TP.HCM)',
    icon: 'fluent:rocket-20-regular',
  },
];
// ----------------------------------------------------------------------

export default function CheckoutView() {
  const router = useRouter();
  const { authenticated } = useAuthContext();
  const cart = useCartContext();
  const { enqueueSnackbar } = useSnackbar();
  const CheckoutSchema = Yup.object().shape({
    receiverName: Yup.string().required('Họ và tên là bắt buộc'),
    email: Yup.string().email('Email không hợp lệ'),
    phoneNumber: Yup.string()
      .matches(/((\+84|84|0)(3|5|7|8|9|1[2689]))([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
      .required(' Số điện thoại là bắt buộc'),
    shippingAddress: Yup.string().required('Đia chỉ giao hàng không được bỏ trống'),
  });

  const defaultValues = {
    receiverName: '',
    email: '',
    phoneNumber: '',
    shippingAddress: '',
    country: 'VN',
    shipping: 0,
    paymentMethod: 'cod',
    delivery: 'fast',
  };

  const methods = useForm({
    resolver: yupResolver(CheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const url = endpoints.order.list;

      const { phoneNumber, receiverName, shippingAddress, paymentMethod } = data;
      const productMapped = cart.products.map((product) => ({
        productVariantId: product._id,
        quantity: product.quantity,
      }));
      const order = {
        phoneNumber,
        receiverName,
        shippingAddress,
        paymentMethod,
        products: productMapped,
      };

      if (authenticated) await fetchDataWithToken(url, order, 'POST');
      if (!authenticated) await fetchData(url, order, 'POST');

      router.push(paths.orderCompleted);
      reset();
      enqueueSnackbar(CART_MESSAGES.ORDER_COMPLETED, { variant: 'success' });
      cart.orderCompleted();
      router.push(paths.orderCompleted);
    } catch (error) {
      enqueueSnackbar(CART_MESSAGES.ORDER_ERROR, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Thanh toán
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
              <Card>
                <CardContent>
                  <StepLabel title="Thông tin người nhận" step="1" />
                  <CheckoutPersonalDetails />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <StepLabel title="Phương thức thanh toán" step="2" />

                  <CheckoutPaymentMethod name="paymentMethod" options={PAYMENT_OPTIONS} />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <StepLabel title="Vận chuyển" step="3" />
                  <CheckoutPaymentMethod name="delivery" options={DELIVERY_OPTIONS} />
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <CheckoutOrderSummary
              total={cart.totalPrice}
              subtotal={cart.subTotal}
              shipping={cart.shippingFee}
              discount={0}
              products={cart.products}
              loading={isSubmitting}
            />
          </Grid>
        </Grid>
      </FormProvider>

      <Button
        component={RouterLink}
        href={paths.cart}
        color="inherit"
        startIcon={<Iconify icon="fluent:chevron-left-20-regular" />}
        sx={{ mt: 3, textTransform: 'none' }}
      >
        Quay lại
      </Button>
    </Container>
  );
}

// ----------------------------------------------------------------------

function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      {title}
    </Stack>
  );
}

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
