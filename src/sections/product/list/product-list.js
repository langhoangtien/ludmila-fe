'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, Typography, CardContent } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { encodeData, mappedProduct } from 'src/utils/common';

import { HOST_API } from 'src/config-global';

import ProductViewListItem from '../item/product-view-list-item';
import ProductViewGridItem from '../item/product-view-grid-item';
import ProductViewGridItemSkeleton from '../item/product-view-grid-item-skeleton';
import ProductViewListItemSkeleton from '../item/product-view-list-item-skeleton';

// ----------------------------------------------------------------------

export default function ProductList({
  viewMode,
  category,
  brand,
  pagination = true,
  homePage = false,
  perPage = 12,
  filter,
  sort = { orderBy: 'createdAt', order: 'desc' },
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isChangePage, setIsChangePage] = useState(false);

  const handleChangePage = (event, value) => {
    setIsChangePage(true);
    setPage(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const sortValue = encodeData({
          orderBy: sort.orderBy,
          order: sort.order,
        });
        const limit = perPage;
        const skip = (page - 1) * limit;
        const filterRaw = {};
        if (category) filterRaw.category = [category];
        if (brand) filterRaw.brand = [brand];

        const url = `${HOST_API}/products/?limit=${limit}&skip=${skip}&sort=${sortValue}&filterRaw=${encodeData(
          filter || filterRaw
        )}`;
        setLoading(true);
        const resJson = await fetch(url);
        const res = await resJson.json();
        const productsMapped = res.items.map(mappedProduct);
        setProducts(productsMapped);
        setCount(Math.ceil(res.count / limit));
        if (isChangePage) {
          setPage(page);
          setIsChangePage(false);
          window.scrollTo(0, 0);
        } else {
          setPage(1);
        }

        setLoading(false);
      } catch (er) {
        setError(er);
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, sort.orderBy, sort.order, perPage, brand, filter]);

  return (
    <>
      {' '}
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
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }
          }
        >
          {(loading ? [...Array(16)] : products).map((product, index) => (
            <Card key={product ? product.id : index}>
              <CardContent>
                {product ? (
                  <ProductViewGridItem product={product} />
                ) : (
                  <ProductViewGridItemSkeleton />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading ? [...Array(16)] : products).map((product, index) => (
            <Card key={product ? product.id : index}>
              <CardContent>
                {product ? (
                  <ProductViewListItem product={product} />
                ) : (
                  <ProductViewListItemSkeleton />
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
      {!loading && !products.length && <Typography>Không có sản phẩm nào phù hợp</Typography>}
      {pagination && !!count && (
        <Pagination
          count={count}
          page={page}
          // variant="outlined"
          // color="primary"
          perPage
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

ProductList.propTypes = {
  viewMode: PropTypes.string,
  category: PropTypes.string,
  brand: PropTypes.string,
  pagination: PropTypes.bool,
  homePage: PropTypes.bool,
  perPage: PropTypes.number,
  filter: PropTypes.object,
  sort: PropTypes.shape({
    orderBy: PropTypes.string,
    order: PropTypes.string,
  }),
};
