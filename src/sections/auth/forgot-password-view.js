'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { endpoints } from 'src/utils/fetch';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [textError, setTextError] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email là bắt buộc').email('Vui lòng nhập đúng định dạng email'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await fetch(endpoints.auth.forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      setIsConfirm(true);
    } catch (error) {
      console.error(error);
      setTextError(true);
    }
  });

  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Image
        alt="reset password"
        src="/assets/icons/ic_lock_password.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3" paragraph>
        Quên mật khẩu?
      </Typography>

      {isConfirm && !textError && (
        <Typography variant="body2" sx={{ color: 'success.main', mb: 5 }}>
          Chúng tôi đã gửi một liên kết qua email để đặt lại mật khẩu của bạn. Vui lòng kiểm tra hộp
          thư đến của bạn.
        </Typography>
      )}
      {!isConfirm && !textError && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
          Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn và chúng tôi sẽ gửi cho
          bạn một liên kết qua email để đặt lại mật khẩu của bạn
        </Typography>
      )}
      {isConfirm && textError && (
        <Typography variant="body2" sx={{ color: 'error.main', mb: 5 }}>
          Đã co lỗi xảy ra, vui lòng thử lại
        </Typography>
      )}

      {!isConfirm && (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFTextField name="email" hiddenLabel placeholder="Email" />

          <LoadingButton
            fullWidth
            size="large"
            color="inherit"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 2.5 }}
          >
            Đặt lại mật khẩu
          </LoadingButton>
        </FormProvider>
      )}

      <Link
        component={RouterLink}
        href={paths.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="fluent:chevron-left-20-regular" width={16} sx={{ mr: 1 }} />
        Quay lại đăng nhập
      </Link>
    </Stack>
  );
}
