import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function CartSummary({ total, subtotal, shipping, discount }) {
  return (
    <Stack spacing={2}>
      <Card>
        <Stack
          spacing={2}
          sx={{
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6"> Đơn hàng </Typography>

          <Stack spacing={1}>
            <Row label="Giá trị đơn hàng" value={fCurrency(subtotal)} />

            <Row label="Phí vận chuyển" value={fCurrency(shipping)} />

            <Row label="Giảm giá" value={`${fCurrency(discount)}`} />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Row
            label="Thanh toán"
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
      <Button
        component={RouterLink}
        href={paths.checkout}
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
      >
        Thanh toán
      </Button>
    </Stack>
  );
}

CartSummary.propTypes = {
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
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {label}
      </Box>
      <Typography component="span" variant="subtitle2">
        {value}
      </Typography>
    </Stack>
  );
}

Row.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
};
