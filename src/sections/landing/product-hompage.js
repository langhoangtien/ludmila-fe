import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import ProductList from '../product/list/product-list';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ProductHome({ products }) {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack direction="column">
        <ProductList
          pagination={false}
          loading={false}
          viewMode="grid"
          products={products}
          homePage
        />
      </Stack>
    </Container>
  );
}

ProductHome.propTypes = { products: PropTypes.array.isRequired };
