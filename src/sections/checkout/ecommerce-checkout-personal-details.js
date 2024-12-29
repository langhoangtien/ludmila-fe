import Box from '@mui/material/Box';

import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CheckoutPersonalDetails() {
  return (
    <>
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
