import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormHelperText from '@mui/material/FormHelperText';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ReviewForm({ onClose, authenticated, submitComment, parent, ...other }) {
  return authenticated ? (
    <ReviewNewFormAuth parent={parent} onClose={onClose} submitComment={submitComment} {...other} />
  ) : (
    <ReviewNewForm parent={parent} onClose={onClose} submitComment={submitComment} {...other} />
  );
}

const ReviewNewForm = ({ onClose, submitComment, parent, ...other }) => {
  const defaultValues = {
    rating: undefined,
    content: '',
    fullName: '',
    phoneNumber: '',
  };

  const NewReviewSchema = Yup.object().shape({
    fullName: Yup.string().required('Tên không được bỏ trống'),
    rating: Yup.number().min(1, 'Đánh giá tối thiểu 1 sao').max(5, 'Đánh giá tối đa 5 sao'),
    content: Yup.string().required('Nội dung không được bỏ trống'),
    phoneNumber: Yup.string()
      .matches(/((\+84|84|0)(3|5|7|8|9|1[2689]))([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
      .required('Số điện thoại không được bỏ trống'),
  });

  const methods = useForm({
    resolver: yupResolver(NewReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await submitComment(data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ typography: 'h4', pb: 3 }}>Bình luận</DialogTitle>

        <DialogContent sx={{ py: 0 }}>
          <Stack spacing={2.5}>
            <div>
              {parent ? (
                <Typography variant="body1" gutterBottom>
                  Trả lời:{' '}
                  <Box sx={{ color: 'primary.main' }} component="span">
                    {parent.fullName}
                  </Box>
                </Typography>
              ) : (
                <Typography variant="body1" gutterBottom>
                  Đánh giá:
                </Typography>
              )}

              {!parent && (
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Rating
                      {...field}
                      value={Number(field.value)}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                    />
                  )}
                />
              )}

              {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}
            </div>

            <RHFTextField multiline rows={3} name="content" label="Nội dung *" />

            <RHFTextField name="fullName" label="Tên *" />

            <RHFTextField name="phoneNumber" label="Số điện thoại *" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Hủy
          </Button>

          <LoadingButton color="inherit" type="submit" variant="contained" loading={isSubmitting}>
            Gửi
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

const ReviewNewFormAuth = ({ onClose, submitComment, parent, ...other }) => {
  const defaultValues = { rating: undefined, content: '' };

  const NewReviewSchema = Yup.object().shape({
    rating: Yup.number().min(1, 'Đánh giá tối thiểu 1 sao').max(5, 'Đánh giá tối đa 5 sao'),
    content: Yup.string().required('Review is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await submitComment(data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ typography: 'h4', pb: 3 }}>Bình luận</DialogTitle>

        <DialogContent sx={{ py: 0 }}>
          <Stack spacing={2.5}>
            <div>
              {parent ? (
                <Typography variant="body1" gutterBottom>
                  Trả lời:{' '}
                  <Box sx={{ color: 'primary.main' }} component="span">
                    {parent.fullName}
                  </Box>
                </Typography>
              ) : (
                <Typography variant="body1" gutterBottom>
                  Đánh giá:
                </Typography>
              )}

              {!parent && (
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Rating
                      {...field}
                      value={Number(field.value)}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                    />
                  )}
                />
              )}

              {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}
            </div>

            <RHFTextField multiline rows={3} name="content" label="Nội dung *" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Hủy
          </Button>

          <LoadingButton color="inherit" type="submit" variant="contained" loading={isSubmitting}>
            Gửi
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

ReviewNewForm.propTypes = {
  onClose: PropTypes.func,
  submitComment: PropTypes.func,
  parent: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.oneOf([null])]),
};

ReviewNewFormAuth.propTypes = {
  onClose: PropTypes.func,
  submitComment: PropTypes.func,
  parent: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.oneOf([null])]),
};
ReviewForm.propTypes = {
  onClose: PropTypes.func,
  authenticated: PropTypes.bool,
  submitComment: PropTypes.func,
  parent: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.oneOf([null])]),
};
