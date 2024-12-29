import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { timeFormat } from 'src/utils/common';

// ----------------------------------------------------------------------

export default function ReviewItem({ fullName, rating, content, createdAt, avatarUrl }) {
  const { raw, time } = timeFormat(createdAt);
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

        <Typography variant="body2">{content}</Typography>
        <Stack direction="row" spacing={1}>
          {' '}
          <Tooltip placement="top-start" title={raw}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {time}{' '}
            </Typography>
          </Tooltip>
          <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer' }}>
            Trả lời
          </Typography>
        </Stack>
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
