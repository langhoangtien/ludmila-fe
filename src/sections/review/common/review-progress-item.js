import PropTypes from 'prop-types';

import { Rating } from '@mui/material';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ReviewProgressItem({ star, setStar, rating, totals, index, name }) {
  return (
 
        <Stack spacing={1} alignItems="center" direction="row">
         
     
      <Rating size='small'  name="read-only" value={index} readOnly  />
          
          
           
       

          <LinearProgress
            color='inherit'
            variant="determinate"
            value={(rating.number / totals) * 100}
            sx={{
              mx: 2,
              width: 200,
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
              minWidth: 20,
              color: star === index ? 'primary.main' : 'text.secondary',
            }}
          >
            {fShortenNumber(rating.number)}
          </Typography>
        </Stack>
    
    
  );
}

ReviewProgressItem.propTypes = {
  index: PropTypes.number,
  rating: PropTypes.shape({
    number: PropTypes.number,
    value: PropTypes.string,
  }),
  totals: PropTypes.number,
  name: PropTypes.string,
  star: PropTypes.number,
  setStar: PropTypes.func,
};
