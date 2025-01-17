import PropTypes from 'prop-types';
import { memo, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { endpoints, fetchData } from 'src/utils/fetch';

import Iconify from 'src/components/iconify';

import FilterRating from './filter-rating';
import FilterChecked from './filter-checked';
import FilterAutocompleteChecked from './filter-autocomplete-checked';

// ----------------------------------------------------------------------

// const TAG_OPTIONS = ['Nhung hươu', 'Cá trích', 'Omega 3', 'Vitamin e đỏ', 'Tai biến'];

// ----------------------------------------------------------------------

const PRICE_FILTERS = [
  { name: 'Giá dưới 100.000₫', _id: '0-100000' },
  { name: '100.000₫ - 200.000₫', _id: '100000-200000' },
  { name: '200.000₫ - 500.000₫', _id: '200000-500000' },
  { name: '500.000₫ - 1.000.000₫', _id: '500000-1000000' },
  { name: 'Trên 1.000.000₫', _id: '1000000' },
];
const Filters = memo(
  ({ open, onClose, filters, changeRating, changeFilterArrayItem, clearAll }) => {
    useEffect(() => {
      const fetchProductSelectInfo = async () => {
        const response = await fetchData(endpoints.home.selectInfo);
        setDataFilter(response);
        // return data;
      };
      fetchProductSelectInfo();
    }, []);
    const [dataFilter, setDataFilter] = useState({ categories: [], brands: [], countries: [] });
    const mdUp = useResponsive('up', 'md');

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
            setChecked={(value) => changeFilterArrayItem('filterPrices', value)}
            checked={filters.filterPrices}
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
            setChecked={(value) => changeFilterArrayItem('filterBrands', value)}
            checked={filters.filterBrands}
            options={dataFilter.brands}
          />
        </Block>
        <Block title="Xuất xứ">
          <FilterChecked
            sx={{ mt: 2 }}
            name="country"
            setChecked={(value) => changeFilterArrayItem('filterCountries', value)}
            checked={filters.filterCountries}
            options={dataFilter.countries}
          />
        </Block>

        <BlockFull title="Danh mục">
          <FilterAutocompleteChecked
            setChecked={(value) => changeFilterArrayItem('filterCategories', value)}
            checked={filters.filterCategories}
            name="category"
            options={dataFilter.categories}
          />
        </BlockFull>

        <Block title="Ratings">
          <FilterRating rating={filters.filterRating} setRating={changeRating} sx={{ mt: 2 }} />
        </Block>

        {/* <FilterStock filterStock={filters.filterStock} onChangeStock={handleChangeStock} /> */}

        {/* <Block title="Tags">
        <FilterTag
          filterTag={filters.filterTag}
          onChangeTag={handleChangeTag}
          options={TAG_OPTIONS}
          sx={{ mt: 2 }}
        />
      </Block> */}

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
);

Filters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,

  changeRating: PropTypes.func,
  changeFilterArrayItem: PropTypes.func,
  clearAll: PropTypes.func,
  filters: PropTypes.shape({
    filterPrices: PropTypes.array,
    filterBrands: PropTypes.array,
    filterCountries: PropTypes.array,
    filterCategories: PropTypes.array,
    filterRating: PropTypes.number,
  }),
};

export default Filters;
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
          icon={contentOpen.value ? 'fluent:minimize-20-regular' : 'fluent:add-20-regular'}
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
