import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { SHIPPING_THRESHOLD } from 'src/components/cart/cart-provider';

// ----------------------------------------------------------------------

export default function CheckoutOrderSummary({
  total,
  subtotal,
  shipping,
  discount,
  products,
  loading,
}) {
  return (
    <Stack spacing={2}>
      <Card>
        <Stack
          spacing={3}
          sx={{
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6"> Thông tin đơn hàng </Typography>
          <Typography sx={{ fontStyle: 'italic' }} color="text.secondary" variant="caption">
            {' '}
            Miễn phí vận chuyển cho đơn hàng tù {fCurrency(SHIPPING_THRESHOLD)} trở lên
          </Typography>

          <Stack spacing={1}>
            <Row label="Tạm tính" value={fCurrency(subtotal)} />

            <Row label="Phí vận chuyển" value={fCurrency(shipping)} />

            <Row label="Giảm giá" value={`${fCurrency(discount)}`} />
          </Stack>

          <TextField
            hiddenLabel
            placeholder="Mã giảm giá"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary">Áp dụng</Button>
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Row
            label="Tổng cộng"
            value={
              <Box component="span" sx={{ color: 'primary.main' }}>
                {fCurrency(total)}
              </Box>
            }
            sx={{
              typography: 'h6',
              '& span': { typography: 'h6' },
            }}
          />
        </Stack>
      </Card>
      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
      >
        Đặt hàng
      </LoadingButton>
    </Stack>
  );
}

CheckoutOrderSummary.propTypes = {
  discount: PropTypes.number,
  loading: PropTypes.bool,
  products: PropTypes.array,
  shipping: PropTypes.number,
  subtotal: PropTypes.number,
  total: PropTypes.number,
};

// ----------------------------------------------------------------------

function ProductItem({ product, ...other }) {
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={product.image}
        sx={{
          mr: 2,
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {product.name}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1 }}>
          {fCurrency(product.price)}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Số lượng: {product.quantity}
        </Typography>
      </Stack>
    </Stack>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    coverUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}

Row.propTypes = {
  label: PropTypes.string,
  sx: PropTypes.object,
  value: PropTypes.string,
  image: PropTypes.string,
};
