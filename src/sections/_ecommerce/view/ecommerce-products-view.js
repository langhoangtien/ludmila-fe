'use client';

import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints, fetchData } from 'src/utils/fetch';
import { encodeData, convertImagePathToUrl } from 'src/utils/common';

import { _products } from 'src/_mock';

import Iconify from 'src/components/iconify';

import EcommerceFilters from '../product/filters/ecommerce-filters';
import EcommerceProductList from '../product/list/ecommerce-product-list';
import EcommerceProductListBestSellers from '../product/list/ecommerce-product-list-best-sellers';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="carbon:list-boxes" /> },
  { value: 'grid', icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Mới nhất', orderBy: 'createdAt', order: -1 },
  { value: 'oldest', label: 'Cũ nhất', orderBy: 'createdAt', order: 1 },
  { value: 'popular', label: 'Bán chạy', orderBy: 'sold', order: -1 },
];

// ----------------------------------------------------------------------

export default function EcommerceProductsView({ search }) {
  const mobileOpen = useBoolean();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [rating, setRating] = useState(null);
  const [countries, setCountries] = useState([]);
  const [prices, setPrices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState({
    value: 'latest',
    label: 'Mới nhất',
    orderBy: 'createdAt',
    order: -1,
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const sortValue = encodeData({ orderBy: sort.orderBy, order: sort.order });
      const limit = 10;
      const skip = (page - 1) * limit;
      const categoryFilter = categories.map((item) => item._id);

      const filterRaw = {
        brand: brands,
        country: countries,
        price: prices,
        category: categoryFilter,
        search,
        rating,
      };
      const url = `${
        endpoints.product.list
      }?limit=${limit}&skip=${skip}&sort=${sortValue}&filterRaw=${encodeData(filterRaw)}`;
      const res = await fetchData(url);
      const productsMapped = res.items.map((product) => ({
        ...product,

        image: convertImagePathToUrl(product.image),
      }));
      setProducts(productsMapped);
      setCount(Math.ceil(res.count / limit));
      setLoading(false);
    };
    getData();
  }, [page, brands, countries, prices, categories, rating, search, sort]);

  const handleChangeViewMode = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  }, []);

  const handleClearAll = useCallback(() => {
    setBrands([]);
    setCountries([]);
    setPrices([]);
    setCategories([]);
    setRating(null);
  }, []);

  const handleChangeSort = useCallback((event) => {
    const sortValue = SORT_OPTIONS.find((option) => option.value === event.target.value);
    setSort(sortValue);
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h3">Bộ lọc</Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{
            display: { md: 'none' },
          }}
        >
          Lọc
        </Button>
      </Stack>

      <Stack
        direction={{
          xs: 'column-reverse',
          md: 'row',
        }}
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <EcommerceFilters
            brands={brands}
            prices={prices}
            setPrices={setPrices}
            countries={countries}
            setCountries={setCountries}
            setBrands={setBrands}
            categories={categories}
            setCategories={setCategories}
            open={mobileOpen.value}
            onClose={mobileOpen.onFalse}
            rating={rating}
            setRating={setRating}
            clearAll={handleClearAll}
          />
          <EcommerceProductListBestSellers products={_products.slice(0, 3)} />
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={viewMode}
              onChange={handleChangeViewMode}
              sx={{ borderColor: 'transparent' }}
            >
              {VIEW_OPTIONS.map((option) => (
                <ToggleButton key={option.value} value={option.value}>
                  {option.icon}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
              <Select value={sort.value} onChange={handleChangeSort}>
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <EcommerceProductList
            loading={loading}
            viewMode={viewMode}
            count={count}
            page={page}
            setPage={setPage}
            products={products}
          />
        </Box>
      </Stack>
    </Container>
  );
}

EcommerceProductsView.propTypes = {
  search: PropTypes.string,
};
