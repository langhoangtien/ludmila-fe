import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function EcommerceCartSummary({ total, subtotal, shipping, discount }) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Đơn hàng </Typography>

      <Stack spacing={2}>
        <Row label="Đơn hàng" value={fCurrency(subtotal)} />

        <Row label="Phí vận chuyển" value={fCurrency(shipping)} />

        <Row label="Giảm giá" value={`${fCurrency(discount)}`} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <Button
        component={RouterLink}
        href={paths.checkout}
        size="large"
        variant="contained"
        color="inherit"
      >
        Thanh toán
      </Button>
    </Stack>
  );
}

EcommerceCartSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  shipping: PropTypes.number,
  subtotal: PropTypes.number,
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
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}

Row.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
};
