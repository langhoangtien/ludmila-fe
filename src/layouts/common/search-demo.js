import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import {
  Box,
  List,
  Card,
  Stack,
  Avatar,
  Divider,
  TextField,
  Typography,
  IconButton,
  ListItemButton,
  InputAdornment,
  CircularProgress,
  ClickAwayListener,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { fCurrency } from 'src/utils/format-number';
import { encodeData, convertImagePathToUrl } from 'src/utils/common';

import { HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify/iconify';

export default function SearchDemo({ sx, ...other }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const debounceText = useDebounce(value, 500);
  const [options, setOptions] = useState([]);
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClickAway = () => {
    setIsMenuVisible(false);
  };

  const handleClick = (path) => {
    setIsMenuVisible(false);
    router.push(`${paths.product}/${path}`);
  };
  const handleSearchDesktop = () => {
    setIsMenuVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debounceText) {
        return;
      }
      setLoading(true);
      try {
        const filter = encodeData({
          $or: ['name', 'code', 'slug'].map((item) => ({
            [item]: { $regex: debounceText, $options: 'i' },
          })),
        });
        const url = `${HOST_API}/products?limit=5&filter=${filter}`;
        const response = await fetch(url);
        const { items } = await response.json();

        const dataMapped = items.map((item) => ({
          name: item.name,
          code: item.code,
          slug: item.slug,
          price: item.price,
          image: convertImagePathToUrl(item.image),
          path: `${item.slug}-${item.id}`,
        }));
        setOptions(dataMapped);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debounceText]);

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' && value.trim()) {
      router.push(`${paths.root}/products/?search=${value}`);
    }
  };

  const handleClickSearch = () => {
    if (value.trim()) {
      router.push(`${paths.root}/products/?search=${value}`);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack
        {...other}
        sx={{
          ...sx,
          zIndex: 90,
          marginBottom: 0.5,
          maxWidth: { md: 500 },
          position: { md: 'relative' },
        }}
      >
        <TextField
          onKeyUp={handleKeyUp}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleSearchDesktop}
          value={value}
          fullWidth
          size="small"
          placeholder="Tìm kiếm sản phẩm"
          hiddenLabel
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={handleClickSearch}>
                  <Iconify icon="fluent:search-20-regular" sx={{ color: 'primary.main' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isMenuVisible && (
          <Card
            sx={{
              position: 'absolute',
              width: 1,
              zIndex: 100,
              pb: 3,
              px: 1,
              top: 45,
              left: 0,
            }}
          >
            <WrappSearchDemo
              value={value}
              handleClick={handleClick}
              products={options}
              debounceText={debounceText}
              loading={loading}
            />
          </Card>
        )}
      </Stack>
    </ClickAwayListener>
  );
}

const WrappSearchDemo = ({ value, handleClick, products, debounceText, loading }) => {
  if (loading) return <Loading />;
  if (products.length)
    return <Result products={products} value={value} handleClick={handleClick} />;
  if (debounceText) return <NoResult value={value} />;
  return <SearchHistory />;
};
const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, alignItems: 'center' }}>
    <CircularProgress />
  </Box>
);
const Result = ({ products, handleClick, value }) => (
  <List sx={{ width: '100%' }}>
    {products.map((product) => (
      <React.Fragment key={product.path}>
        <ListItemButton component="nav" onClick={() => handleClick(product.path)}>
          <Avatar
            alt=""
            src={product.image}
            variant="rounded"
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
              mr: 1.5,
              borderRadius: 1,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component="span"
              color="textPrimary"
              sx={{
                px: 1,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
              }}
            >
              {product.name}
            </Typography>
            <Typography
              component="span"
              color="primary.main"
              sx={{
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
              }}
            >
              {fCurrency(product.price)}
            </Typography>
          </Box>
        </ListItemButton>
        <Divider />
      </React.Fragment>
    ))}
    <ListItemButton component="nav">
      <Link style={{ textDecoration: 'none' }} href={`/products?search=${value}`}>
        <Typography textAlign="center" variant="body2" color="primary.main">
          Xem tất cả sản phẩm
        </Typography>
      </Link>
    </ListItemButton>
  </List>
);
const NoResult = () => (
  <Box sx={{ p: 2, textAlign: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      Không tìm thấy sản phẩm
    </Typography>
  </Box>
);
WrappSearchDemo.propTypes = {
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  debounceText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

Result.propTypes = {
  products: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

SearchDemo.propTypes = { sx: PropTypes.object };
const SearchHistory = () => <p>lic su</p>;
SearchDemo.propTypes = { sx: PropTypes.object };
