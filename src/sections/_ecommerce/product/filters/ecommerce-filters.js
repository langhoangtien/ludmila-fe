import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { endpoints, fetchData } from 'src/utils/fetch';

import Iconify from 'src/components/iconify';

import FilterTag from './filter-tag';
import FilterStock from './filter-stock';
import FilterRating from './filter-rating';
import FilterChecked from './filter-checked';
import FilterAutocompleteChecked from './filter-autocomplete-checked';

// ----------------------------------------------------------------------

const TAG_OPTIONS = ['Nhung hươu', 'Cá trích', 'Omega 3', 'Vitamin e đỏ', 'Tai biến'];

// ----------------------------------------------------------------------

const defaultValues = {
  filterCategories: '',
  filterRating: null,
  filterStock: false,
  filterShipping: [],
  filterTag: [],
  filterPrice: {
    start: 0,
    end: 0,
  },
};

const PRICE_FILTERS = [
  { name: 'Giá dưới 100.000₫', _id: '0-100000' },
  { name: '100.000₫ - 200.000₫', _id: '100000-200000' },
  { name: '200.000₫ - 500.000₫', _id: '200000-500000' },
  { name: '500.000₫ - 1.000.000₫', _id: '500000-1000000' },
  { name: 'Trên 1.000.000₫', _id: '1000000' },
];
export default function EcommerceFilters({
  open,
  onClose,
  brands,
  setBrands,
  prices,
  setPrices,
  countries,
  setCountries,
  categories,
  setCategories,
  rating,
  setRating,
  clearAll,
}) {
  const fetchProductSelectInfo = async () => {
    const response = await fetchData(endpoints.home.selectInfo);
    setDataFilter(response);
    // return data;
  };
  useEffect(() => {
    fetchProductSelectInfo();
  }, []);
  const [dataFilter, setDataFilter] = useState({ categories: [], brands: [], countries: [] });
  const mdUp = useResponsive('up', 'md');

  const [filters, setFilters] = useState(defaultValues);

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const handleChangeTag = useCallback(
    (name) => {
      setFilters({
        ...filters,
        filterTag: getSelected(filters.filterTag, name),
      });
    },
    [filters]
  );

  const handleChangeStock = useCallback(
    (event) => {
      setFilters({
        ...filters,
        filterStock: event.target.checked,
      });
    },
    [filters]
  );

  const renderContent = (
    <Stack
      spacing={2.5}
      // alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      <Block title="Giá">
        <FilterChecked
          setChecked={setPrices}
          checked={prices}
          sx={{ mt: 2 }}
          _id="value"
          name="price"
          options={PRICE_FILTERS}
        />
      </Block>
      <Block title="Thương hiệu">
        <FilterChecked
          sx={{ mt: 2 }}
          name="brand"
          setChecked={setBrands}
          checked={brands}
          options={dataFilter.brands}
        />
      </Block>
      <Block title="Xuất xứ">
        <FilterChecked
          sx={{ mt: 2 }}
          name="country"
          setChecked={setCountries}
          checked={countries}
          options={dataFilter.countries}
        />
      </Block>

      <BlockFull title="Danh mục">
        <FilterAutocompleteChecked
          setChecked={setCategories}
          checked={categories}
          name="category"
          options={dataFilter.categories}
        />
      </BlockFull>

      <Block title="Ratings">
        <FilterRating rating={rating} setRating={setRating} sx={{ mt: 2 }} />
      </Block>

      <FilterStock filterStock={filters.filterStock} onChangeStock={handleChangeStock} />

      <Block title="Tags">
        <FilterTag
          filterTag={filters.filterTag}
          onChangeTag={handleChangeTag}
          options={TAG_OPTIONS}
          sx={{ mt: 2 }}
        />
      </Block>

      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        startIcon={<Iconify icon="fluent:delete-20-regular" />}
        onClick={clearAll}
      >
        Xóa
      </Button>
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              pt: 3,
              px: 3,
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

EcommerceFilters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  brands: PropTypes.array,
  setBrands: PropTypes.func,
  prices: PropTypes.array,
  setPrices: PropTypes.func,
  countries: PropTypes.array,
  setCountries: PropTypes.func,
  categories: PropTypes.array,
  setCategories: PropTypes.func,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  clearAll: PropTypes.func,
};

// ----------------------------------------------------------------------

function Block({ title, children, ...other }) {
  const contentOpen = useBoolean(true);

  return (
    <Stack alignItems="flex-start" sx={{ width: 1 }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={contentOpen.onToggle}
        sx={{ width: 1, cursor: 'pointer' }}
      >
        <Typography variant="h6">{title}</Typography>

        <Iconify
          icon={contentOpen.value ? 'carbon:subtract' : 'carbon:add'}
          sx={{ color: 'text.secondary' }}
        />
      </Stack>

      <Collapse unmountOnExit in={contentOpen.value} sx={{ px: 0.5 }}>
        {children}
      </Collapse>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

function BlockFull({ title, children }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h6">{title}</Typography>

      {children}
    </Stack>
  );
}

BlockFull.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
