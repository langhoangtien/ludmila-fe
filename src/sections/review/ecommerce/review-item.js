import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ReviewItem({ fullName, rating, content, createdAt, avatarUrl }) {
  return (
    <Stack
      direction="row"
      sx={{
        py: 4,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Avatar alt={fullName} src={avatarUrl} sx={{ width: 64, height: 64, mr: 2.5 }} />

      <Stack spacing={1}>
        <Rating size="small" value={rating} precision={0.5} readOnly />

        <Typography variant="subtitle1">{fullName}</Typography>

        {createdAt && (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDateTime(createdAt)}
          </Typography>
        )}

        <Typography variant="body2">{content}</Typography>

        {/* <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }}>
          <Typography variant="subtitle2">Đánh giá này có hữu ích không?</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Button size="small" color="inherit" startIcon={<Iconify icon="carbon:thumbs-up" />}>
              Có
            </Button>

            <Button
              size="small"
              color="inherit"
              startIcon={
                <Iconify
                  icon="carbon:thumbs-up"
                  sx={{
                    transform: 'scale(-1, -1)',
                  }}
                />
              }
            >
              Không
            </Button>
          </Stack>
        </Stack> */}
      </Stack>
    </Stack>
  );
}

ReviewItem.propTypes = {
  fullName: PropTypes.string,
  rating: PropTypes.number,
  content: PropTypes.string,
  avatarUrl: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
};
