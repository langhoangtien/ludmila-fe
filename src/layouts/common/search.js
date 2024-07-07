import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { Box, Avatar, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { fCurrency } from 'src/utils/format-number';
import { encodeData, convertImagePathToUrl } from 'src/utils/common';

import { HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';

export default function Search() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const debounceText = useDebounce(inputValue, 500);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = (path) => {
    setOpen(false);
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
      setOpen(false);
      router.push(`${paths.root}?search=${inputValue}`);
    }
  };
  return (
    <Autocomplete
      size="small"
      sx={{ width: 1 }}
      inputValue={inputValue}
      onKeyUp={handleKeyUp}
      noOptionsText={
        <Typography
          component="span"
          color="primary.main"
          sx={{
            typography: 'body2',
            fontWeight: 'fontWeightMedium',
          }}
        >
          Không tìm thấy từ khóa
        </Typography>
      }
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      options={options}
      getOptionLabel={(option) => option.name}
      popupIcon={null}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      renderInput={(params) => (
        <TextField
          size="small"
          {...params}
          hiddenLabel
          placeholder="Tìm kiếm sản phẩm..."
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={20} icon="carbon:search" sx={{ color: 'text.disabled', mr: 1 }} />
              </InputAdornment>
            ),
            sx: { pb: 1 },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          m={1}
          component="li"
          {...props}
          onClick={() => handleClick(option.path)}
          key={option.id}
        >
          <Avatar
            key={option.id}
            alt={option.name}
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
          <div>
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
          </div>
        </Box>
      )}
    />
  );
}
