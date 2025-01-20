import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints, fetchData } from 'src/utils/fetch';
import { encodeData, convertImagePathToUrl } from 'src/utils/common';

import { useAuthContext } from 'src/auth/hooks';

import './style.css';
import ReviewList from './review-list';
import ReviewSummary from './review-summary';
import ReviewNewForm from '../common/review-new-form';

// ----------------------------------------------------------------------

export default function Review({ id }) {
  const { authenticated } = useAuthContext();
  const formOpen = useBoolean();
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [reviews, setReviews] = useState([]);
  const [reload, setReload] = useState(false);
  const [count, setCount] = useState(1);
  const [star, setStar] = useState(0);
  const [loading, setLoading] = useState(true);

  const submitComment = async (data) => {
    try {
      const newData = { ...data, productId: id };

      await fetchData(endpoints.comment.list, newData, 'POST', authenticated);
      setReload((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSetStar = (value) => {
    setStar(value);
    setPage(1);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const filter = {};
        if (star) filter.rating = star;
        const response = await fetchData(
          `${endpoints.comment.list}?productId=${id}&limit=5&skip=${
            (page - 1) * 5
          }&filter=${encodeData(filter)}`
        );
        const items = response.items.map((item) => ({
          ...item,
          fullName: item.user ? `${item.user.firstName} ${item.user.lastName}` : item.fullName,
          photo: item.user?.photo ? convertImagePathToUrl(item.user?.photo, 250) : undefined,
        }));
        setReviews(items);
        setCount(Math.ceil(response.count / 5));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getData();
  }, [id, reload, page, star]);
  const handleOpenReview = () => {
    formOpen.onTrue();
  };

  return (
    <>
      <ReviewSummary star={star} setStar={handleSetStar} onOpenForm={handleOpenReview} />

      <Container id="reviews">
        <ReviewList
          loading={loading}
          page={page}
          handleChange={handleChange}
          count={count}
          reviews={reviews}
        />
      </Container>

      <ReviewNewForm
        authenticated={authenticated}
        submitComment={submitComment}
        open={formOpen.value}
        onClose={formOpen.onFalse}
      />
    </>
  );
}

Review.propTypes = {
  id: PropTypes.string,
};
