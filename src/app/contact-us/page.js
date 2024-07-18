/* eslint-disable react/no-danger */

'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Alert, Divider, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ContactUs() {
  const [complete, setComplete] = useState(false);

  const defaultValues = {
    content: '',
    fullName: '',
    phoneNumber: '',
    email: '',
  };

  const NewContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Tên không được bỏ trống'),
    content: Yup.string().required('Nội dung không được bỏ trống'),
    email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
    phoneNumber: Yup.string()
      .matches(/((\+84|84|0)(3|5|7|8|9|1[2689]))([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
      .required('Số điện thoại không được bỏ trống'),
  });

  const methods = useForm({
    resolver: yupResolver(NewContactSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    try {
      reset();
      setComplete(true);
    } catch (error) {
      console.error(error);
    }
  });

  const iframe = () => ({
    __html:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29788.723252452728!2d105.98511991026903!3d21.049068760896265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a7afdd946b1b%3A0x61704af1e329ee0f!2zTOG7hyBDaGksIEdpYSBMw6JtLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1721288865535!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  });
  return (
    <Container>
      <CustomBreadcrumbs
        links={[
          {
            name: 'Trang chủ',
            href: '/',
          },
          {
            name: 'Liên hệ',
            href: '/contact-us',
          },
        ]}
        sx={{ my: 5 }}
      />
      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid spacing={2} item xs={12} md={6}>
          <Stack p={2} spacing={1}>
            {' '}
            <Box>
              <Typography variant="h5">HÀNG NGA CHÍNH HÃNG - LUDMILA</Typography>
            </Box>
            <Box
              variant="body2"
              sx={{ color: 'text.primary', alignItems: 'center', display: 'flex' }}
            >
              <Iconify icon="carbon:location" />
              <Typography variant="body2">
                &nbsp; T10 Tòa Benka, Lệ chi - Gia Lâm - Hà Nội
              </Typography>
            </Box>
            <Box
              variant="body2"
              sx={{ color: 'text.primary', alignItems: 'center', display: 'flex' }}
            >
              <Iconify icon="carbon:mobile" />{' '}
              <Typography variant="body2">&nbsp; 0832.66.77.11</Typography>
            </Box>
            <Box
              variant="body2"
              sx={{ color: 'text.primary', alignItems: 'center', display: 'flex' }}
            >
              <Iconify icon="carbon:email" />
              <Typography variant="body2"> &nbsp; support@ludmila.vn</Typography>
            </Box>
          </Stack>
          <Divider />
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack my={2} spacing={2.5}>
              <Typography variant="body1">LIÊN HỆ VỚI CHÚNG TÔI</Typography>
              {complete && (
                <Alert icon={<Iconify icon="carbon:checkmark" />} severity="success">
                  Bạn đã gửi tin nhắn thành công
                </Alert>
              )}
              <RHFTextField multiline rows={3} name="content" label="Nội dung *" />

              <RHFTextField name="fullName" label="Tên *" />
              <RHFTextField name="email" label="Email *" />
              <RHFTextField name="phoneNumber" label="Số điện thoại *" />
            </Stack>

            <LoadingButton color="inherit" type="submit" variant="contained" loading={isSubmitting}>
              Gửi
            </LoadingButton>
          </FormProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <div dangerouslySetInnerHTML={iframe()} />
        </Grid>
      </Grid>
    </Container>
  );
}
