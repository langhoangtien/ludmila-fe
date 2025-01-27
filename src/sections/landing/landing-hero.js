'use client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';

import ProductItemHero from '../product/item/product-item-hero';

// ----------------------------------------------------------------------

export default function LandingHero({ products }) {
  const theme = useTheme();

  const carousel = useCarousel({
    // fade: true,
    speed: 100,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 40,
        mx: 'auto',
        position: 'absolute',
      },
    }),
  });

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 8 },
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {products.map((product) => (
            <ProductItemHero key={product._id} product={product} />
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}

LandingHero.propTypes = {
  products: PropTypes.array.isRequired,
};
