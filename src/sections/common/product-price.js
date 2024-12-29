import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ProductPrice({ price, salePrice = 0, sx, ...other }) {
  return (
    <Stack direction="row" sx={{ typography: 'subtitle2', spacing: 1, ...sx }} {...other}>
      {fCurrency(price === salePrice ? price : salePrice)}

      <Box
        component="span"
        sx={{
          ml: 0.5,
          color: 'text.disabled',
          textDecoration: 'line-through',
          fontWeight: 'fontWeightMedium',
          fontSize: '14px',
        }}
      >
        {price !== salePrice && fCurrency(price)}
      </Box>
    </Stack>
  );
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  salePrice: PropTypes.number,
  sx: PropTypes.object,
};
