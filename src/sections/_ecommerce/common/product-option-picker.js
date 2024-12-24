import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import { Box, Button } from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductOptionPicker({ value, options, onChangeAtt, sx }) {
  console.log('ProductOptionPicker', options);

  return (
    <Stack spacing={1} direction="row">
      {options.map((option) => (
        <Button
          onClick={() => onChangeAtt(option)}
          key={option}
          variant="outlined"
          color={value === option ? 'primary' : 'inherit'}
          sx={{
            position: 'relative',
            ...sx,
          }}
        >
          {option}

          {value === option && (
            <Box
              sx={{
                width: 0,
                height: 0,
                position: 'absolute',
                right: 12,
                top: 6,
                borderLeftWidth: 24,
                borderLeftStyle: 'solid',
                borderLeftColor: 'transparent',
                borderTopWidth: 24,
                borderTopStyle: 'solid',
                borderTopColor: (theme) => theme.palette.primary.main,
                marginRight: '-12px',
                marginTop: '-6px',
              }}
            >
              <Iconify
                style={{ top: '-22px', right: '1px', position: 'absolute', color: 'white' }}
                width={12}
                icon="fluent:checkmark-20-regular"
              />
            </Box>
          )}
        </Button>
      ))}
    </Stack>
  );
}

ProductOptionPicker.propTypes = {
  sx: PropTypes.object,
  value: PropTypes.string,
  onChangeAtt: PropTypes.func,
  options: PropTypes.array,
};
