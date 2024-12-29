'use client';

import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Dialog, Button, TextField, DialogTitle, DialogContent } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { uploadFile } from 'src/utils/upload';
import { endpoints, fetchDataWithToken } from 'src/utils/fetch';
import { convertImagePathToUrl, convertImageUrlToPath } from 'src/utils/common';

import { AuthGuard } from 'src/auth/guard';
import { provinces } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import RHFUploadAvatar from 'src/components/hook-form/rhf-upload-avatar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { title: 'Nam', value: 'male' },
  { title: 'Nữ', value: 'female' },
  { title: 'Khác', value: 'other' },
];

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const dialog = useBoolean();
  const passwordShow = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const phoneRegExp = /((\+84|84|0)(3|5|7|8|9|1[2689]))([0-9]{8})\b/;

  const phoneNumberSchema = Yup.string().test({
    name: 'phone',
    message: 'Số điện thoại không hợp lệ',
    test: (value) => {
      if (!value) return true; // Cho phép giá trị rỗng, do lựa chọn excludeEmptyString trong Yup

      return phoneRegExp.test(value);
    },
  });
  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email address is required'),
    phoneNumber: phoneNumberSchema,

    birthday: Yup.mixed().nullable(),
    gender: Yup.string(),
    address: Yup.string(),
    province: Yup.string(),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: null,
    gender: 'other',
    address: '',
    province: '',
    country: 'VN',
  };

  const methods = useForm({
    resolver: yupResolver(AccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const getUserProfile = async () => {
    try {
      const data = await fetchDataWithToken(endpoints.auth.me, null, 'GET');

      const cloneData = {
        ...data,
        photo: convertImagePathToUrl(data.photo, 250),
        birthday: new Date(data.birthday),
      };

      reset(cloneData);
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      const cloneData = {
        ...data,
        photo: convertImageUrlToPath(data.photo),
        province: data.province || undefined,
        phoneNumber: data.phoneNumber || undefined,
        birthday: data.birthday || undefined,
      };
      await fetchDataWithToken(endpoints.auth.me, cloneData, 'PATCH');
      await getUserProfile();
      enqueueSnackbar('Cập nhật thông tin thành công', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  });

  const handleDropImage = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    try {
      const dataResponse = await uploadFile(file);
      const url = convertImagePathToUrl(dataResponse.path, 250);

      setValue('photo', url, { shouldValidate: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthGuard>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Thông tin cá nhân
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <RHFUploadAvatar
              name="photo"
              maxSize={3145728}
              onDrop={handleDropImage}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                    py: 1,
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3MB
                </Typography>
              }
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                rowGap={2.5}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              >
                <RHFTextField size="small" name="firstName" label="Họ" />

                <RHFTextField size="small" name="lastName" label="Tên" />

                <RHFTextField size="small" name="email" label="Email" />
                <RHFTextField size="small" name="phoneNumber" label="Số điện thoại" />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Controller
            name="birthday"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                size="small"
                label="Ngày sinh"
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    error: !!error?.message,
                  },
                }}
                {...field}
                value={field.value}
              />
            )}
          />

          <RHFSelect
            InputLabelProps={{ shrink: true }}
            PaperPropsSx={{ textTransform: 'capitalize' }}
            size="small"
            native
            name="gender"
            label="Giới tính"
          >
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </RHFSelect>

          <RHFTextField size="small" name="address" label="Địa chỉ" />

          <RHFAutocomplete
            name="province"
            type="province"
            size="small"
            label="Tỉnh thành"
            placeholder="Chọn tỉnh thành"
            fullWidth
            options={provinces.map((option) => option)}
            getOptionLabel={(option) => option}
          />
        </Box>
        <Stack spacing={3} sx={{ my: 5 }}>
          <Typography variant="h5">
            {' '}
            Mật khẩu{' '}
            <IconButton onClick={dialog.onTrue}>
              <Iconify width={24} icon="fluent:edit-20-regular" />
            </IconButton>{' '}
          </Typography>
        </Stack>
        <LoadingButton
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Lưu lại
        </LoadingButton>
      </FormProvider>
      <Dialog maxWidth="xs" fullWidth onClose={dialog.onFalse} open={dialog.value}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Thay đổi mật khẩu</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={dialog.onFalse}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="fluent:dismiss-20-regular" />
        </IconButton>
        <DialogContent>
          <Stack sx={{ p: 2 }} spacing={2.5}>
            <TextField
              size="small"
              name="oldPassword"
              label="Mật khẩu cũ"
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

            <TextField
              size="small"
              name="newPassword"
              label="Mật khẩu mới"
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

            <TextField
              size="small"
              name="confirmNewPassword"
              label="Xác nhận mật khẩu mới"
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
            <Stack direction="row" spacing={1} display="flex" justifyContent="flex-end">
              <Button variant="contained">Lưu lại</Button>
              <Button onClick={dialog.onFalse} color="inherit" variant="outlined">
                Hủy
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </AuthGuard>
  );
}
