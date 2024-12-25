import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import CompareItem from './ecommerce-compare-item';

// ----------------------------------------------------------------------

export default function CompareList({ products }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, md: 3 }}
      divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
    >
      {products.map((product) => (
        <CompareItem key={product.id} product={product} />
      ))}
    </Stack>
  );
}

CompareList.propTypes = {
  products: PropTypes.array,
};
