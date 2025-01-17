'use client';

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import ProductList from '../product/list/product-list';
import Filters from '../product/filters/ecommerce-filters';
import ProductListNewstReview from '../product/list/product-list-newst-review';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="fluent:apps-list-detail-20-regular" /> },
  { value: 'grid', icon: <Iconify icon="fluent:grid-20-regular" /> },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Mới nhất', orderBy: 'createdAt', order: -1 },
  { value: 'oldest', label: 'Cũ nhất', orderBy: 'createdAt', order: 1 },
  { value: 'popular', label: 'Bán chạy', orderBy: 'sold', order: -1 },
];

// ----------------------------------------------------------------------
const defaultValues = {
  filterBrands: [],
  filterCategories: [],
  filterPrices: [],
  filterCountries: [],
  filterRating: null,
};

export default function ProductsView({ search }) {
  const mobileOpen = useBoolean();
  const [filters, setFilters] = useState(defaultValues);
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState({
    value: 'latest',
    label: 'Mới nhất',
    orderBy: 'createdAt',
    order: -1,
  });
  // const filters = useMemo(() => filtersRaw, [filtersRaw]);
  const handleChangeFilterArray = useCallback(
    (name, value) => {
      setFilters({
        ...filters,
        [name]: value,
      });
    },
    [filters]
  );
  const handleChangeRating = useCallback(
    (value) => {
      setFilters({
        ...filters,
        filterRating: value,
      });
    },
    [filters]
  );

  const handleChangeViewMode = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters(defaultValues);
  }, []);

  const handleChangeSort = useCallback((event) => {
    const sortValue = SORT_OPTIONS.find((option) => option.value === event.target.value);
    setSort(sortValue);
  }, []);

  console.log('filters', filters);

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
          startIcon={<Iconify icon="fluent:filter-20-regular" width={18} />}
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
          <Filters
            filters={filters}
            changeFilterArrayItem={handleChangeFilterArray}
            changeRating={handleChangeRating}
            open={mobileOpen.value}
            onClose={mobileOpen.onFalse}
            clearAll={handleClearAll}
          />
          <ProductListNewstReview />
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
            flexShrink: 0,
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

          <ProductList
            viewMode={viewMode}
            filter={{
              brand: filters.filterBrands,
              country: filters.filterCountries,
              price: filters.filterPrices,
              category: filters.filterCategories.map((item) => item._id),
              search,
              rating: filters.filterRating,
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}

ProductsView.propTypes = {
  search: PropTypes.string,
};
