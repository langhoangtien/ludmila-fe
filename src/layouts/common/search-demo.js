import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  List,
  Paper,
  Stack,
  alpha,
  Avatar,
  TextField,
  Typography,
  ListItemButton,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { fCurrency } from 'src/utils/format-number';
import { encodeData, convertImagePathToUrl } from 'src/utils/common';

import { bgBlur } from 'src/theme/css';
import { HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify/iconify';

export default function SearchDemo({ sx, ...other }) {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const debounceText = useDebounce(value, 500);
  const [options, setOptions] = useState([]);

  const handleClickAway = () => {
    setValue('');
  };
  const router = useRouter();
  const handleClick = (path) => {
    setValue('');
    router.push(`${paths.product}/${path}`);
  };
  // GỌI API
  const fetchData = async () => {
    if (!debounceText) return;
    try {
      const filter = encodeData({
        $or: ['name', 'code', 'slug'].map((item) => ({
          [item]: { $regex: debounceText, $options: 'i' },
        })),
      });
      const url = `${HOST_API}/products?limit=5&filter=${filter}`;
      const response = await fetch(url);
      const DataJson = await response.json();

      const { items } = DataJson;

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
      console.log('error', error);
    }
  };
  const fetchDataCallback = useCallback(fetchData, [debounceText]);
  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      router.push(`${paths.root}?search=${value}`);
      setValue('');
    }
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack {...other} sx={{ ...sx, position: 'relative', zIndex: 1000 }}>
        <TextField
          sx={{
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.95),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.85),
            },
          }}
          onKeyUp={handleKeyUp}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          fullWidth
          size="small"
          placeholder="Tìm kiếm sản phẩm"
          hiddenLabel
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="carbon:search" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        {value && (
          <Paper
            sx={{
              ...bgBlur({
                blur: 2,
                opacity: 0.98,
                color: theme.palette.background.default,
              }),
              position: 'absolute',
              width: 1,
              zIndex: 1000000,
              pb: 3,
              px: 1,
              top: 50,
            }}
          >
            <List sx={{ width: '100%' }}>
              {options.map((option) => (
                <ListItemButton component="nav" onClick={() => handleClick(option.path)}>
                  <Avatar
                    alt=""
                    src={option.image}
                    variant="rounded"
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      mr: 1.5,
                      borderRadius: 1,
                    }}
                  />

                  <Typography
                    component="span"
                    color="textPrimary"
                    sx={{
                      px: 1,
                      typography: 'body2',
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {option.name}
                  </Typography>
                  <Typography
                    component="span"
                    color="primary.main"
                    sx={{
                      typography: 'body2',
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {fCurrency(option.price)}
                  </Typography>
                </ListItemButton>
              ))}
              {options.length > 0 ? (
                <ListItemButton component="nav">
                  <Typography textAlign="center" variant="body2" color="primary.main">
                    Xem tất cả sản phẩm
                  </Typography>
                </ListItemButton>
              ) : (
                <ListItemButton>
                  <Typography textAlign="center" variant="body2" color="primary.main">
                    Không tìm thấy sản phẩm
                  </Typography>
                </ListItemButton>
              )}
            </List>
          </Paper>
        )}
      </Stack>
    </ClickAwayListener>
  );
}

SearchDemo.propTypes = { sx: PropTypes.object };
