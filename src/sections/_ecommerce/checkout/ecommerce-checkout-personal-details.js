import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPersonalDetails() {
  const { unauthenticated } = useAuthContext();

  return (
    <>
      {unauthenticated && (
        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <Typography variant="subtitle2">Đăng nhập:</Typography>

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="carbon:logo-facebook" sx={{ color: '#1877F2' }} />}
          >
            Facebook
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="logos:google-icon" />}
          >
            Google
          </Button>

          <Button color="inherit" variant="outlined" startIcon={<Iconify icon="carbon:email" />}>
            Email
          </Button>
        </Stack>
      )}

      <Box
        rowGap={2.5}
        columnGap={1}
        display="grid"
        p={1}
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)' }}
      >
        <RHFTextField required name="receiverName" label="Họ và tên" />
      </Box>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        p={1}
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <RHFTextField required name="phoneNumber" label="Số điện thoại" />

        <RHFTextField placeholder="Không bắt buộc" name="email" label="Email" />
      </Box>
      <Box
        rowGap={2.5}
        columnGap={1}
        display="grid"
        p={1}
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)' }}
      >
        <RHFTextField required rows={2} multiline name="shippingAddress" label="Địa chỉ" />
      </Box>
    </>
  );
}
