import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

export default function ProductDetailsDescription({ description }) {
  const [readMore, setReadMore] = useState(true);

  const handleReadMore = () => {
    setReadMore((prev) => !prev);
  };

  return (
    <Stack
      spacing={4}
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      {/* Content Container */}
      <Stack
        component="div"
        id="cha"
        sx={{
          maxHeight: readMore ? { xs: '20rem', md: '35rem' } : 'unset',
          position: 'relative',
          overflow: 'hidden',
        }}
        spacing={2}
      >
        <Typography variant="h6">Mô tả sản phẩm</Typography>
        <Markdown content={description} />
      </Stack>

      {/* Button with Gradient */}
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
            bottom: 0,
            height: '100px',
            pointerEvents: 'none',
            background: (theme) =>
              `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 90%)`,
          },
        }}
      >
        <Button
          sx={{
            textTransform: 'none',
            typography: 'body2',
            fontWeight: 500,
          }}
          color="primary"
          onClick={handleReadMore}
        >
          {readMore ? 'Xem thêm...' : 'Thu gọn...'}
        </Button>
      </Box>
    </Stack>
  );
}

ProductDetailsDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
