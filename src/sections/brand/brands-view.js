'use client';

import { useState, useEffect } from 'react';

import { Box, Stack, Pagination } from '@mui/material';

import { convertImagePathToUrl } from 'src/utils/common';

import { HOST_API } from 'src/config-global';

import BrandViewItem from './brand-view-item';
import BrandViewListItemSkeleton from './brand-view-skeleton';

const LIMIT = 20;

export default function BrandsView() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const skip = (page - 1) * LIMIT;
        const url = `${HOST_API}/brands/?limit=${LIMIT}&skip=${skip}`;
        setLoading(true);
        const resJson = await fetch(url);
        const res = await resJson.json();
        const brandsMapped = res.items.map((item) => ({
          ...item,
          image: convertImagePathToUrl(item.image, 250),
          path: `/brand/${item.code}-${item._id}`,
        }));
        setBrands(brandsMapped);
        setCount(Math.ceil(res.count / LIMIT));

        setPage(page);

        setLoading(false);
      } catch (er) {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <Stack justifyContent="center" spacing={3} sx={{ my: 3 }}>
      <Box
        rowGap={4}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {loading &&
          Array.from({ length: 12 }).map((_, index) => <BrandViewListItemSkeleton key={index} />)}
        {!loading &&
          brands.map((brand, index) => (
            <BrandViewItem
              key={brand ? brand._id : index}
              description={brand.description}
              image={brand.image}
              name={brand.name}
              path={brand.path}
            />
          ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
        <Pagination count={count} page={page} onChange={handleChangePage} />
      </Box>
    </Stack>
  );
}
