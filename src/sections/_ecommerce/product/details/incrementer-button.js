import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const IncrementerButton = forwardRef(({ quantity, changeQuantity, sx, ...other }, ref) => (
  <Stack
    ref={ref}
    flexShrink={0}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      p: 0.5,
      width: 110,
      borderRadius: 1,
      typography: 'subtitle2',
      border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
      ...sx,
    }}
    {...other}
  >
    <IconButton
      size="small"
      onClick={() => changeQuantity(quantity - 1)}
      disabled={quantity === 1}
      sx={{ borderRadius: 0.75 }}
    >
      <Iconify icon="eva:minus-fill" width={16} />
    </IconButton>

    <TextField
      hiddenLabel
      onChange={(e) => changeQuantity(e.target.value)}
      value={quantity}
      type="number"
      size="small"
    />

    <IconButton
      size="small"
      onClick={() => changeQuantity(quantity + 1)}
      sx={{ borderRadius: 0.75 }}
    >
      <Iconify icon="mingcute:add-line" width={16} />
    </IconButton>
  </Stack>
));

IncrementerButton.propTypes = {
  quantity: PropTypes.number,
  sx: PropTypes.object,
  changeQuantity: PropTypes.func,
};

export default IncrementerButton;
