import Box from '@mui/material/Box';

import { countries } from 'src/assets/data';

import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutShippingDetails() {
  return (
    <Box
      rowGap={2.5}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
    >
      <RHFTextField name="phoneNumber" label="Số điện thoại" />
      <RHFTextField name="address" label="Địa chỉ" />
      <RHFTextField name="city" label="Thành phố" />

      <RHFAutocomplete
        name="country"
        type="country"
        label="Quốc gia"
        placeholder="Chọn quốc gia"
        value="VN"
        disabled
        fullWidth
        options={countries.map((option) => option.code)}
        getOptionLabel={(option) => option}
      />
    </Box>
  );
}
