import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, CardContent } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import EcommerceProductViewListItem from '../item/ecommerce-product-view-list-item';
import EcommerceProductViewGridItem from '../item/ecommerce-product-view-grid-item';
import EcommerceProductViewGridItemSkeleton from '../item/ecommerce-product-view-grid-item-skeleton';
import EcommerceProductViewListItemSkeleton from '../item/ecommerce-product-view-list-item-skeleton';

// ----------------------------------------------------------------------

export default function EcommerceProductList({
  count,
  products,
  viewMode,
  page,
  setPage,
  loading,
  pagination = true,
  homePage = false,
}) {
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {viewMode === 'grid' ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={
            homePage
              ? {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }
              : {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }
          }
        >
          {(loading ? [...Array(16)] : products).map((product, index) => (
            <Card>
              <CardContent>
                {product ? (
                  <EcommerceProductViewGridItem key={product.id} product={product} />
                ) : (
                  <EcommerceProductViewGridItemSkeleton key={index} />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading ? [...Array(16)] : products).map((product, index) => (
            <Card>
              <CardContent>
                {product ? (
                  <EcommerceProductViewListItem key={product.id} product={product} />
                ) : (
                  <EcommerceProductViewListItemSkeleton key={index} />
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {pagination && !!count && (
        <Pagination
          count={count}
          color="primary"
          page={page}
          onChange={handleChangePage}
          sx={{
            mt: 10,
            mb: 5,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}

EcommerceProductList.propTypes = {
  products: PropTypes.array,
  viewMode: PropTypes.string,
  count: PropTypes.number,
  page: PropTypes.number,
  loading: PropTypes.bool,
  setPage: PropTypes.func,
  pagination: PropTypes.bool,
  homePage: PropTypes.bool,
};
