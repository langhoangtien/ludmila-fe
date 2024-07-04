import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ReviewProgressItem({ star, setStar, rating, totals, index, name }) {
  return (
    <FormControlLabel
      onClick={() => {
        setStar(index);
      }}
      value={rating.value}
      control={<Radio sx={{ display: 'none' }} />}
      label={
        <Stack alignItems="center" direction="row">
          <Stack direction="row" alignItems="center">
            <Box
              sx={{
                width: 60,
                typography: 'subtitle1',
                textAlign: 'center',
                mr: 0.5,
              }}
              color={star === index ? 'primary.main' : 'text.secondary'}
            >
              {name || `${index} sao`}
            </Box>
            {/* <Iconify width={16} icon="carbon:star" /> */}
          </Stack>

          <LinearProgress
            color={star === index ? 'primary' : 'inherit'}
            variant="determinate"
            value={(rating.number / totals) * 100}
            sx={{
              mx: 2,
              width: 1,
              height: 6,
              '&:before': {
                opacity: 1,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              minWidth: 40,
              color: star === index ? 'primary.main' : 'text.secondary',
            }}
          >
            {fShortenNumber(rating.number)}
          </Typography>
        </Stack>
      }
      sx={{
        mx: 0,
        '&:hover': { opacity: 0.48 },
        [`& .${formControlLabelClasses.label}`]: {
          width: 1,
        },
      }}
    />
  );
}

ReviewProgressItem.propTypes = {
  index: PropTypes.number,
  rating: PropTypes.shape({
    number: PropTypes.number,
    value: PropTypes.string,
  }),
  totals: PropTypes.number,
};
