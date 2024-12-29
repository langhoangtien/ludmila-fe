import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
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
      p: 0.25,
      width: 100,
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
      <Iconify icon="fluent:minimize-20-regular" width={16} />
    </IconButton>

    <Box
      sx={{
        color: (theme) => theme.palette.text.primary,
        backgroundColor: (theme) => theme.palette.background.default,
        height: 28,
        width: 32,
        textAlign: 'center',
        border: 'none',
        outline: 'none',
      }}
      component="input"
      onChange={(e) => changeQuantity(e.target.value)}
      value={quantity}
      type="number"
      // style={{ height: 28, border: 'none', textAlign: 'center', width: 32, outline: 'none' }}
    />

    <IconButton
      size="small"
      onClick={() => changeQuantity(quantity + 1)}
      sx={{ borderRadius: 0.75 }}
    >
      <Iconify icon="fluent:add-20-regular" width={16} />
    </IconButton>
  </Stack>
));

IncrementerButton.propTypes = {
  quantity: PropTypes.number,
  sx: PropTypes.object,
  changeQuantity: PropTypes.func,
};

export default IncrementerButton;
