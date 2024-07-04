'use client';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

import { useAuthContext } from 'src/auth/hooks';
import GoogleLogin from 'src/auth/google-login';
import FacebookLogin from 'src/auth/facebook-login';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function LoginBackgroundView({ onChangePage, dialog }) {
  const passwordShow = useBoolean();
  const auth = useAuthContext();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: 'test01@example.com',
    password: 'string',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await auth.login(data);
      reset();
      // router.reload();
      dialog.onFalse();
    } catch (error) {
      console.error(error);
    }
  });

  const handleFacebookLogin = async (response) => {
    auth.login({ accessToken: response }, 'facebook');
    dialog.onFalse();
  };
  const handleGoogleLogin = async (response) => {
    auth.login({ idToken: response }, 'google');
    dialog.onFalse();
  };
  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Đăng nhập
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Bạn chưa có tài khoản? `}
        <Link component={Button} onClick={onChangePage} variant="subtitle2" color="primary">
          Đăng ký
        </Link>
      </Typography>
    </div>
  );

  const renderSocials = (
    <Stack alignItems="center" direction="column" spacing={2}>
      <FacebookLogin fields="name,email" callback={handleFacebookLogin} />
      <GoogleLogin submitLogin={handleGoogleLogin} />
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
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
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

LoginBackgroundView.propTypes = {
  onChangePage: PropTypes.func,
  dialog: PropTypes.object,
};
