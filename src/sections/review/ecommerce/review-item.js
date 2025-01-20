import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { Box, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints, fetchData } from 'src/utils/fetch';
import { encodeData, timeFormat, convertImagePathToUrl } from 'src/utils/common';

import { HOST_API } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';

import ReviewNewForm from 'src/sections/review/common/review-new-form';

// ----------------------------------------------------------------------

export default function ReviewItem({
  fullName,
  rating,
  content,
  createdAt,
  avatarUrl,
  id,
  childNumber,
  productId,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState([]);
  const [parent, setParent] = useState(null);
  const formOpen = useBoolean();
  const { authenticated, user } = useAuthContext();
  useEffect(() => {
    setCount(childNumber);
  }, [childNumber]);
  const handleLoadMoreComment = async () => {
    setLoading(true);
    const responseJson = await fetch(
      `${HOST_API}/comments?parentId=${id}&limit=5&skip=${
        items.length - temp.length
      }&sort=${encodeData({
        orderBy: 'createdAt',
        order: 1,
      })}`
    );
    const response = await responseJson.json();
    const responseItems = [];
    for (let i = 0; i < response.items.length; i += 1) {
      if (!temp.includes(response.items[i]._id)) {
        const item = response.items[i];
        const newItem = {
          ...item,
          fullName: item.user ? `${item.user.firstName} ${item.user.lastName}` : item.fullName,
          photo: item.user?.photo ? convertImagePathToUrl(item.user?.photo, 250) : undefined,
        };
        responseItems.push(newItem);
      }
    }

    setLoading(false);
    setItems([...items, ...responseItems]);
    setCount(response.count);
  };

  const { raw, time } = timeFormat(createdAt);

  const submitComment = async (data) => {
    try {
      const newData = { ...data, productId, parentId: id, createdAt: new Date() };

      const subReviewItem = await fetchData(endpoints.comment.list, newData, 'POST', authenticated);
      const newSubReviewItem = {
        ...subReviewItem,
        user: undefined,
        fullName: user ? user.fullName : subReviewItem.fullName,
        photo: user?.photo ? convertImagePathToUrl(user?.photo, 250) : undefined,
      };

      setTemp([...temp, newSubReviewItem._id]);
      const listItem = [...items, newSubReviewItem];

      setItems(listItem);
      setCount(count + 1);
      formOpen.onFalse();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = (data) => {
    setParent(data);
    formOpen.onTrue();
  };
  return (
    <Stack
      sx={{
        pb: 2.5,
      }}
    >
      <Stack
        direction="row"
        sx={{
          position: 'relative',
          pb: 1.5,
        }}
      >
        {/* <Box sx={{ zIndex: 1 }} className={childNumber ? 'comment_comment-branch__b5nbp' : ''} /> */}
        <Box />
        <Avatar
          alt={fullName}
          src={avatarUrl}
          sx={{ width: 52, height: 52, mr: 2.5, zIndex: 2, backgroundColor: 'background.neutral' }}
        />

        <Stack spacing={0.5}>
          {!!rating && <Rating size="small" value={rating} precision={0.5} readOnly />}

          <Typography variant="subtitle1">{fullName}</Typography>

          <Typography variant="body2">{content}</Typography>
          <Stack direction="row" spacing={1}>
            {' '}
            <Tooltip placement="top-start" title={raw}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {time}{' '}
              </Typography>
            </Tooltip>
            <Typography
              onClick={() => handleReply({ fullName, parentId: id })}
              variant="caption"
              sx={{ color: 'primary.secondary', cursor: 'pointer' }}
            >
              Trả lời
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {!!count && (
        <Stack spacing={0.5}>
          <ListSubReview handleReply={handleReply} parentId={id} items={items} />

          <ReadmoreReview
            number={count - items.length}
            handleLoadMoreComment={handleLoadMoreComment}
            loading={loading}
          />
        </Stack>
      )}
      <ReviewNewForm
        authenticated={authenticated}
        parent={parent}
        submitComment={submitComment}
        open={formOpen.value}
        onClose={formOpen.onFalse}
      />
    </Stack>
  );
}
const ListSubReview = ({ items, handleReply, parentId }) => {
  if (items.length === 0) return null;
  return (
    <Stack sx={{ pt: 1 }}>
      {items.map((item) => (
        <SubReviewItem
          handleReply={handleReply}
          key={item._id}
          fullName={item.user ? `${item.user.firstName} ${item.user.lastName}` : item.fullName}
          createdAt={item.createdAt}
          content={item.content}
          parentId={parentId}
          avatarUrl={item.photo}
        />
      ))}
    </Stack>
  );
};

function SubReviewItem({ fullName, content, createdAt, avatarUrl, parentId, handleReply }) {
  const { raw, time } = timeFormat(createdAt);

  const handleReplyComment = () => {
    handleReply({ fullName, parentId });
  };
  return (
    <Stack sx={{ position: 'relative', pl: 10 }} direction="row">
      {/* {!last && <Box className="comment_comment-branch__b5nbp" />}
      <Box className="comment_reply-branch__NKquM" /> */}
      <Avatar
        alt={fullName}
        src={avatarUrl}
        sx={{ width: 40, height: 40, mr: 1.5, backgroundColor: 'background.neutral' }}
      />
      <Stack spacing={0.5}>
        <Typography sx={{ fontWeight: 'fontWeightBold' }} variant="subtitle2">
          {fullName}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Stack sx={{ mb: 1 }} direction="row" spacing={1}>
          {' '}
          <Tooltip placement="top-start" title={raw}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {time}{' '}
            </Typography>
          </Tooltip>
          <Typography
            onClick={handleReplyComment}
            variant="caption"
            sx={{ color: 'primary.secondary', cursor: 'pointer' }}
          >
            Trả lời
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

const ReadmoreReview = ({ loading, number, handleLoadMoreComment }) => {
  if (number <= 0) return null;
  return (
    <Stack spacing={1} sx={{ pl: 10, mb: 1, position: 'relative' }}>
      {/* <Box className="comment_comment-branch__b5nbp" /> */}
      {/* <Box className="comment_reply-branch__NKquM" /> */}
      {loading && <Spinner />}
      {!loading && number > 0 && (
        <Stack direction="row" alignItems="center" onClick={handleLoadMoreComment} spacing={1}>
          <Iconify
            sx={{ color: 'text.secondary', cursor: 'pointer' }}
            icon="fluent:minimize-20-regular"
            width={28}
            height={400}
          />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer' }}>
              Xem thêm {number} bình luận{' '}
            </Typography>
            <Iconify
              width={18}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
              icon="fluent:chevron-down-20-regular"
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
const Spinner = () => (
  <Stack direction="row" spacing={1}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
      }}
      component={m.div}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 1.5,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <Iconify width={20} icon="fluent:arrow-clockwise-20-regular" />
    </Box>
    <Typography variant="caption" color="text.secondary">
      đang tải ...
    </Typography>
  </Stack>
);

SubReviewItem.propTypes = {
  fullName: PropTypes.string,
  content: PropTypes.string,
  avatarUrl: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  parentId: PropTypes.string,
  handleReply: PropTypes.func,
};

ListSubReview.propTypes = {
  items: PropTypes.array,
  handleReply: PropTypes.func,
  parentId: PropTypes.string,
};
ReviewItem.propTypes = {
  fullName: PropTypes.string,
  id: PropTypes.string,
  rating: PropTypes.number,
  content: PropTypes.string,
  avatarUrl: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  childNumber: PropTypes.number,
  productId: PropTypes.string,
};
ReadmoreReview.propTypes = {
  loading: PropTypes.bool,
  number: PropTypes.number,
  handleLoadMoreComment: PropTypes.func,
};
