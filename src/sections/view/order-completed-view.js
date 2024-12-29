'use client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import OrderCompleteIllustration from 'src/assets/illustrations/order-complete-illustration';

import Iconify from 'src/components/iconify';
import { MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function OrderCompletedView() {
  return (
    <Container
      component={MotionContainer}
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Box
        sx={{
          py: 5,
          gap: 5,
          m: 'auto',
          maxWidth: 480,
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          px: { xs: 2, sm: 0 },
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">Cám ơn bạn đã mua hàng!</Typography>
        <OrderCompleteIllustration />
        <Stack spacing={1} sx={{ my: 5 }}>
          <Typography variant="h5">Đơn hàng của bạn đã được đặt!</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Bạn sẽ nhận được email hoặc SMS xác nhận với chi tiết đơn hàng.
          </Typography>
        </Stack>
        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            component={RouterLink}
            href={paths.products}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="fluent:chevron-left-20-regular" />}
            sx={{ textTransform: 'none' }}
          >
            Tiếp tục mua hàng
          </Button>

          <Button
            size="large"
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-download-fill" />}
            // onClick={onDownloadPDF}
          >
            Tải hóa đơn PDF
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
