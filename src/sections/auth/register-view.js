'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';

import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import GoogleAuth from 'src/auth/google-login';
import { useAuthContext } from 'src/auth/hooks';
import FacebookLogin from 'src/auth/facebook-login';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterView({ onChangePage = null, dialog = null }) {
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const returnTo = searchParams.get('returnTo');
  const router = useRouter();
  const passwordShow = useBoolean();
  const auth = useAuthContext();
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Full name is required')
      .min(2, 'Mininum 6 characters')
      .max(15, 'Maximum 15 characters'),
    lastName: Yup.string()
      .required('Full name is required')
      .min(2, 'Mininum 6 characters')
      .max(15, 'Maximum 15 characters'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], "Password's not match"),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleChangePage = () => {
    if (onChangePage) onChangePage();
    else router.push(paths.login);
  };

  const handleFacebookLogin = async (data) => {
    await auth.login(data, 'facebook');
    if (dialog) dialog.onFalse();
    else {
      router.push(returnTo || '/');
    }
  };
  const handleGoogleLogin = async (data) => {
    await auth.login(data, 'google');
    if (dialog) dialog.onFalse();
    else {
      router.push(returnTo || '/');
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      await auth.register(data);
      reset();
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
      if (dialog) dialog.onFalse();
      else {
        router.push(returnTo || '/');
      }
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Đăng ký
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Bạn đã có tài khoản? `}
        <Link component={Button} onClick={handleChangePage} variant="subtitle2" color="primary">
          Đăng nhập
        </Link>
      </Typography>
    </div>
  );

  const renderSocials = (
    <Stack direction="column" alignItems="center" spacing={2}>
      <GoogleAuth callback={handleGoogleLogin} />
      <FacebookLogin callback={handleFacebookLogin} />
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {' '}
          <RHFTextField name="firstName" label="Họ" />
          <RHFTextField name="lastName" label="Tên" />
        </Box>

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify
                    icon={
                      passwordShow.value ? 'fluent:eye-20-regular' : 'fluent:eye-20-regular-off'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify
                    icon={
                      passwordShow.value ? 'fluent:eye-20-regular' : 'fluent:eye-20-regular-off'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Đăng ký
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`Tôi đồng ý với `}
          <Link color="text.primary" href="/privacy-policy" underline="always">
            Điều khoản sử dụng
          </Link>
          {` và `}
          <Link color="text.primary" href="#" underline="always">
            Chính sách bảo mật.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      <Divider>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          Hoặc đăng nhập bằng
        </Typography>
      </Divider>

      {renderSocials}
    </>
  );
}

RegisterView.propTypes = {
  onChangePage: PropTypes.func,
  dialog: PropTypes.object,
};
