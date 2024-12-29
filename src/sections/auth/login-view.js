'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import GoogleAuth from 'src/auth/google-login';
import { useAuthContext } from 'src/auth/hooks';
import FacebookLogin from 'src/auth/facebook-login/facebook';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function LoginView({ onChangePage = null, dialog = null }) {
  const passwordShow = useBoolean();
  const auth = useAuthContext();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const router = useRouter();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const handleChangePage = () => {
    if (onChangePage) onChangePage();
    else router.push(paths.register);
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await auth.login(data);
      if (dialog) dialog.onFalse();
      else {
        router.push(returnTo || '/');
      }
    } catch (error) {
      console.error(error);
    }
  });

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
  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Đăng nhập
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Bạn chưa có tài khoản? `}
        <Link component={Button} onClick={handleChangePage} variant="subtitle2" color="primary">
          Đăng ký
        </Link>
      </Typography>
    </div>
  );
  const renderSocials = (
    <Stack direction="column" alignItems="center" spacing={2}>
      <GoogleAuth callback={handleGoogleLogin} />
      <FacebookLogin callback={handleFacebookLogin} />
      {/* <ButtonLogin icon="logos:apple">Đăng nhập bằng Apple</ButtonLogin> */}
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
        <RHFTextField name="email" label="Email address" />

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

        <Link
          component={RouterLink}
          href={paths.forgotPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Quên mật khẩu?
        </Link>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Đăng nhập
        </LoadingButton>
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

LoginView.propTypes = {
  onChangePage: PropTypes.func,
  dialog: PropTypes.object,
};
