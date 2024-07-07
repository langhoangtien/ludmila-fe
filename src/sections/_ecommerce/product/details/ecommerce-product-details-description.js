import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsDescription({ description, specifications }) {
  const [readMore, setReadMore] = useState(true);
  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <Stack
      spacing={4}
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6"> Thuộc tính </Typography>

        {specifications.map((row) => (
          <Stack
            key={row.label}
            spacing={0.5}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            sx={{ typography: 'body2' }}
          >
            <Box component="span" sx={{ width: 160, color: 'text.secondary' }}>
              {row.label}
            </Box>
            <Box component="span">{row.value}</Box>
          </Stack>
        ))}
      </Stack>

      <Stack
        component="div"
        id="cha"
        sx={{
          maxHeight: readMore ? { xs: 240, md: 400 } : undefined,
          position: 'relative',
          overflow: 'hidden',
        }}
        spacing={2}
      >
        {/* {readMore && (
          <Box
            id="ddj"
            sx={{
              position: 'absolute',
              zIndex: 8,

              paddingTop: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              backgroundImage:
                ' linear-gradient(to bottom, rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 1),rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))',
            }}
          />
        )} */}
        <Typography variant="h6"> Mô tả sản phẩm </Typography>
        <Markdown content={description} />
        {/* 
        <Stack
          justifyContent="center"
          gap={2}
          flexDirection="row"
          width={1.0}
          flexWrap="wrap"
          sx={{
            position: 'absolute',
            bottom: -60,
            display: 'flex',
            zIndex: 9,
          }}
        >
        
        </Stack> */}
      </Stack>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          '&::before': readMore && {
            position: 'absolute',
            content: '""',
            left: 0,
            right: 0,
            bottom: '100%',
            height: 100,
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 17%, #fff 93.12%)',
          },
        }}
      >
        <Button sx={{ textTransform: 'none' }} color="primary" onClick={handleReadMore}>
          {readMore ? 'Xem thêm...' : 'Thu gọn...'}
        </Button>
      </Box>
    </Stack>
  );
}

EcommerceProductDetailsDescription.propTypes = {
  description: PropTypes.string,
  specifications: PropTypes.array,
};
