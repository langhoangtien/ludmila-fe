'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import { Box, Card, Typography } from '@mui/material';

export default function ListCategory({ categories }) {
  const [showAll, setShowAll] = useState(false);

  const displayedChildren = showAll ? categories : categories.slice(0, 3);

  const handleShowMore = () => {
    setShowAll(true);
  };
  return (
    <Box
      rowGap={4}
      columnGap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
    >
      {displayedChildren.map((child) => (
        <Card key={child._id}>
          <Link passHref legacyBehavior href={`/category/${child.code}-${child._id}`}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{ cursor: 'pointer', p: 2 }}
              alignItems="center"
              spacing={2}
            >
              <Image
                style={{ borderRadius: 2, objectFit: 'cover' }}
                src={child.image}
                width={50}
                height={50}
              />
              <Typography variant="subtitle2">{child.name}</Typography>
            </Stack>
          </Link>
        </Card>
      ))}
      {!showAll && categories.length > 3 && (
        <Card
          onClick={handleShowMore}
          sx={{
            cursor: 'pointer',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2">Xem thêm ...</Typography>
        </Card>
      )}
    </Box>
  );
}

ListCategory.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
